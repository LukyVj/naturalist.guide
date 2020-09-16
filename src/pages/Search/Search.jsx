/** @jsx jsx */
import { useState, Fragment, useRef } from "react";
import algoliasearch from "algoliasearch/lite";
import { jsx, css } from "@emotion/core";
import cx from "classnames";

import {
  InstantSearch,
  Hits,
  connectHighlight,
  connectHits,
  Configure,
} from "react-instantsearch-dom";

import Button from "../../components/Button";
import Image from "../../components/Image";
import SidebarInfos from "./SidebarInfos";
import CustomSearchBox from "./CustomSearchBox";
import CustomRefinementList from "./CustomRefinementList";
import CustomPagination from "./CustomPagination/CustomPagination";

import { slugify } from "../../scripts/helper";

import * as colors from "../../constants/colors";
import { CDN_URL } from "../../constants/routes";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY_INDEXES
);

const styles = {
  root: css`
    background: url(${require("../../images/compendiumPhotoBg.png")}) no-repeat
      center center / 100% 100%;

    &:hover:after {
      border-color: ${colors.FARWEST};
      border-image-repeat: round;
      border-image-slice: 10 10 10 10 fill;
      border-image-source: url(${require("../../images/hover.png")});
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

  hitGrid: (sidebarOpen) => css`
    width: 100%;

    .ais-Hits-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(${sidebarOpen ? 2 : 4}, 1fr);
      grid-template-rows: repeat(${sidebarOpen ? 6 : 4}, 1fr);
      grid-column-gap: 20px;
      grid-row-gap: 20px;
    }
  `,
};

// 1. Create a React component
const Highlight = ({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit,
  });

  if (attribute === "name") {
    return (
      <h2 css={styles.name} className="h-100p ts-regular">
        {parsedHit.map((part, index) =>
          part.isHighlighted ? (
            <mark
              key={index}
              css={css`
                background: ${colors.FARWEST};
                padding: 8px;
                -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
                  14 repeat;
                mask-border: url(${require("../../images/masks/text-banner.svg")})
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
        {parsedHit.map((part, index) =>
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
};

// 2. Connect the component using the connector
const CustomHighlight = connectHighlight(Highlight);

const Search = () => {
  const [item, setItem] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchBoxRef = useRef(null);
  const [expandImages, setExpandImages] = useState(false);
  const [modalData, setModalData] = useState(null);

  const Modal = ({ data }) => {
    const iframeUrl = `https://jeanropke.github.io/RDOMap/?q=${
      data.isLegendary
        ? data.thumbnailName.toLowerCase()
        : data.thumbnailName.toLowerCase().split("mp_")[1]
    }`;
    const [viewIframe, setViewIframe] = useState(false);
    const [frameUrl, setFrameUrl] = useState(iframeUrl);

    return (
      <modal
        className="z-max p-16"
        css={[
          expandImages &&
            css`
              position: fixed;
              width: 84%;
              height: 84%;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              filter: drop-shadow(1px 0 30px #000);
            `,
          css`
            &:before {
              content: "";
              display: block;
              width: 100%;
              height: 100%;
              background: url(${require("../../images/bgSidebar.jpg")});
              -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
                14 repeat;
              mask-border: url(${require("../../images/masks/text-banner.svg")})
                14 repeat;
              position: absolute;
              z-index: -1;
              top: 0;
              left: 0;
            }
          `,
        ]}
      >
        <header>
          <Button
            label="close"
            onClick={() => {
              setExpandImages(false);
            }}
          />
        </header>
        <article className="d-grid g-2 ggap-16 h-100p">
          <div>
            <picture className="pos-relative d-block w-100p h-400">
              <div className="pos-absolute z-2 top-0 left-0">
                <div className="ta-center">
                  <h2 className="color-white ts-regular fw-bold pv-16 ph-32 ph-0 ta-left m-0">
                    {data.name}:
                  </h2>
                </div>
              </div>
              <div className="pos-absolute bot-0 left-0 w-100 h-100 z-2">
                <img
                  src={`${CDN_URL}/${data.thumbnailName}.png`}
                  className="w-100p h-100p va-middle obf-cover obp-center"
                  alt={`icon from rockstar®  for ${data.name}`}
                  loading="lazy"
                />
              </div>
              <img
                src={`${CDN_URL}/${data.photoName}.jpg`}
                className="w-100p h-100p pos-absolute top-0 left-0 z-0 obf-cover obp-center"
                alt={`screenshot from rockstar® for ${data.name}`}
                loading="lazy"
                css={css`
                  -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
                    14 repeat;
                  mask-border: url(${require("../../images/masks/text-banner.svg")})
                    14 repeat;
                `}
              />
            </picture>
            <div>
              <p className="color-black p-0 m-0 lh-big">{data.description}</p>
            </div>
          </div>

          <div className="d-flex jc-start fxd-column">
            <div>
              <Button
                label="Photo"
                onClick={() => {
                  setViewIframe(false);
                  setFrameUrl(iframeUrl);
                }}
              />
            </div>
            <div className="h-80p">
              {viewIframe && (
                <iframe
                  title="map"
                  src={frameUrl}
                  frameborder="0"
                  width="100%"
                  height="100%"
                  css={css`
                    -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
                      14 repeat;
                    mask-border: url(${require("../../images/masks/text-banner.svg")})
                      14 repeat;
                  `}
                ></iframe>
              )}

              {!viewIframe && (
                <img
                  src={
                    data.mapLocation
                      ? `${process.env.CDN_URL}/maps/${
                          data.isLegendary === true
                            ? `legendary/${slugify(data.name)}.png`
                            : `${slugify(data.mapLocation)}.png`
                        }`
                      : require("../../images/404.png")
                  }
                  className="w-100p h-100p obf-cover obp-center"
                  alt={`Location for ${data.name}`}
                  loading="lazy"
                  css={css`
                    -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
                      14 repeat;
                    mask-border: url(${require("../../images/masks/text-banner.svg")})
                      14 repeat;
                  `}
                />
              )}

              <Button
                href={`https://jeanropke.github.io/RDOMap/?q=${
                  data.isLegendary
                    ? data.thumbnailName.toLowerCase()
                    : data.thumbnailName.toLowerCase().split("mp_")[1]
                }`}
                tag="a"
                label="View on RDOMap"
                target="_blank"
                className="w-100p d-block"
              ></Button>
            </div>
          </div>
        </article>
        <footer></footer>
      </modal>
    );
  };
  const Hit = ({ hit }) => {
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
                  -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
                    14 repeat;
                  mask-border: url(${require("../../images/masks/text-banner.svg")})
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

  const SidebarFilters = () => {
    return (
      <aside
        className="h-90p pv-24 pos-sticky d-none md:d-block"
        css={css`
          top: 82px;
        `}
      >
        <header>
          <h3>Filter by:</h3>
        </header>
        <CustomRefinementList attribute="type" />
        <header>
          <h3>habitats</h3>
        </header>
        <CustomRefinementList attribute="habitat" />

        <header>
          <h3>Legendary type</h3>
        </header>
        <CustomRefinementList attribute="legendaryType" />
      </aside>
    );
  };

  const CustomHits = connectHits(Hit);

  return (
    <Fragment>
      <InstantSearch
        indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}
      >
        <Configure hitsPerPage={8} />
        <CustomSearchBox searchBoxRef={searchBoxRef} />
        {expandImages && <Modal data={modalData} />}
        <div className="pos-relative top-0 w-100p">
          <div className="d-grid g-6">
            <SidebarFilters className="gcstart-1 gcend-2" />
            <div
              className={cx([
                "p-8 gcstart-2",
                sidebarOpen ? "gcend-5" : "gcend-7",
              ])}
            >
              <Hits
                hitComponent={CustomHits}
                className="d-grid"
                css={styles.hitGrid(sidebarOpen)}
              />
              <CustomPagination />
            </div>
            {sidebarOpen && (
              <SidebarInfos
                data={item}
                setSidebarOpen={setSidebarOpen}
                setExpandImages={setExpandImages}
                setModalData={setModalData}
                className="gcstart-5 gcend-7"
              />
            )}
          </div>
        </div>
      </InstantSearch>
    </Fragment>
  );
};

export default Search;
