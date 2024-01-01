export const fetchRandomMeal = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch random meal");
    }

    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    throw new Error("Failed to fetch random meal");
  }
};
