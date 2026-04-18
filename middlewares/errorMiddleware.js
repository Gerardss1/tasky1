const errorHandler = (err, req, res, next) => {
  console.error(err); // errrores en consola

  res.status(err.statusCode || 500).json({
    msg: err.message || 'Error del servidor'
  });
};

module.exports = errorHandler;