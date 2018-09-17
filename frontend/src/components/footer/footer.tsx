import * as React from "react";

import "./footer.scss";

const now = new Date();

export const Footer = () => {
  return (
    <footer id="site-footer">
      <span id="copyright">{now.getFullYear()} &copy; <a href="/">Overflow</a></span>
      <span id="git">{GIT_COMMITHASH}</span>
    </footer>
  );
}
