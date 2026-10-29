/** @jsx jsx */
/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import { jsx, css, keyframes } from "@emotion/core";
import { Info } from "react-feather";

import Section from "../../components/Section";
import Image from "../../components/Image";

const styles = {
  dash: css``,
  reveal: keyframes`
      ${[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((id) => {
        const xid = id.toString().split("0")[0];
        return css`
          ${id}% {
            ${id === 100
              ? `background:transparent;`
              : css`
                  background: url(${require(`../../images/animations/reveal${xid}.png`)})
                    no-repeat center center / cover;
                `}
          }
        `;
      })}
    }
  `,
};

const Credits = () => {
  const [count, setCount] = useState(1);
  const requestRef = useRef(1);
  const previousTimeRef = useRef(1);

  const animate = (time: any) => {
    if (previousTimeRef != undefined && previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;

      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setCount((prevCount) => (prevCount + deltaTime * 0.01) % 100);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
  return (
    <Section>
      <header className="ta-center">
        <h2 className="fsz-48 ts-white">
          <Info className="va-middle mr-8" /> Credits this project
        </h2>

        <div
          className="pos-relative w-300 m-auto"
          css={css`
            &:before {
              content: "";
              display: block;
              width: 100%;
              height: 100%;
              position: absolute;
              animation: ${styles.reveal} 2s linear forwards;
              z-index: 5;
            }
          `}
        >
          <Image
            src={require("../../images/harriet-davenport.png")}
            alt="lovely harriet"
            className="w-300 h-auto"
          />
        </div>
      </header>
    </Section>
  );
};

export default Credits;
