/** @jsx jsx */
/* eslint-disable */
import React, { useState, Fragment, useRef, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import { jsx, css } from "@emotion/core";
import cx from "classnames";

import habitatsData from "../../data/habitats";
import legendaryData from "../../data/legendary";

import {
  InstantSearch,
  connectSearchBox,
  Hits,
  connectHighlight,
  connectHits,
  connectToggleRefinement,
  connectRefinementList,
  Configure,
  connectPagination,
} from "react-instantsearch-dom";

import Button from "../../components/Button";
import SideBarInfos from "./SidebarInfos";

import { slugify } from "../../scripts/helper";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

const styles = {
  root: css`
    background: url(${require("../../images/compendiumPhotoBg.png")}) no-repeat
      center center / 100% 100%;

    &:hover:after {
      border-color: #ca0411;
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
  searchBox: css`
    -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
      14 repeat;
    mask-border: url(${require("../../images/masks/text-banner.svg")}) 14 repeat;
  `,
  sidebar: css`
    background: url(url(${require("../../images/bg.jpg")}));
  `,
  customRefinement: (item, a) =>
    css`
      background: #ca0411;
      padding: 8px;
      -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
        8 repeat;
      mask-border: url(${require("../../images/masks/text-banner.svg")}) 8
        repeat;
      background: ${a && a.isRefined === true && "black"};
    `,
};

const ToggleRefinement = ({
  currentRefinement,
  label,
  count,
  refine,
  createURL,
}) => (
  <a
    href={createURL(!currentRefinement)}
    style={{ fontWeight: currentRefinement ? "bold" : "" }}
    onClick={(event) => {
      event.preventDefault();
      refine(!currentRefinement);
    }}
    css={css`
      color: #fcb110;
    `}
    className="fw-bold"
  >
    {label} ({currentRefinement ? count.checked : count.unchecked})
  </a>
);

const CustomToggleRefinement = connectToggleRefinement(ToggleRefinement);

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
                background: #ca0411;
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
                background: #ca0411;
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
  const [animal, setAnimal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchBoxRef = useRef(null);
  const [expandImages, setExpandImages] = useState(false);
  const [modalData, setModalData] = useState(null);

  const CustomRefinementListHabitat = connectRefinementList(
    ({ refine, items }) => (
      <div className="d-flex fxd-column fxw-wrap w-100p ts-regular jc-between">
        {habitatsData.map((item) => {
          const a = items.find((i) => i.label === item.name);
          return (
            <button
              type="button"
              className="pos-relative p-4 app-none bdw-0 fsz-12 color-white m-0 fx-6 cursor-pointer"
              key={item.name}
              css={styles.customRefinement(item, a)}
              onClick={(e) => {
                e.preventDefault();
                const refinementItem = items.find((i) => i.label === item.name);
                refine(refinementItem.value);
              }}
            >
              <h3 className="ts-regular">{item.name}</h3>
            </button>
          );
        })}
      </div>
    )
  );

  const CustomRefinementListLegendary = connectRefinementList(
    ({ refine, items }) => (
      <div className="d-flex fxd-column fxw-wrap w-100p ts-regular jc-between">
        {legendaryData.map((item) => {
          const b = items.find((i) => i.label === item.name);
          return (
            <button
              type="button"
              className="pos-relative p-4 app-none bdw-0 fsz-12 color-white m-0 fx-6 cursor-pointer"
              key={item.name}
              css={styles.customRefinement(item, b)}
              onClick={(e) => {
                e.preventDefault();
                const refinementItem = items.find((i) => i.label === item.type);
                refine(refinementItem.value);
              }}
            >
              <h3>{item.name}</h3>
            </button>
          );
        })}
      </div>
    )
  );

  const searchStyle = `
  .ais-Hits-list {
        display: grid;
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        grid-template-columns: repeat(${sidebarOpen ? 3 : 4}, 1fr);
        grid-auto-rows: 1fr;
        grid-column-gap: 16px;
        grid-row-gap: 16px;
    }

    @media (max-width: 1200px) {
     .ais-Hits-list { 
       grid-template-columns: repeat(${sidebarOpen ? 1 : 2}, 1fr);
    }
    }

    .ais-Hits-item {
        height: auto;
    }
    .ais-Hits-item h2,
    .ais-Hits-item p {
        height: 100%;
    }`;

  const SearchBox = ({ currentRefinement, refine }) => (
    <div
      className="mb-32 h-60 pos-sticky top-0 z-max p-8"
      css={css`
        background: #1a1a1a;
      `}
    >
      <input
        type="search"
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
        className="w-100p h-100p ap-none bdw-0 ff-lino  pv-24 ph-32 bgc-armadillo color-white fsz-24"
        placeholder="Search for animals, regions and more!"
        css={styles.searchBox}
        ref={searchBoxRef}
      />
    </div>
  );

  const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => (
    <ul className="lis-none d-flex">
      {new Array(nbPages).fill(null).map((_, index) => {
        const page = index + 1;
        const style = {
          fontWeight: currentRefinement === page ? "bold" : "",
        };

        return (
          <li key={index} className="fxg-1">
            <Button
              href={createURL(page)}
              css={css`
                background: ${currentRefinement === page
                  ? "white"
                  : "var(--farwest)"};
                color: ${currentRefinement === page
                  ? "var(--farwest)"
                  : "white"};
                &:hover {
                  color: ${currentRefinement === page
                    ? "var(--farwest)"
                    : "white"};
                }
              `}
              className="w-100p h-100p"
              onClick={(event) => {
                event.preventDefault();
                refine(page);
              }}
              label={page}
            />
          </li>
        );
      })}
    </ul>
  );

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
                  src={`https://lukyvj.github.io/rdr2-naturalist-almanac/animals/icons/${data.thumbnailName}.png`}
                  className="w-100p h-100p va-middle obf-cover obp-center"
                  alt={`icon from rockstar®  for ${data.name}`}
                  loading="lazy"
                />
              </div>
              <img
                src={`https://lukyvj.github.io/rdr2-naturalist-almanac/animals/photos/${data.photoName}.jpg`}
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
              {/* <Button
                label="Interactive map"
                onClick={() => {
                  setViewIframe(true);
                  setFrameUrl(iframeUrl);
                }}
              /> */}
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
                      ? `https://lukyvj.github.io/rdr2-naturalist-almanac/maps/${
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
    return (
      <article
        className="pos-relative top-0 h-100p d-flex fxd-column jc-between h-auto hover:color-white cursor-pointer"
        css={[styles.root]}
        onClick={() => {
          setAnimal(hit);
          setSidebarOpen(true);
        }}
      >
        <header className="p-8 ph-16">
          <span css={styles.name} className="h-100p ts-regular">
            <CustomHighlight hit={hit} attribute="name" />
          </span>
        </header>
        <div className="p-16 pt-0">
          <CustomHighlight hit={hit} attribute="description" />

          <div className="h-120 d-grid g-5">
            <img
              src={`https://lukyvj.github.io/rdr2-naturalist-almanac/animals/icons/${hit.thumbnailName}.png`}
              className="w-90p h-90p obf-cover obp-center va-middle gcstart-1 gcend-3 as-center"
              alt={`icon from rockstar®  for ${hit.name}`}
              loading="lazy"
            />{" "}
            <img
              src={
                hit.mapLocation
                  ? `https://lukyvj.github.io/rdr2-naturalist-almanac/maps/${
                      hit.isLegendary === true
                        ? `legendary/${slugify(hit.name)}.png`
                        : `${slugify(hit.mapLocation)}.png`
                    }`
                  : require("../../images/404.png")
              }
              onError={() =>
                (mapImageRef.current.src = require("../../images/404.png"))
              }
              className="w-100p h-100p obf-cover obp-center gcstart-3 gcend-6"
              alt={`Location for ${hit.name}`}
              loading="lazy"
              ref={mapImageRef}
              css={css`
                -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
                  14 repeat;
                mask-border: url(${require("../../images/masks/text-banner.svg")})
                  14 repeat;

                filter: sepia(100);
              `}
            />
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
          <h3>habitats</h3>
        </header>
        <CustomRefinementListHabitat attribute="habitat" />
        <header>
          <h3>Legendary type</h3>
        </header>
        <CustomRefinementListLegendary attribute="legendaryType" />

        <CustomToggleRefinement
          attribute="isLegendary"
          label="Legendary animals"
          value={true}
        />
      </aside>
    );
  };

  const CustomHits = connectHits(Hit);
  const CustomSearchBox = connectSearchBox(SearchBox);
  const CustomPagination = connectPagination(Pagination);

  return (
    <Fragment>
      <style>{searchStyle}</style>
      <InstantSearch
        indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}
      >
        <Configure hitsPerPage={8} />
        <CustomSearchBox />
        {expandImages && <Modal data={modalData} />}
        <div className="pos-relative top-0 w-100p">
          <div className="d-flex">
            <SidebarFilters />
            <div className={cx(["p-8", sidebarOpen ? "fx-8" : "fx-12"])}>
              <Hits hitComponent={CustomHits} />
              <CustomPagination />
            </div>
            {sidebarOpen && (
              <SideBarInfos
                data={animal}
                setSidebarOpen={setSidebarOpen}
                setExpandImages={setExpandImages}
                setModalData={setModalData}
              />
            )}
          </div>
        </div>
      </InstantSearch>
    </Fragment>
  );
};

export default Search;
