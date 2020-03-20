module.exports = function () {
  var helmet = require('helmet');
  var helmetRouter = require('express').Router();
  helmetRouter.use(helmet({
    frameguard: {
      action: 'deny'
    },
    noSniff: true,
    xssFilter: {
      setOnOldIE: true
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'unsafe-inline'", "'self'", "'unsafe-eval'", 'cdnjs.cloudflare.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
        imgSrc: ["'self'", "blob:", "data:", '*.fastly.net'],
        fontSrc: ["'self'", 'fonts.gstatic.com'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'", 'blob:']
      }
    },
    dnsPrefetchControl: {
      allow: true
    },
    referrerPolicy: {
      policy: 'no-referrer'
    }
  }));
  return helmetRouter;
}
