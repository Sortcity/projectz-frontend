export const injectGradientAnimation = () => {
  if (typeof document === "undefined") return; // only run on web

  const styleId = "gradient-animation-style";
  if (document.getElementById(styleId)) return; // prevent duplicate injection

  const style = document.createElement("style");
  style.id = styleId;
  style.innerHTML = `
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `;
  document.head.appendChild(style);
};
