/** @jsx jsx */
/* eslint-disable */
import { Fragment } from "react";

import { jsx } from "@emotion/core";
import { SITE_NAME_MAIN_LINE } from "../../constants/misc";

import Section from "../../components/Section";

const intro = [
  "The data you can find on this website are for the most part publicly given by @RockStar Games, and manually fetched by different people including the moderator team of the <a href='https://discord.gg/RJ2YYN' target='_blank' rel='noopener noreferrer'>MadamNazar.io Discord server</a>",
  "The search experience of the website is powered by <a href='https://algolia.com' target='_blank' rel='noopener noreferrer'>Algolia</a>.",
  "There is absolutely no information stored on this website",
];

const About = () => {
  return (
    <Section>
      <header className="ta-center">
        <h2>About this project</h2>
      </header>
      <article>
        {intro.map((paragraph, i) => (
          <p
            className="ta-center"
            key={i}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </article>
    </Section>
  );
};

export default About;
