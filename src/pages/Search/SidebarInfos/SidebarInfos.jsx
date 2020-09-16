/** @jsx jsx */
/* eslint-disable */
import React, { useState, Fragment } from "react";
import Button from "../../../components/Button";

import { css, jsx } from "@emotion/core";
import cx from "classnames";

import { slugify } from "../../../scripts/helper";

const SideBarInfos = ({
  data,
  setExpandImages,
  setModalData,
  setSidebarOpen,
  className,
}) => {
  const iframeUrl = `https://jeanropke.github.io/RDOMap/?q=${
    data.isLegendary
      ? data.thumbnailName.toLowerCase()
      : data.thumbnailName.toLowerCase().split("mp_")[1]
  }`;
  const [viewIframe, setViewIframe] = useState(false);
  const [frameUrl, setFrameUrl] = useState(iframeUrl);

  return (
    <div
      className={cx(
        "fx-4 pos-sticky pv-24 ph-8 d-flex ai-center jc-center",
        className
      )}
      css={css`
        top: 82px;
        height: calc(100vh - 150px);
      `}
    >
      <aside
        className="ph-16 h-100p"
        css={css`
          &:before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            background: url(${require("../../../images/bgSidebar.jpg")});
            -webkit-mask-box-image: url(${require("../../../images/masks/text-banner.svg")})
              14 repeat;
            mask-border: url(${require("../../../images/masks/text-banner.svg")})
              14 repeat;
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
          }
        `}
      >
        <div className="pos-relative z-1 h-100p ov-scroll">
          <Button onClick={() => setSidebarOpen(false)} label="close" />
          <div className="ta-center">
            <picture className="pos-relative d-block w-100p h-300">
              <div className="pos-absolute bot-0 left-0 w-100 h-100 z-2">
                <img
                  src={`https://lukyvj.github.io/rdr2-naturalist-almanac/${data.thumbnailName}.png`}
                  className="w-100p h-100p va-middle obf-cover obp-center"
                  alt={`icon from rockstar®  for ${data.name}`}
                  loading="lazy"
                />
              </div>
              <img
                src={`https://lukyvj.github.io/rdr2-naturalist-almanac/${data.photoName}.jpg`}
                className="w-100p h-100p pos-absolute top-0 left-0 z-0 obf-cover obp-center"
                alt={`screenshot from rockstar® for ${data.name}`}
                loading="lazy"
                css={css`
                  -webkit-mask-box-image: url(${require("../../../images/masks/text-banner.svg")})
                    14 repeat;
                  mask-border: url(${require("../../../images/masks/text-banner.svg")})
                    14 repeat;
                `}
              />
            </picture>
            <h2 className="color-armadillo fw-bold pv-16 ph-0 ta-left m-0">
              {data.name}:
            </h2>
          </div>
          <div>
            <p
              className="color-black p-0 m-0 lh-big"
              css={css`
                ::first-letter {
                  font-weight: bold;
                  font-size: 24px;
                }
              `}
            >
              {data.isLegendary
                ? data.legendaryDescriptions[4]
                : data.description}
            </p>
          </div>
          <div>
            <h4>Weather conditions</h4>
            {data.isLegendary && (
              <ul>
                {data.spawnConditions.length &&
                  data.spawnConditions.map((condition, index) => (
                    <li>
                      {Object.keys(condition).map((key) => {
                        const newKey = `${key} `;
                        return newKey;
                      })}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div
            className="pos-relative"
            css={css`
              filter: drop-shadow(-1px -1px 0 #000) drop-shadow(1px 1px 0 #000);
            `}
          >
            <div>
              <div className="d-grid g-3 ggap-8 pv-16">
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
                <Button
                  label="Expand"
                  onClick={() => {
                    setExpandImages(true);
                    setModalData(data);
                  }}
                />
              </div>
              <div>
                {viewIframe && (
                  <Fragment>
                    <small>Use the mousewheel to zoom/unzoom</small>
                    <iframe
                      title="map"
                      src={frameUrl}
                      frameborder="0"
                      width="100%"
                      height="300px"
                      css={css`
                        -webkit-mask-box-image: url(${require("../../../images/masks/text-banner.svg")})
                          14 repeat;
                        mask-border: url(${require("../../../images/masks/text-banner.svg")})
                          14 repeat;
                      `}
                    ></iframe>
                  </Fragment>
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
                        : require("../../../images/404.png")
                    }
                    className="w-100p h-100p obf-cover obp-center"
                    alt={`Location for ${data.name}`}
                    loading="lazy"
                    css={css`
                      -webkit-mask-box-image: url(${require("../../../images/masks/text-banner.svg")})
                        14 repeat;
                      mask-border: url(${require("../../../images/masks/text-banner.svg")})
                        14 repeat;
                    `}
                  />
                )}
              </div>
            </div>
            <Button
              href={`https://jeanropke.github.io/RDOMap/?q=${
                data.isLegendary
                  ? data.thumbnailName.toLowerCase()
                  : data.thumbnailName.toLowerCase().split("mp_")[1]
              }`}
              tag="a"
              label="View on RDOMap"
              target="_blank"
              className="w-100p d-block p-16 td-none ta-center"
            ></Button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideBarInfos;
