module.exports = function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.message === "no content") err.status = 204;
  else if (err.message === "bad request") err.status = 400;
  else if (err.message === "unauthorized") err.status = 401;
  else if (err.message === "forbidden") err.status = 403;
  else if (err.message === "conflict") err.status = 409;
  res.status(err.status || 500).json({ error: err.message });
};
