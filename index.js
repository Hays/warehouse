var Koa = require('koa');
var Router = require('koa-router');
var routerImp = require('./js/router-imp');

var app = new Koa();
var router = new Router();

const logger = (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    next();
};
app.use(logger);

routerImp(router);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080);