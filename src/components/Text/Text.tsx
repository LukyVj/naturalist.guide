/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import cx from "classnames";

const style = {
  root: css``,
};

interface SectionProps {
  className?: string;
  big?: boolean;
  value: string;
  [key: string]: any;
}

const Section: React.FC<SectionProps> = ({ big, className, value }) => {
  return (
    <p
      className={cx(
        "pv-32 maw-1200 m-auto",
        big ? "fsz-20" : "fsz-16",
        className && className
      )}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

export default Section;
