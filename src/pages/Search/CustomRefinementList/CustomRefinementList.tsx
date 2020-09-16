/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { connectRefinementList } from "react-instantsearch-dom";

import cx from "classnames";

import * as colors from "../../../constants/colors";

interface RefinementListProps {
  [key: string]: any;
}

interface ListItemProps {
  label: string;
  value: string;
  count: Number;
  isRefined: boolean;
}
const RefinementList = ({
  items,
  isFromSearch,
  refine,
  createURL,
}: RefinementListProps) => (
  <ul className="lis-none p-0 m-0">
    {items.map((item: ListItemProps) => {
      const label = item.label.startsWith("animal-")
        ? item.label.replace("animal-", "")
        : item.label;
      return (
        <li key={item.label} className="d-flex pv-4">
          <div
            className="tick mr-8"
            css={css`
              width: 1.1em;
              height: 1.1em;
              min-width: 1.1em;
              min-height: 1.1em;
              border: 1px solid ${item.isRefined ? colors.FARWEST : "#fff"};
              position: relative;
              top: 1px;
              background: ${item.isRefined
                ? `url(${require("../../../images/tick.png")})no-repeat center center / 80%`
                : "transparent"};
            `}
          ></div>
          <a
            href={createURL(item.value)}
            onClick={(event) => {
              event.preventDefault();
              refine(item.value);
            }}
            className={cx("color-white td-none", item.isRefined && "fw-bold")}
            css={
              item.isRefined &&
              css`
                border-bottom: 1px solid ${colors.FARWEST};
              `
            }
          >
            {label} ({item.count})
          </a>
        </li>
      );
    })}
  </ul>
);

const CustomRefinementList = connectRefinementList(RefinementList);
export default CustomRefinementList;
