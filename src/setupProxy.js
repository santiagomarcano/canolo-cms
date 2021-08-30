module.exports = function (app) {
  app.use((_, res, next) => {
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Resource-Policy", "cross-origin");

    next();
  });
};
