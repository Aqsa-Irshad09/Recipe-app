export const apiRegisterUser = async (userData) => {
  try {
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

    return response.json(); // Assuming response contains the registered user data
  } catch (error) {
    throw new Error(error.message || "Failed to register user");
  }
};

export const apiGetUserById = async () => {
  try {
    const response = await fetch(`http://localhost:5000/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user data");
    }
    const userData = await response.json();
    console.log("user data from pi register", userData);
    return userData; // Assuming response contains the user data
  } catch (error) {
    throw new Error(error.message || "Failed to fetch user data");
  }
};
