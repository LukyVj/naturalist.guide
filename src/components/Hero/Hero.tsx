/** @jsx jsx */
/* eslint-disable */
import React, { Fragment } from "react";

import {
  SITE_NAME_MAIN_LINE,
  SITE_NAME_SECOND_LINE,
} from "../../constants/misc";

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
        box-shadow: inset 0 0 110px black;
        background-blend-mode: darken;
        -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
          20 repeat;
        mask-border: url(${require("../../images/masks/text-banner.svg")}) 20
          repeat;
      `}
    >
      <header className="ta-center color-white" css={style.root}>
        <h1 className="lh-small ts-regular">
          <span className="d-inline-block p-16 w-auto" css={style.banner}>
            {SITE_NAME_MAIN_LINE}
          </span>
          <span className="cf h-0"></span>
          <small
            className="fsz-24 d-inline-block w-auto p-8 lh-big"
            css={style.banner}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: SITE_NAME_SECOND_LINE.split(" ")
                  .map((word, index) => {
                    if (index === 4) {
                      return `${word}<br/>`;
                    } else {
                      return word;
                    }
                  })
                  .join(" "),
              }}
            />
          </small>
        </h1>
      </header>
    </div>
  );
};

export default Hero;
