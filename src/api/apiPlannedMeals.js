const baseURL = "http://localhost:5000";
const favoritesEndpoint = "/plannedMeals";
export const addPlannedMeal = async (plannedMeal) => {
  try {
    const response = await fetch(`${baseURL}${favoritesEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plannedMeal),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to add planned meal: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("selected data from apifolder", data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
