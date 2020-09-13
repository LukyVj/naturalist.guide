/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

interface SectionProps {
  className?: string;
}

const Section: React.FC<SectionProps> = (p) => {
  return (
    <section className="pv-32 ph-16 maw-100p md:maw-1200 m-auto md:w-100p">
      {p.children}
    </section>
  );
};

export default Section;
