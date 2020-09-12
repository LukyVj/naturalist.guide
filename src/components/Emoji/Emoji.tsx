/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";

import cx from "classnames";

interface EmojiProps {
  label: string;
  emoji: any;
  reversed?: boolean;
  className?: string;
}

const Emoji = ({
  label = "emoji",
  emoji,
  reversed = false,
  className,
}: EmojiProps) => (
  <span
    aria-labelledby={label}
    role="img"
    className={cx("d-inline-block", className)}
    css={[
      reversed
        ? css`
            transform-origin: center center;
            transform: rotateY(180deg);
          `
        : null,
      css`
        transform: scale(0.9);
      `,
    ]}
  >
    {emoji}
  </span>
);

export default Emoji;
