import React, { FormEvent, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logo from '../../assets/logo.svg';
import { Title, Form, Repository, Error } from './styles';

interface IRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState(``);
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<IRepository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('The author/repo name cannot be empty');
      return;
    }

    try {
      // Consumir api do github
      const response = await api.get<IRepository>(`repos/${newRepo}`);

      // Salvar novo repositório no estado
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Error fetching this repository');
    }
  }

  return (
    <>
      <img src={logo} alt="GitHub Explorer"></img>
      <Title>Explore repositórios do GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository} action="">
        <input
          type="text"
          onChange={e => setNewRepo(e.target.value)}
          value={newRepo}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      <Repository>
        {repositories.map(repository => (
          <a key={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repository>
    </>
  );
};

export default Dashboard;
