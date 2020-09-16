/** @jsx jsx */
import { useRef } from "react";
import { css, jsx } from "@emotion/core";
import { connectHits, connectHighlight } from "react-instantsearch-dom";

import Image from "../../../components/Image";

import * as colors from "../../../constants/colors";
import { CDN_URL } from "../../../constants/routes";

const styles = {
  root: css`
    background: url(${require("../../../images/compendiumPhotoBg.png")})
      no-repeat center center / 100% 100%;

    &:hover:after {
      border-color: ${colors.FARWEST};
      border-image-repeat: round;
      border-image-slice: 10 10 10 10 fill;
      border-image-source: url(${require("../../../images/hover.png")});
      border-style: solid;
      border-width: 10px;
      bottom: -7px;
      content: "";
      left: -6px;
      pointer-events: none;
      position: absolute;
      right: -4px;
      top: -6px;
      z-index: 10;
    }
  `,
  name: css`
    border-bottom: 2px solid #bd0808;
  `,
};

interface HighlightProps {
  [key: string]: any;
}

const Highlight = ({ highlight, attribute, hit }: HighlightProps) => {
  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit,
  });
  console.log(parsedHit);

  if (parsedHit.length >= 1) {
    if (attribute === "name") {
      return (
        <h2 css={styles.name} className="h-100p ts-regular">
          {parsedHit.map(({ part, index }: any) =>
            part.isHighlighted ? (
              <mark
                key={index}
                css={css`
                  background: ${colors.FARWEST};
                  padding: 8px;
                  -webkit-mask-box-image: url(${require("../../../images/masks/text-banner.svg")})
                    14 repeat;
                  mask-border: url(${require("../../../images/masks/text-banner.svg")})
                    14 repeat;
                  color: white;
                `}
              >
                {part.value}
              </mark>
            ) : (
              <span key={index}>{part.value}</span>
            )
          )}
        </h2>
      );
    }
    if (attribute === "description") {
      return (
        <p className="d-block h-100p ts-regular mt-0">
          {parsedHit.map(({ part, index }: any) =>
            part.isHighlighted ? (
              <mark
                key={index}
                css={css`
                  background: ${colors.FARWEST};
                  color: white;
                `}
              >
                {part.value}
              </mark>
            ) : (
              <span key={index}>{part.value}</span>
            )
          )}
        </p>
      );
    }
  }
};
const CustomHighlight = connectHighlight(Highlight);

interface HitProps {
  setItem: Function;
  setSidebarOpen: Function;
  [key: string]: any;
}
const Hit = ({ hit, setItem, setSidebarOpen }: HitProps) => {
  const mapImageRef = useRef(null);
  const mapIconeRef = useRef(null);

  const thumbnail_url = `${CDN_URL}${hit.thumbnailName}.png`;
  const photo_url = `${CDN_URL}${hit.photoName}.png`;
  const map_url = `${`${CDN_URL}maps/`}${
    hit.type === "plants" ? "plants/" : "animals/"
  }${hit.isLegendary === true ? "legendary" : ""}${hit.mapLocation.replace(
    /-/g,
    "_"
  )}.${hit.type === "plants" ? "jpg" : "png"}`;
  return (
    <article
      className="pos-relative top-0 h-100p d-flex fxd-column jc-between h-auto hover:color-white cursor-pointer"
      css={[styles.root]}
      onClick={() => {
        setItem(hit);
        setSidebarOpen(true);
      }}
    >
      <header className="p-8 ph-16">
        <span css={styles.name} className="h-100p ts-regular">
          <CustomHighlight hit={hit} attribute="name" />
          {hit.type} {map_url}
        </span>
      </header>
      <div className="p-16 pt-0">
        <CustomHighlight hit={hit} attribute="description" />

        <div className="h-120 d-grid g-5">
          <Image
            src={hit.type === "animal-horses" ? photo_url : thumbnail_url}
            className="w-90p h-90p obf-cover obp-center va-middle gcstart-1 gcend-3 as-center"
            alt={`icon from rockstar®  for ${hit.name}`}
            imageRef={mapIconeRef}
          />
          {hit.type !== "animal-horses" && (
            <Image
              src={map_url}
              className="w-100p h-100p obf-cover obp-center gcstart-3 gcend-6"
              alt={`Location for ${hit.name}`}
              imageRef={mapImageRef}
              css={css`
                -webkit-mask-box-image: url(${require("../../../images/masks/text-banner.svg")})
                  14 repeat;
                mask-border: url(${require("../../../images/masks/text-banner.svg")})
                  14 repeat;

                filter: sepia(100);
              `}
            />
          )}
        </div>
      </div>
    </article>
  );
};

const CSTHits = connectHits(Hit);

interface CustomHitsProps {
  setItem: Function;
  setSidebarOpen: Function;
}
const CustomHits = ({ setItem, setSidebarOpen }: CustomHitsProps) => (
  <CSTHits
    hitComponent={CustomHits}
    setItem={setItem}
    setSidebarOpen={setSidebarOpen}
    className="d-grid"
  />
);

export default CustomHits;
