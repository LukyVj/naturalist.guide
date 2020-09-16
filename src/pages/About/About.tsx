/** @jsx jsx */
/* eslint-disable */
import { Fragment } from "react";
import { jsx, css } from "@emotion/core";
import { Info } from "react-feather";

import Section from "../../components/Section";
import Text from "../../components/Text";
import Image from "../../components/Image";

const intro = [
  "The data you can find on this website are for the most part publicly given by RockStar Games®, Partially given by <a href='https://discord.gg/RJ2YYN' target='_blank' rel='noopener noreferrer'>Red Dead Redemption Fandom</a> and manually fetched by different people including the moderator team of the <a href='https://discord.gg/RJ2YYN' target='_blank' rel='noopener noreferrer'>MadamNazar.io Discord server</a>",
  "The search experience of the website is powered by <a href='https://algolia.com' target='_blank' rel='noopener noreferrer'>Algolia</a>.",
  "There is absolutely no information stored on this website",
  "Icons from <a href='https://feathericons.com/' target='_blank' rel='noopener noreferrer'>Feather Icons</a>",
  "You can find the data used in this website on the <a href='https://github.com/LukyVj/rdr2-naturalist-almanac' target='_blank' rel='noopener noreferrer'>Github repository</a> and the website current code on this other <a href='https://github.com/LukyVj/naturalist.guide' target='_blank' rel='noopener noreferrer'>Github repository</a>",
];

const styles = {
  dash: css``,
};

const About = () => {
  return (
    <Section>
      <header className="ta-center">
        <h2 className="fsz-48 ts-white">
          <Info className="va-middle mr-8" /> About this project
        </h2>
      </header>
      <article>
        {intro.map((paragraph, i) => (
          <Fragment key={i}>
            <Text
              key={i}
              className="first-letter"
              value={paragraph}
              prefix={
                <Image
                  src={require("../../images/tick.png")}
                  alt="tick"
                  className="bdw-1 bdc-white bds-solid w-30 h-30 obf-contain obp-center p-4"
                />
              }
              css={styles.dash}
            />
          </Fragment>
        ))}
      </article>
    </Section>
  );
};

export default About;
