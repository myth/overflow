import * as React from "react";

import "./footer.scss";

const now = new Date();

export const Footer = () => {
  return (
    <footer id="site-footer">
      <span id="copyright">{now.getFullYear()} &copy; <a href="/">Overflow</a></span>
      <span id="git">
        <a target="_blank" href={`https://github.com/myth/overflow/tree/${GIT_COMMITHASH}`}>
          {GIT_VERSION} ({GIT_BRANCH}) {BUILD_DATE}
        </a>
      </span>
    </footer>
  );
}
