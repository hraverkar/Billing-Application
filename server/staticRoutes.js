module.exports = function(path, config) {
  let express = require("express");
  let staticRoutes = express.Router();

  // option 1
  staticRoutes.use(
    "/",
    express.static(path.join(__dirname, "/dist/"), {
      setHeaders: setCacheHeader
    })
  );
  staticRoutes.use(
    "/home",
    express.static(path.join(__dirname, "/dist/"), {
      setHeaders: setCacheHeader
    })
  );
  staticRoutes.use(
    "/login",
    express.static(path.join(__dirname, "/dist/"), {
      setHeaders: setCacheHeader
    })
  );

  function setCacheHeader(res) {
    return res.header("Cache-Control", "public, max-age=86400, no-cache");
  }
  return staticRoutes;
};
