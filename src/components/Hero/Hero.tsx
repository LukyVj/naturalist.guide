/* eslint-disable */
import React, { Fragment } from "react";

import { css, jsx } from "@emotion/core";

const style = {
  root: css`
    filter: drop-shadow(0 0 1px #000) drop-shadow(1px 1px 0 #000);
  `,
  banner: css`
    background-color: #000;

    -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
      20 repeat;
    mask-border: url(${require("../../images/masks/text-banner.svg")}) 20 repeat;
  `,
};

interface HeroProps {
  backgroundImage?: any;
}
const Hero = () => {
  return (
    <div
      className="h-auto mih-200 pv-32 post"
      css={css`
        background: #ca0411 url(${require("../../images/heroBg.png")}) no-repeat
          center center / cover;
        box-shadow: inset 0 0 100px black;
        background-blend-mode: darken;
      `}
    >
      <header className="ta-center color-white" css={style.root}>
        <h1 className="lh-small ts-regular">
          <span className="d-inline-block p-16 w-auto" css={style.banner}>
            Naturalist & Animal Almanac
          </span>
          <span className="cf h-0"></span>
          <small
            className="fsz-24 d-inline-block w-auto p-8"
            css={style.banner}
          >
            for
          </small>
          <br />
          <span className="d-inline-block p-16 w-auto" css={style.banner}>
            Red Dead Redemption 2
          </span>
        </h1>
      </header>
    </div>
  );
};

export default Hero;
