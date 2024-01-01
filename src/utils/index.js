export const generateRandomToken = () => {
  // Function to generate a random alphanumeric token (you can adjust the length as needed)
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
