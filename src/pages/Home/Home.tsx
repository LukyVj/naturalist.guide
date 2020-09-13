/** @jsx jsx */
/* eslint-disable */
import { Fragment } from "react";

import { jsx, css } from "@emotion/core";
import { SITE_NAME_MAIN_LINE } from "../../constants/misc";

import Section from "../../components/Section";
import Text from "../../components/Text";

const intro = [
  "This website is here to help you explore and discover the wild life of the world of Red dead redemption 2.",
  "Here you will find some information about the wild life and plants of RDR2.",
  "These informations are open source and are also powering some bots in the <a href='https://discord.gg/RJ2YYN' target='_blank' rel='noopener noreferrer'>MadamNazar.io Discord server</a>.",
  "You can find the data used in this website on the <a href='https://github.com/LukyVj/rdr2-naturalist-almanac' target='_blank' rel='noopener noreferrer'>Github project</a>",
];

const Home = () => {
  return (
    <Section>
      <header className="ta-center">
        <h2
          className="fsz-48"
          css={css`
            text-shadow: 5px 0px 40px rgba(255, 255, 255, 0.6);
          `}
        >
          Welcome in the {SITE_NAME_MAIN_LINE}
        </h2>
      </header>
      <article>
        {intro.map((paragraph, i) => (
          <Text className="ta-center" key={i} big value={paragraph} />
        ))}
      </article>
    </Section>
  );
};

export default Home;
