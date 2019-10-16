module.exports = (data, expiresIn = 300) => {
  return jwt.sign(
    data,
    config.secret,
    { expiresIn}
  );
}
