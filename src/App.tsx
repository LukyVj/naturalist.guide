/** @jsx jsx */
import { jsx } from "@emotion/core";

import Hero from "./components/Hero";
import * as ReactGA from "react-ga";

// import Card from "./components/Card";

import "./css/fragments.css";
import "./css/App.css";
import "./css/fonts.css";

import Search from "./components/Search/Search";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize("UA-42634383-8");
      ReactGA.pageview(window.location.pathname);
    }
  }, []);
  return (
    <div className="App">
      <Hero />

      <section className="p-16">
        <Search />
      </section>

      <footer className="ta-center">
        <h3 className="fsz-16">
          © 2020 - Red Dead Redemption - Animal Almanac, by{" "}
          <a href="https://twitter.com/lukyvj" className="color-farwest">
            @lukyvj
          </a>
        </h3>
        <h3 className="fsz-16">
          Red Dead Online, RDR and RDO are registered trademarks by Rockstar
          Games®.
        </h3>
        <h4 className="color-farwest fsz-14 d-inline-block">
          This site is not endorsed, recognised, sponsored, or approved by
          Rockstar Games®.
        </h4>
      </footer>
    </div>
  );
};
export default App;
