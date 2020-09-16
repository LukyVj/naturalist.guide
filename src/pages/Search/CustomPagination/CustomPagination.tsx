/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { connectPagination } from "react-instantsearch-dom";

import Button from "../../../components/Button/Button";

interface PaginationProps {
  [key: string]: any;
}
const Pagination = ({
  currentRefinement,
  nbPages,
  refine,
  createURL,
}: PaginationProps) => (
  <ul className="lis-none d-flex w-100p">
    {new Array(nbPages).fill(null).map((_, index) => {
      const page = index + 1;

      if (index < 10) {
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
              onClick={(event: any) => {
                event.preventDefault();
                refine(page);
              }}
              label={page}
            />
          </li>
        );
      } else {
        return false;
      }
    })}
  </ul>
);
const CustomPagination = connectPagination(Pagination);

export default CustomPagination;
