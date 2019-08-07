const express = require('express');
const app = express();

const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const middleware = require('webpack-dev-middleware');

let compiler = webpack(webpackConfig);
app.use(middleware(compiler));
app.listen(8080, () => console.log("running"));
