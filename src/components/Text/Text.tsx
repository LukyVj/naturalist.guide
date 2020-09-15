/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import cx from "classnames";

interface SectionProps {
  className?: string;
  big?: boolean;
  value?: any;
  prefix?: string | JSX.Element;
  [key: string]: any;
}

const Section: React.FC<SectionProps> = ({ big, className, value, prefix }) => {
  return (
    <span className="d-flex pv-16">
      {prefix && <span className="fxg-0 as-start mr-8">{prefix}</span>}
      <p
        className={cx(
          big ? "fsz-20" : "fsz-18",
          className && className,
          "ai-start p-0 m-0"
        )}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </span>
  );
};

export default Section;
