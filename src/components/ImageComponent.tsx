import React from "react";

type ImageProps = {
  src: string;
  alt: string;
  customAttributes?: Object[];
};

const Image: React.FC<ImageProps> = ({ src, alt, customAttributes }) => {
  const FALLBACK_IMAGE: string = "/noImage.jpeg";
  const errorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = FALLBACK_IMAGE;
  };
  return (
    <img src={src} alt={alt} {...customAttributes} onError={errorHandler} />
  );
};

export default Image;
