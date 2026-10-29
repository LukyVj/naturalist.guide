/** @jsx jsx */
/* eslint-disable */
import { Fragment } from "react";

import { jsx, css } from "@emotion/core";
import { SITE_NAME_MAIN_LINE } from "../../constants/misc";

import Section from "../../components/Section";
import Text from "../../components/Text";
import Image from "../../components/Image";
import Button from "../../components/Button";

const intro = [
  "This website is here to help you explore and discover the wild life of the world of Red dead redemption 2.",
  "Here you will find some information about the wild life and plants of RDR2.",
  "These informations are open source and are also powering some bots in the <a href='https://discord.gg/RJ2YYN' target='_blank' rel='noopener noreferrer'>MadamNazar.io Discord server</a>.",
];

const Home = () => {
  return (
    <Section>
      <header className="ta-center">
        <h2 className="fsz-48 ts-white">
          Welcome in the {SITE_NAME_MAIN_LINE}
        </h2>
      </header>
      <article className="d-grid g-3">
        <div className="gcstart-1 gcend-2">
          <Image
            src={require("../../images/harriet-davenport.png")}
            alt="Harriet Davenport"
            className="w-100p"
          />
        </div>
        <div className="gcstart-2 gcend-4 ph-16 first-letter">
          <Fragment>
            {intro.map((paragraph, i) => (
              <Text key={i} value={paragraph} />
            ))}
            <Text big value="You can find information about:" />
            {[
              { name: "naturalist animals", value: "animal-naturalist" },
              { name: "plants", value: "plants" },
              { name: "birds", value: "animal-birds" },
              { name: "fishes", value: "animal-fishes" },
              { name: "horses", value: "animal-horses" },
              { name: "other animals", value: "animal-general" },
            ].map((type: any) => {
              return (
                <Button
                  key={type.name}
                  label={type.name}
                  href={`/search?t=${type.value}`}
                  tag="a"
                />
              );
            })}
          </Fragment>
        </div>
      </article>
      <article></article>
    </Section>
  );
};

export default Home;
