var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.answers = null;
  }
  // 1.获取用户输入信息
  async getUserEnter() {
    // 获取用户输入的项目名
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your Vue project name",
      }
    ]);

    this.answers = answers;
    this.destinationRoot(this.answers.name);
  }
  // 2.安装相关依赖创建package.json
  async installPackage() {
    const pgkJSON = {
      name: this.answers.name,
      version: "1.0.0",
      main: "./src/index.js",
      license: "ISC",
      scripts: {
        build:"webpack",
        watch: "webpack --watch",
        dev: "webpack-dev-server --open"
      },
      devDependencies: {
        "webpack": "^4.35.2",
        "webpack-cli": "^3.3.6",
        "webpack-dev-server": "^3.7.2"
      },
      dependencies: {
      }
    };
    // 创建package.json
    this.fs.extendJSON(this.destinationPath('package.json'), pgkJSON);
    this.npmInstall();
    this.npmInstall(["vue"], { "save-dev": false });
    this.npmInstall(
      ["@babel/core", "@babel/preset-env", "babel-loader", "css-loader", "html-webpack-plugin", "style-loader", "vue-loader", "vue-template-compiler"],
      { "save-dev": true }
    );
  }

  // 3.复制模板文件
  async copyTemplateFiles() {
    this.fs.copyTpl(
      this.templatePath('public/index.html'),
      this.destinationPath('public/index.html'),
      {
        title: this.answers.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main.js'),
      this.destinationPath('src/main.js'),
    );
    this.fs.copyTpl(
      this.templatePath('src/App.vue'),
      this.destinationPath('src/App.vue'),
    );
    this.fs.copyTpl(
      this.templatePath('src/components/HelloWorld.vue'),
      this.destinationPath('src/components/HelloWorld.vue'),
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
    );
  }

};