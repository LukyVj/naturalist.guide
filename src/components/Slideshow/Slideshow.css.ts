import { css } from "@emotion/core";

export default {
  root: css``,

  animate: css`
    &:active,
    &:focus {
      animation: bounce 0.3s ease forwards;
    }

    @keyframes bounce {
      from {
        transform: scale(1);
      }
      50% {
        transform: scale(0.8);
      }
      80% {
        transform: scale(1.1);
      }
      to {
        transform: scale(1);
      }
    }
  `,
};
