/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { connectSearchBox } from "react-instantsearch-dom";

const styles = {
  searchBox: css`
    -webkit-mask-box-image: url(${require("../../../images/masks/text-banner.svg")})
      14 repeat;
    mask-border: url(${require("../../../images/masks/text-banner.svg")}) 14
      repeat;
  `,
};

interface SearchBoxProps {
  searchBoxRef: any;
  [key: string]: any;
}

const SearchBox = ({
  currentRefinement,
  refine,
  searchBoxRef,
}: SearchBoxProps) => (
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

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
