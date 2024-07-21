export const createError = (msg = "Something went wrong", status = 500) => {
  const error = new Error(msg);
  error.status = status;
  console.log(1234, error);
  return error;
};
