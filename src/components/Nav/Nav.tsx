/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Link } from "react-router-dom";

const style = {
  root: css``,
  item: css`
    -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
      14 repeat;
    mask-border: url(${require("../../images/masks/text-banner.svg")}) 14 repeat;
  `,
};

const menu = {
  Home: "/",
  Search: "/search",
  About: "/about",
  "MadamNazar.io": "https://madamnazar.io",
  Discord: "https://discord.gg/RJ2YYN",
};

const linkClasses = "td-none color-white fw-bold";

const Nav = () => {
  return (
    <nav className="pos-sticky top-0 w-100p h-80 z-max ph-32 d-flex ai-center">
      <ul className="lis-none p-0 m-0 w-100p">
        {Object.entries(menu).map((obj: any) => {
          const key = obj[0];
          const value = obj[1];
          return (
            <li className="d-inline-block p-16 bgc-black" css={style.item}>
              {value.startsWith("http") ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  {key}
                </a>
              ) : (
                <Link to={value} className={linkClasses}>
                  {key}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
