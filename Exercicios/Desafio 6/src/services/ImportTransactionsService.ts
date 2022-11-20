import { getCustomRepository, getRepository, In } from 'typeorm';
import csvParse from 'csv-parse';
import fs from 'fs';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface CSVTransaction {
  type: 'income' | 'outcome';
  title: string;
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);
    // String que estará lendo o file path
    const contactsReadStream = fs.createReadStream(filePath);

    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];
    /* O delimiter já vem como linha, e usamos a from line 2, porque ele entende que a primeira linha, por mais que ela
    seja o header, ele compreende que ela é a linha 1, pois ela não começa 0, */
    const parsers = csvParse({
      from_line: 2,
    });

    // ELe irá ler as linhas conforme forem disponíveis
    const parseCSV = contactsReadStream.pipe(parsers);

    // Para cada linha
    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value) return;

      categories.push(category);

      transactions.push({ title, type, value, category });
    });

    // Para quando o parseCV for concluído
    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentCategories = await categoriesRepository.find({
      where: {
        title: In(categories),
      },
    });

    const existentCategoriesTitle = existentCategories.map(
      (category: Category) => {
        return category.title;
      },
    );

    /* Desse modo ele irá filtrar pelas categorias que ainda não existem no banco de dados
    e após isso fará uma outra filtragem para ver se a categoria não está sendo repetida, para isso
    será mapeado tudo isso buscando o index onde o value seja igual e retirar o mesmo */

    const addCategoryTitle = categories
      .filter(category => !existentCategoriesTitle.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = categoriesRepository.create(
      addCategoryTitle.map(title => ({
        title,
      })),
    );

    /*
      {
        title: comida
      }
      {
        title: skate
      }

      é isso que esse código acima está fazendo
    */

    await categoriesRepository.save(newCategories);

    const finalCategories = [...newCategories, ...existentCategories];

    const createdTransactions = transactionRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: finalCategories.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    await transactionRepository.save(createdTransactions);

    await fs.promises.unlink(filePath);

    return createdTransactions;
  }
}

export default ImportTransactionsService;
