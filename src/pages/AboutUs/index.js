import React from "react";
import Layout from "../../Layout";

const AboutUs = () => {
  const getFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:5000/favorites`);
      if (response.ok) {
        const favoritesData = await response.json();
        console.log("favoritesData", favoritesData);
        // Process favoritesData or update state accordingly
      } else {
        throw new Error("Failed to fetch favorites");
      }
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
      // Handle error, e.g., set an error state
    }
  };

  // Call the function to fetch favorites
  getFavorites();

  return <>AboutUs</>;
};

export default AboutUs;
