# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar o Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano

**RN**

- O link enviado por e-mail para resetar a senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha no momento da redefinição;


# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado por outro usuário;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestados

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestados no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
-

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestados;
- O usuário deve poder listar os horários disponíveis em um dia específico de um prestados;
- O usuário deve poder realizar um agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache
-

**RN**

- Cada agendamento deve durar exatamente 1h;
- Os agendamentos devem estar disponíveis entre 08h até 18h;
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
