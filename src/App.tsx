/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";

import Hero from "./components/Hero";
import * as ReactGA from "react-ga";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { SITE_NAME } from "./constants/misc";

import "./css/fragments.css";
import "./css/App.css";
import "./css/fonts.css";

import Nav from "./components/Nav";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Search from "./pages/Search/Search";
import Section from "./components/Section";

const App = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize("UA-42634383-8");
      ReactGA.pageview(window.location.pathname);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Hero />

        <Nav />

        <Switch>
          <Route exact path="/">
            <Section>
              <Home />
            </Section>
          </Route>
          <Route exact path="/search">
            <section className="p-16">
              <Search />
            </section>
          </Route>
          <Route path="/about">
            <Section>
              <About />
            </Section>
          </Route>
        </Switch>
      </Router>

      <footer className="ta-center">
        <h3 className="fsz-16">
          © 2020 - {SITE_NAME}, by{" "}
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
