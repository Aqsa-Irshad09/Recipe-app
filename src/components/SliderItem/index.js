import React from "react";
import Carousel from "react-material-ui-carousel";

import { images } from "../../data";

const captionStyle = {
  fontSize: "2em",
  fontWeight: "bold",
};
const slideNumberStyle = {
  fontSize: "20px",
  fontWeight: "bold",
};

const CarouselMovies = () => {
  const classes = useStyles();

  const renderCarouselItems = () => {
    return images.map((image, index) => (
      <img key={index} src={image} alt={`slide-${index}`} />
    ));
  };

  return (
    <div>
      <div>
        <Carousel
          data={images}
          time={2000}
          width="100vw"
          height="45vh"
          captionStyle={captionStyle}
          radius="10px"
          slideNumber={true}
          slideNumberStyle={slideNumberStyle}
          captionPosition="bottom"
          automatic={true}
          dots={true}
          pauseIconColor="white"
          pauseIconSize="40px"
          slideBackgroundColor="darkgrey"
          slideImageFit="cover"
        >
          {renderCarouselItems()}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselMovies;
