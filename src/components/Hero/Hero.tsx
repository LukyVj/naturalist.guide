/** @jsx jsx */
/* eslint-disable */
import React, { Fragment, useState } from "react";

import {
  SITE_NAME_MAIN_LINE,
  SITE_NAME_SECOND_LINE,
} from "../../constants/misc";

import { css, jsx } from "@emotion/core";
import cx from "classnames";

import * as colors from "../../constants/colors";

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
  bannerNetwork: {
    root: css`
      background: linear-gradient(to bottom, #333, black);
      z-index: 9999;
    `,
    button: css`
      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.8),
        inset 0 0 10px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.5);
    `,
    menu: css`
      animation: appear 0.4s ease forwards;
      top: 40px;
      @keyframes appear {
        from {
          opacity: 0;
          transform: translateY(-100px);
        }

        to {
          opacity: 1;
          transform: 0;
        }
      }
    `,
  },
};

interface HeroProps {
  backgroundImage?: any;
}

const BannerNetwork = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const links = [
    {
      name: "🧿   Madamnazar.io",
      url: "https://madamnazar.io",
    },
    {
      name: "🌱   Naturalist.guide",
      url: window.location.origin,
    },
  ];
  return (
    <div
      className="h-50 w-100p d-flex ai-center pos-fixed top-0 left-0 z-max bxs-default"
      css={style.bannerNetwork.root}
      onMouseLeave={() => {
        setShowDropDown(false);
      }}
    >
      <span
        className="d-block ml-8 h-70p pos-relative"
        onMouseOver={() => {
          setShowDropDown(true);
        }}
      >
        <a
          href="#"
          className="d-inline-block pos-relative h-100p ff-upper ph-16 d-flex ai-center ff-lino color-white td-none bdr-4 bgc-farwest z-5"
          css={style.bannerNetwork.button}
        >
          🧿 MadamNazar.io Network
        </a>
        {showDropDown && (
          <div
            className={cx(
              "pos-absolute top-0 left-0 bgc-ground w-100p z-0 bdblr-6 bdbrr-6 w-100p"
            )}
            css={style.bannerNetwork.menu}
            onMouseOver={() => {
              setShowDropDown(true);
            }}
          >
            <ul className="lis-none d-flex fxd-column jc-center ai-center p-0 m-0 bxs pv-16 w-100p">
              {links.map((link, i) => (
                <li
                  key={link.name}
                  className={cx(
                    "w-100p d-block ",
                    i <= 0 && "bdbw-1 bdc-black bdbs-solid"
                  )}
                >
                  <a
                    href={link.url}
                    className="p-8 ph-16 color-current td-none w-100p h-100p d-block fsz-18 hover:bgc-white color-white hover:color-farwest hover:fw-bold"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </span>
    </div>
  );
};
const Hero = () => {
  return (
    <Fragment>
      <BannerNetwork />
      <div
        className="h-auto mih-200 pb-32 pt-80 post"
        css={css`
          background: #ca0411 url(${require("../../images/heroBg.png")})
            no-repeat center center / cover;
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
    </Fragment>
  );
};

export default Hero;
