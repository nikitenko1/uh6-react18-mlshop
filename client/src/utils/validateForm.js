export const validateForm = (data) => {
  const { name, email } = data;

  const error = [];

  if (name.length > 20) error.push("Name cannot last more than 20 characters!");
  if (!validateEmail(email)) error.push("Email is wrong format!");

  return error;
};

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
