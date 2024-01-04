// Function to update a planned meal in the database
export const apiUpdatePlannedMeal = async (id, updatedMeal) => {
  try {
    const response = await fetch(`http://localhost:5000/plannedMeals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMeal),
    });

    if (!response.ok) {
      throw new Error(`Failed to update planned meal: ${response.statusText}`);
    }

    // Handle the success response if needed
  } catch (error) {
    throw new Error(`Error updating planned meal: ${error.message}`);
  }
};

// Function to delete a planned meal from the database
export const apiDeletePlannedMeal = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/plannedMeals/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete planned meal: ${response.statusText}`);
    }

    // Handle the success response if needed
  } catch (error) {
    throw new Error(`Error deleting planned meal: ${error.message}`);
  }
};
