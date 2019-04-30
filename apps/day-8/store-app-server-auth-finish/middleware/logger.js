const logger = (req, res, next) => {
  console.log(`myLogger: Method - ${req.method}, URL - ${req.url}`);

  next();
};

module.exports = logger;