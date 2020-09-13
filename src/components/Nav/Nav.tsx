/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { NavLink } from "react-router-dom";

import { Home, Search, Info, Map, MessageCircle } from "react-feather";

const style = {
  root: css``,
  item: css`
    -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
      14 repeat;
    mask-border: url(${require("../../images/masks/text-banner.svg")}) 14 repeat;
  `,
};

const menu = [
  {
    name: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    name: "Search",
    url: "/search",
    icon: <Search />,
  },
  {
    name: "About",
    url: "/about",
    icon: <Info />,
  },
  {
    name: "MadamNazar.io",
    url: "https://madamnazar.io",
    icon: <Map />,
  },
  {
    name: "Discord Server",
    url: "https://discord.gg/RJ2YYN",
    icon: <MessageCircle />,
  },
];

const linkClasses =
  "td-none color-white fw-bold d-flex ai-center p-16 w-100p h-100p pos-relative";

const Nav = () => {
  return (
    <nav className="pos-sticky top-0 w-100p h-80 z-max d-flex ai-center">
      <ul className="lis-none p-0 m-0 w-100p ph-32 d-flex ai-center jc-center">
        {Object.entries(menu).map((obj: any) => {
          const name = obj[1].name;
          const value = obj[1].url;
          const icon = obj[1].icon;

          console.log(obj);
          return (
            <li
              className="d-inline-block mh-8 bgc-black cursor-pointer"
              css={style.item}
            >
              {value.startsWith("http") ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  <span>{icon}</span>
                  <span className="ml-8">{name}</span>
                </a>
              ) : (
                <NavLink
                  to={value}
                  className={linkClasses}
                  activeClassName="color-black bgc-farwest"
                  exact
                >
                  <span>{icon}</span>
                  <span className="ml-8">{name}</span>
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
