const path = require('path');

module.exports = {
  entry: './src/index.js', // Входная точка вашего приложения
  output: {
    filename: 'index.bundle.js', // Имя выходного файла
    path: path.resolve(__dirname, 'bin'), // Папка для выходных файлов
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Применять правила к файлам .js
        exclude: /node_modules/, // Исключить папку node_modules
        use: {
          loader: 'babel-loader', // Использовать Babel для транспиляции
          options: {
            presets: ['@babel/preset-env'], // Пресет для ES6+
          },
        },
      },
    ],
  },
  mode: 'production', // Режим продакшана
};
