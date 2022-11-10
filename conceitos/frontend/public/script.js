/**
 * Se escrevessemos códigos reacts dentro de uma aplicação sem um transpilador, não seria possível, pois os navegadores,
 * por mais atuais que sejam, não entenderiam, então para isso precisamos usar duas coisas, o babel e o webpack,
 * o funcionamento deles, resumidamente, é como está abaixo.
 * 
 * Babel: Converter (transpilar, ou seja, converter um código em um outro) código do React para um código que o browser entenda
 * Webpack: Para cada tipo de arquivo (.js, .css, .png) ele converte o código de uma maneira diferente
 *  .Loaders: babel-loader que é responsável por converter o javascript em algo que o browser entenda, css-loader que converte
 *   o cdd de uma maneira que o browser entenda, geralmente os pacotes com sufixo loader é algo utilizado pelo webpack pra dar
 *   sentido para o js
 *  
 */