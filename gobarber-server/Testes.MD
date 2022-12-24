# Testes automatizados

Faz com que nossa aplicação continue funcionando independente do número de novas funcionalidades e do número de devs do time.

1. Testes Unitários (TDD)

- Testam funcionalidades específicas da aplicação e precisam ser funções puras

Utilizamos esses testes quando queremos testar uma cada muito isolada de código da nossa aplicação, por exemplo
uma função que caso passemos uma variável ela nos dê um retorno distinto.
São coisas muito isoladas das aplicações, essas funções puras são funções que não dependem de outras partes da nossa
aplicação, elas jamais irão fazer uma chamada para uma API externa e não tem algum efeito colateral, por exemplo, uma
coisa que acontece devido a uma coisa que aconteceu antes, por exemplo o envio de e-mail, pois uma função pura não
depende de nenhum serviço externo, dado os mesmos parametros ela tem os mesmo resultados, depende apenas da própria
aplicação, não de algo externo


2. Testes de integração

- Testa uma funcionalidade completa, passando por várias camadas da aplicação.
Por exemplo a criação de um usuário

Route -> Controller -> Serviço -> Repositório -> Serviço -> etc...

3. Testes End to End (E2E)

- Testes que simulam a ação do usuário dentro da nossa aplicação.
Por exemplo um formulário de e-mail

1 - Clique no input de email
2 - Insira caioceretta@gmail.com
3 - Clique no input de senha
4 - Preencha 123456
5 - Clique no botão "Sign In"
6 - Espero que a página tenha enviado o usuário para o dashboard

Os testes e2e são mais visuais, eles seram mais usados no react e no react native, enquanto no node serão feitos mais
testes unitários e testes de integração

# TDD (Test Driven Development)

Cria os testes antes de criar as funcionalidades na aplicação.

Se você vai criar uma funcionalidade nova, voce escreve o comportamento que você espera dessa funcionalidade, aí se já
tem um teste que está garantindo que uma funcionalidade se comporte de uma maneira específica, então quando for desen-
volver essa funcionalidade, você já tera uma bussola, um caminho para saber o caminho que deve percorrer, por exemplo:

Quando a gente imagina a aplicação, a gente imagina as funcionalidades assim:

- Quando o usuário se cadastrar na aplicação ele deve receber um email de boas vindas.

Isso é um teste, se formos na aplicação e escrever um teste para isso, se dispararmos a função de cadastrar um usuário e
colocarmos uma pequena flag para verificar se o e-mail foi enviado, isso já será uma bussola, nos dará um caminho
para quando formos desenvolver a funcionalidade, já executamos os testes e verificamos se estamos no caminho certo.

É bom porque a gente não precisa ficar executando a aplicação e chamando as rotas, porque os próprios testes garantem
se está funcionando.

