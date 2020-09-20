/** @jsx jsx */
import { useState } from "react";
import { css, jsx } from "@emotion/core";
import cx from "classnames";

import { NavLink } from "react-router-dom";

import { Home, Search, Info, MessageCircle } from "react-feather";

const style = {
  root: css``,
  item: css`
    -webkit-mask-box-image: url(${require("../../images/masks/text-banner.svg")})
      14 repeat;
    mask-border: url(${require("../../images/masks/text-banner.svg")}) 14 repeat;
    text-shadow: 0 1px 0 black;
  `,
  bannerNetwork: {
    button: css`
      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.8),
        inset 0 0 10px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.5);
    `,
    menu: css`
      animation: appear 0.4s ease forwards;
      top: 40px;
      @keyframes appear {
        from {
          opacity: 0;
          transform: translateY(-100px);
        }

        to {
          opacity: 1;
          transform: 0;
        }
      }
    `,
  },
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
    name: "Credits",
    url: "/credits",
    icon: <Info />,
  },
  {
    name: "Contests",
    url: "/contests",
    icon: <Info />,
  },
  {
    name: "Discord Server",
    url: "https://discord.gg/RJ2YYN",
    icon: <MessageCircle />,
  },
];

const linkClasses =
  "td-none color-white fw-bold d-flex ai-center jc-center p-16 w-100p h-100p pos-relative";

const BannerNetwork = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const links = [
    {
      name: "🧿   Madamnazar.io",
      url: "https://madamnazar.io",
    },
    {
      name: "🌱   Naturalist.guide",
      url: window.location.origin,
    },
  ];
  return (
    <div
      className="w-300 pos-relative z-max mr-16"
      onMouseLeave={() => {
        setShowDropDown(false);
      }}
    >
      <span
        className="d-block ml-8 h-70p pos-relative"
        onMouseOver={() => {
          setShowDropDown(true);
        }}
      >
        <a
          href="https://madamnazario-network.surge.sh"
          className="d-inline-block pos-relative pv-8 ph-16 d-flex ai-center ff-lino color-white td-none bdr-4 bgc-farwest z-5"
          css={style.bannerNetwork.button}
        >
          <span role="img" aria-label="nazar icon">
            🧿
          </span>
           MadamNazar.io Network
        </a>
        {showDropDown && (
          <div
            className={cx(
              "pos-absolute top-0 left-0 bgc-ground w-100p z-0 bdblr-6 bdbrr-6 w-100p"
            )}
            css={style.bannerNetwork.menu}
            onMouseOver={() => {
              setShowDropDown(true);
            }}
          >
            <ul className="lis-none d-flex fxd-column jc-center ai-center p-0 m-0 bxs pv-16 w-100p">
              {links.map((link, i) => (
                <li
                  key={link.name}
                  className={cx(
                    "w-100p d-block ",
                    i <= 0 && "bdbw-1 bdc-black bdbs-solid"
                  )}
                >
                  <a
                    href={link.url}
                    className="p-8 ph-16 color-current td-none w-100p h-100p d-block fsz-18 hover:bgc-white color-white hover:color-farwest hover:fw-bold"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </span>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="h-auto z-max d-flex ai-center pv-8">
      <ul className="lis-none p-0 m-0 w-100p ph-16 md:ph-32">
        {Object.entries(menu).map((obj: any) => {
          const name = obj[1].name;
          const value = obj[1].url;
          const icon = obj[1].icon;

          return (
            <li
              className="d-inline-block mh-8 bgc-black cursor-pointer ff-lino lsp-big fw-thin"
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
                  activeClassName="bgc-farwest"
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
      <BannerNetwork />
    </nav>
  );
};

export default Nav;
