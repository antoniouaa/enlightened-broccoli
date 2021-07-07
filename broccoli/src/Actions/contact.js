export const SendMail = async ({ fullName, email, message }) => {
  const response = await fetch(`/contact/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      full_name: fullName,
      email,
      message,
    },
  });
  return response.status === 201;
};
