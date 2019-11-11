const Koa = require('koa');
const middle = require('../lib/index');
const privilege_map = require('./privilege');

const app = new Koa();

app.use(middle(privilege_map));

app.use(async (ctx, next) => {
  if(ctx.checkUrlRes === 'check'){
    ctx.data = 'url has no privilege';
    next();
  } else {
    ctx.data = 'hello world';
  }
})

app.use(async ctx => {
  ctx.body = ctx.data;
});

app.listen(3000, () => {
  console.log(' server start 3000')
});