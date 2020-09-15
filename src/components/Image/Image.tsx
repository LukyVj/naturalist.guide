/** @jsx jsx */
import { css, jsx } from "@emotion/core";

interface ImageProps {
  alt: string;
  css?: object;
  className?: string;
  src: string;
  imageRef?: any;
  onError?: any;
  [key: string]: any;
}

const Image = ({ alt, className, imageRef, onError, src }: ImageProps) => {
  return (
    <img
      src={src}
      onError={
        onError
          ? onError
          : () => (imageRef.current.src = require("../../images/404.png"))
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
