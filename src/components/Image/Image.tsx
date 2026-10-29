/** @jsx jsx */
import { css, jsx } from "@emotion/core";

interface ImageProps {
  alt: string;
  css?: any;
  className?: string;
  src: string;
  imageRef?: any;
  onError?: any;
  [key: string]: any;
}

const Image = ({
  alt,
  className,
  imageRef,
  onError,
  src,
  other,
}: ImageProps) => {
  return (
    <img
      src={src}
      onError={
        onError
          ? onError
          : () =>
              (imageRef.current.src = require("../../images/backgrounds/undiscovered.png"))
      }
      className={className}
      alt={alt}
      loading="lazy"
      ref={imageRef}
      css={css}
    />
  );
};

export default Image;
