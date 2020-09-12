/* @jsx jsx*/
import React, { useState } from "react";
// eslint-disable-next-line
import { css, jsx } from "@emotion/core";
import cx from "classnames";

import style from "./Slideshow.css";

interface ColoredShadowProps {
  imageUrl: string;
  shadowSpread: "small" | "large";
  className?: string;
  animate?: boolean;
}
const ColoredShadow = ({
  className,
  imageUrl,
  shadowSpread = "small",
  animate = false,
}: ColoredShadowProps) => {
  return (
    <span
      className={cx("pos-relative w-100p h-100p d-inline-block", className)}
      css={[style.root, animate ? style.animate : null]}
    >
      <img
        loading="lazy"
        src={imageUrl}
        alt="product"
        width={300}
        height={300}
        className="w-100p h-100p m-auto top-0 bottom-0 left-0 right-0 obf-cover obp-center d-block bdr-8 bxs-default pos-absolute z-2"
      />
      <img
        loading="lazy"
        src={imageUrl}
        alt="product"
        width={300}
        height={300}
        className="w-100p h-100p m-auto top-0 bottom-0 left-0 right-0 obf-cover obp-center d-block bdr-8 bxs-default pos-absolute z-1 op-90p"
        css={css`
          filter: blur(${shadowSpread === "small" ? "13px" : "23px"});
          image-rendering: pixelated;
        `}
      />
    </span>
  );
};
const SlideShow = (data: any) => {
  const [selectedImage, setSelectedImage] = useState(data.images[0]);

  return (
    <div
      css={css`
        top: 0px;
      `}
      className="pos-relative"
    >
      <div className="h-300 w-100p pos-relative">
        <ColoredShadow
          imageUrl={selectedImage}
          shadowSpread="small"
          animate={false}
        />
      </div>

      <div
        className={`g-${data.images.length} d-grid  h-100p ggap-8 mv-16 pos-relative`}
      >
        {data.images.map((img: string) => (
          <div
            className="h-100 w-auto cursor-pointer"
            onClick={() => {
              setSelectedImage(img);
            }}
          >
            <ColoredShadow
              imageUrl={img}
              shadowSpread="small"
              className="obf-cover obp-center w-100p h-100p bdr-8 bxs-default"
              animate={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
