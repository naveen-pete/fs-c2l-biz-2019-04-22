const generateId = items => {
  const id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
  return id;
};

const createAppError = message => ({ message });

const jwtSecretKey = 'store-app-secret-key';

module.exports = { generateId, createAppError, jwtSecretKey };
