/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import cx from "classnames";

interface ButtonProps {
  label: string;
  onClick?: Function;
  href?: string;
  tag?: string;
  className?: string;
  [key: string]: any;
}

const styles = {
  root: css`
    -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
      14 repeat;
    mask-border: url(${require("../../images/masks/text-banner.svg")}) 14 repeat;
  `,
};
const Button = ({
  other,
  onClick,
  label,
  href,
  tag,
  className,
}: ButtonProps) => {
  const CustomTag = tag ? tag : "button";
  return (
    <CustomTag
      {...other}
      css={styles.root}
      onClick={onClick}
      href={href}
      className={cx(
        className,
        "cursor-pointer bgc-black color-white hover:color-farwest pv-16 ph-16 fw-bold fsz-16 ff-lino ot-none"
      )}
    >
      {label}
    </CustomTag>
  );
};

export default Button;
