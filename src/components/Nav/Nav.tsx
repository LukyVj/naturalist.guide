/** @jsx jsx */
import SplitText from "../SplitText";
import { css, jsx } from "@emotion/core";

const style = {
  root: css``,
  navigation: css`
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  `,
};

const Nav = () => {
  return (
    <nav
      className="pos-sticky top-0 w-100p h-80 z-max bxs-large ph-80 d-flex ai-center"
      css={style.navigation}
    >
      <SplitText
        copy="Red Dead Redemption 2 - Naturalist"
        tag="h1"
        className="fsz-32"
      />
    </nav>
  );
};

export default Nav;
