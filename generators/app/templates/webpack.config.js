const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");

// 导出一个webpack具有特殊属性配置的对象
module.exports = {
  mode: "none", // 指定模式配置："development" | "production" | "none"
  // 入口
  entry: "./src/main.js", // 入口模块文件路径
  // 出口
  output: {
    // path: './dist/', 错误的，要指定绝对路径
    path: path.join(__dirname, "./dist/"), //打包的结果文件生成的目录要是绝对路径
    filename: "[name].[hash].js",
  },
  module: {
    rules: [
      //配置转换规则
      {
        test: /\.css$/, // 注意，不要有单引号，正则表达 式，匹配 .css 文件资源
        use: [
          // 根据外国人的习惯来的顺序，而且顺序不要写错
          "style-loader", // js识别css
          "css-loader", // css 转换为 js
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      // 解决兼容性问题
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/, // 排除的目录
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // babel中内容的转换规则工具
          },
        },
      },
      // 2. 处理 .vue 单文件组件
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  // 配置插件
  plugins: [
    new HtmlWebpackPlugin({
      // 指定要打包的模板页面
      // 就会将 index.html 打包到与 bundle.js 所在同一目录下面，
      // 同时在 index.html 中会自动的使用script 标签引入bundle.js
      template: "./public/index.html",
    }),
    // 3. 请确保引入这个插件！
    new VueLoaderPlugin(),
    // 3. 配置热模块加载对象
    new webpack.HotModuleReplacementPlugin(),
  ],
  // 实时重新加载
  devServer: {
    // 目标路径
    contentBase: "./dist",
    // 2. 开启热模块加载,
    hot: true,
  },
};
