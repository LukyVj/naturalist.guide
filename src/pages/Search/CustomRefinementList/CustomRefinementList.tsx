/** @jsx jsx */
import { Fragment, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import { connectRefinementList } from "react-instantsearch-dom";

import cx from "classnames";

import Image from "../../../components/Image";

import * as colors from "../../../constants/colors";

interface RefinementListProps {
  [key: string]: any;
}

interface ListItemProps {
  label: string;
  value: string;
  count: Number;
  isRefined: boolean;
  title?: string;
  icon?: boolean;
}
const RefinementList = ({
  items,
  isFromSearch,
  refine,
  createURL,
  title,
  icon = false,
  value,
}: RefinementListProps) => {
  useEffect(() => {
    if (value) {
      refine(value);
    }
  }, [refine, value]);
  return (
    <Fragment>
      <header
        css={css`
          background: url(${require("../../../images/menu_header.png")})
            no-repeat center center / 100% 100%;
        `}
        className="pv-8 mb-8 d-flex ai-center jc-center"
      >
        <h3 className="p-0 m-0">{title}</h3>
      </header>
      <ul className="lis-none p-0 m-0 mb-8">
        {items.map((item: ListItemProps) => {
          const label = item.label.startsWith("animal-")
            ? item.label.replace("animal-", "")
            : item.label.includes("Habitats")
            ? item.label.replace("Habitats", "")
            : item.label;
          return (
            <li key={item.label} className="d-flex pv-4">
              <div
                className="tick mr-8"
                css={css`
                  width: 1.2em;
                  height: 1.2em;
                  min-width: 1.2em;
                  min-height: 1.2em;
                  position: relative;
                  top: 1px;
                  background: ${item.isRefined
                    ? `url(${require("../../../images/menu_icon_tick.png")})no-repeat center center / 80%, url(${require("../../../images/selection_box_square.png")})no-repeat center center / 110%`
                    : `url(${require("../../../images/selection_box_square.png")})no-repeat center center / 100%`};
                `}
              ></div>
              <a
                href={createURL(item.value)}
                onClick={(event) => {
                  event.preventDefault();
                  refine(item.value);
                  console.log(item.value);
                }}
                className={cx(
                  "color-white td-none d-flex ai-center",
                  item.isRefined && "fw-bold"
                )}
                css={
                  item.isRefined &&
                  css`
                    border-bottom: 1px solid ${colors.FARWEST};
                  `
                }
              >
                {icon && label !== "false" && (
                  <Image
                    src={require(`../../../images/icons/satchel_${label}.png`)}
                    alt="icon"
                    className="w-20 mr-8"
                  />
                )}
                {label} ({item.count})
              </a>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

const CustomRefinementList = connectRefinementList(RefinementList);
export default CustomRefinementList;
