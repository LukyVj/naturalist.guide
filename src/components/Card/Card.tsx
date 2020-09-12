/* @jsx jsx */
import React, { useState } from "react";
// eslint-disable-next-line
import { css, jsx } from "@emotion/core";
import Slideshow from "../Slideshow";

import * as colors from "../../constants/colors";

import style from "./Card.css";
import SplitText from "../SplitText";

interface CardsProps {
  item: {
    images: any[];
    name: {
      short: string;
      complete: string;
    };
    description: string;
    prices: {
      quantity: number;
      value: number;
    }[];
  };
  index: number;
}

const Card = ({ item, index }: CardsProps) => {
  const [finalPrice, setFinalPrice] = useState(item.prices[0].value);

  return (
    <div
      className="bxs-default w-100p pos-relative bdr-6 mt-80"
      css={style.root}
    >
      <article
        css={css`
          margin-top: -120px;
        `}
        className="color-black p-24"
      >
        <header className="h-auto w-100p ta-left">
          <Slideshow images={item.images} />
          <div className="mb-16 mt-32 ff-pangolin">
            <h2 className="fw-bold tt-upper">{item.name.short}</h2>
            <i className="color-limeade">{item.name.complete}</i>
          </div>
        </header>
        <div>
          <SplitText copy={item.description} />
        </div>
      </article>
      <footer className="p-24">
        <span
          className="d-inline-block w-100p h-auto p-8 d-grid g-3 ov-hidden color-white bxs-large"
          css={css`
            border-radius: 8px;
            background: linear-gradient(
              to bottom,
              ${colors.LIMEADE},
              ${colors.LA_PALMA}
            );
          `}
        >
          <select
            name={`quantity-${index}`}
            id={`quantity-${index}`}
            onInput={(event: any) => {
              const pickItem = event.target.value - 1;
              setFinalPrice(item.prices[pickItem].value);
            }}
            className="app-none gcstart-0 gcend-2 ta-center ph-24 bgc-transparent color-current bdw-0 fsz-24"
          >
            {Array.from(Array(item.prices.length).keys()).map((num) => {
              num = num + 1;
              return (
                <option className="d-inline-block w-100p" value={num}>
                  {num}
                </option>
              );
            })}
          </select>
          <button
            onClick={() => {
              window.location.assign(`https://paypal.me/lukyvj/${finalPrice}`);
            }}
            className="gcstart-2 gcend-4 bgc-transparent color-current bdw-0 fsz-24"
          >
            Buy for <span className="fw-bold ff-courier">{finalPrice}€</span>
          </button>
        </span>
      </footer>
    </div>
  );
};

export default Card;
