// // export const apiLoginUser = async (userData) => {
// //   try {
// //     const allUsersResponse = await fetch("http://localhost:5000/users");
// //     if (!allUsersResponse.ok) {
// //       throw new Error("Failed to fetch existing users");
// //     }
// //     const allUsers = await allUsersResponse.json();

// //     const userExists = allUsers.find(
// //       (user) =>
// //         user.email === userData.email && user.password === userData.password
// //     );
// //     if (userExists) {
// //       localStorage.setItem("isLoggedIn", "true");
// //       return userExists;
// //     } else {
// //       console.log("Invalid email or password");
// //     }
// //   } catch (error) {
// //     throw new Error(error.message || "Failed to login user");
// //   }
// // };
// export const apiLoginUser = async (userData) => {
//   try {
//     const allUsersResponse = await fetch("http://localhost:5000/users");
//     if (!allUsersResponse.ok) {
//       throw new Error("Failed to fetch existing users");
//     }
//     const allUsers = await allUsersResponse.json();

//     const userExists = allUsers.find(
//       (user) =>
//         user.email === userData.email && user.password === userData.password
//     );
//     if (userExists) {
//       localStorage.setItem("isLoggedIn", "true");
//       return userExists;
//     } else {
//       throw new Error("Invalid email or password");
//     }
//   } catch (error) {
//     throw new Error(error.message || "Failed to login user");
//   }
// };
export const apiLoginUser = async (userData) => {
  try {
    const allUsersResponse = await fetch("http://localhost:5000/users");
    if (!allUsersResponse.ok) {
      throw new Error("Failed to fetch existing users");
    }
    const allUsers = await allUsersResponse.json();

    const userExists = allUsers.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    if (userExists) {
      localStorage.setItem("isLoggedIn", "true");
      console.log("User exists:", userExists); // Log the user data here
      return userExists;
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    throw new Error(error.message || "Failed to login user");
  }
};
