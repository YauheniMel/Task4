module.exports.checkIfLeftLessFiveMinutes = (expirationTime) => {
  const FIVE_MINUTES = 300;

  const now = Math.round(new Date().getTime() / 1000);

  return expirationTime - now < FIVE_MINUTES;
};
