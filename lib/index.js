module.exports = function(privilege_map) {
  const middleware = async function(ctx, next) {
    if (Object.prototype.toString.call(privilege_map) !== "[object Array]") {
      throw new TypeError("privilege_map must be an Map!");
    }
    const url = ctx.request.url;
    let checkRes = "pass";
    if (url === "/") {
      next();
    } else {
      const _map = new Map(privilege_map);
      for (const [key, val] of _map) {
        if (url.startsWith(key)) {
          checkRes = val;
          break;
        }
      }
    }
    ctx["checkUrlRes"] = checkRes;
    next();
  };
  return middleware;
};
