const baseURL = "http://localhost:5000";
const favoritesEndpoint = "/favorites"; // Assuming this endpoint manages favorite meals

// Function to add a meal to favorites in the JSON server
export const addToFavoritesAPI = async (mealId) => {
  try {
    const response = await fetch(`${baseURL}${favoritesEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mealId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add to favorites");
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to add to favorites");
  }
};

// Function to remove a meal from favorites in the JSON server
export const removeFromFavoritesAPI = async (mealId) => {
  try {
    const response = await fetch(`${baseURL}${favoritesEndpoint}/${mealId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        "Failed to remove from favorites. HTTP status " + response.status
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error in removeFromFavoritesAPI:", error); // Add this line for debugging
    throw new Error("Failed to remove from favorites: " + error.message);
  }
};
