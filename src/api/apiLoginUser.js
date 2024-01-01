export const apiLoginUser = async (userData) => {
  try {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("User data from local storage", users);
    const { email, password } = userData;
    console.log("User data from submition", email, password);
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    localStorage.setItem("isLoggedIn", "true");
    return user; // Return user data upon successful login
  } catch (error) {
    throw new Error(error.message || "Failed to login user");
  }
};
