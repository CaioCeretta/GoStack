module.exports = {
  presets: [
      '@babel/preset-env', // Converte código de um javascript mais moderno para um mais antigo. baseado no ambiente da nossa aplicação
      '@babel/preset-react' // Adiciona as funcionalides do react à essa versão
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
  
}