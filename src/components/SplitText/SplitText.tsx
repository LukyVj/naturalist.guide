import React, { useState, useEffect } from "react";
import Emoji from "../Emoji";
import emojis from "../../data/emojis";

import cx from "classnames";

interface SplitTextProps {
  copy: any;
  tag?: string;
  CustomTag?: any;
  className?: string;
  emojiA?: boolean;
  font?: "pangolin" | "playfair";
  randomWeight?: boolean;
}

const SplitText = ({
  copy,
  tag = "span",
  CustomTag = tag,
  className,
  emojiA = false,
  font = "playfair",
  randomWeight = false,
}: SplitTextProps) => {
  const [emoji, setEmoji] = useState("👩‍🌾");

  const weights = [
    "thin",
    "extralight",
    "light",
    "normal",
    "medium",
    "semibold",
    "bold",
    "extrabold",
    "black",
  ];

  useEffect(() => {
    const pickedEmoji =
      emojis.persona[Math.floor(Math.random() * emojis.persona.length)];
    setEmoji(pickedEmoji);
  }, []);

  return (
    <CustomTag className={cx("d-flex ai-center", className)}>
      {copy.split("").map(function (char: string, index: any) {
        const pickedWeight =
          weights[Math.floor(Math.random() * weights.length)];

        return emojiA && char === "a" ? (
          <Emoji emoji={emoji} label={emoji} />
        ) : (
          <span
            aria-hidden="true"
            key={index}
            className={cx(`ff-${font}`, randomWeight && `fw-${pickedWeight}`)}
          >
            {char === " " ? " " : char}
          </span>
        );
      })}
    </CustomTag>
  );
};

export default SplitText;
