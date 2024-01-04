const baseURL = "http://localhost:5000";
const plannedMealsEndpoint = "/plannedMeals";

export const apiFetchPlannedMeals = async () => {
  try {
    const response = await fetch(`${baseURL}${plannedMealsEndpoint}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch planned meals: ${response.statusText}`);
    }

    return response.json(); // Return data directly
  } catch (error) {
    throw new Error(`Error fetching planned meals: ${error.message}`);
  }
};
