const logger = (req, _, next) => {
  console.log(`Requested URL: ${req.url}`);
  next();
};

module.exports = logger;
