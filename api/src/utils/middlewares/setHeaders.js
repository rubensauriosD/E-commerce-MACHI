function setHeaders(req, res, next){
  res.header('Access-Control-Allow-Origin', 'https://e-commerce-machi.vercel.app/#/'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
};

module.exports = setHeaders;
