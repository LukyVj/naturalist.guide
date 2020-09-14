/** @jsx jsx */
/* eslint-disable */

import { jsx, css } from "@emotion/core";

import Section from "../../components/Section";
import Text from "../../components/Text";
import { Info } from "react-feather";

const intro = [
  "The data you can find on this website are for the most part publicly given by RockStar Games®, Partially given by <a href='https://discord.gg/RJ2YYN' target='_blank' rel='noopener noreferrer'Red Dead Redemption Fandom</a> and manually fetched by different people including the moderator team of the <a href='https://discord.gg/RJ2YYN' target='_blank' rel='noopener noreferrer'>MadamNazar.io Discord server</a>",
  "The search experience of the website is powered by <a href='https://algolia.com' target='_blank' rel='noopener noreferrer'>Algolia</a>.",
  "There is absolutely no information stored on this website",
  "Icons from <a href='https://feathericons.com/' target='_blank' rel='noopener noreferrer'>Feather Icons</a>",
];

const About = () => {
  return (
    <Section>
      <header className="ta-center">
        <h2
          className="fsz-48"
          css={css`
            text-shadow: 5px 0px 40px rgba(255, 255, 255, 0.6);
          `}
        >
          <Info className="va-middle mr-8" /> About this project
        </h2>
      </header>
      <article>
        {intro.map((paragraph, i) => (
          <Text key={i} big={true} value={`- ${i + 1}. ${paragraph}`} />
        ))}
      </article>
    </Section>
  );
};

export default About;
