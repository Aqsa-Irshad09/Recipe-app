export const checkExistingEmail = async (email) => {
  try {
    const allUsersResponse = await fetch("http://localhost:5000/users");
    if (!allUsersResponse.ok) {
      throw new Error("Failed to fetch existing users");
    }
    const allUsers = await allUsersResponse.json();

    const emailExists = allUsers.some((user) => user.email === email);
    return emailExists;
  } catch (error) {
    throw new Error("Failed to check existing email");
  }
};

export const registerNewUser = async (userData) => {
  try {
    const emailAlreadyExists = await checkExistingEmail(userData.email);

    if (emailAlreadyExists) {
      console.log("Email already exists");
      return { message: "Email already exists" };
    }

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register user");
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to register user");
  }
};
