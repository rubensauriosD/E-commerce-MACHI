function errorHandler(err, req, res, next){
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    return res.status(status).send("aca el error agarrado: ",message);
  };

module.exports = errorHandler;