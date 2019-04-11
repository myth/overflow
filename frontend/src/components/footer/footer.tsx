import * as React from "react";

import "./footer.scss";

const now = new Date();

export const Footer = () => {
  return (
    <footer id="site-footer">
      <div className="row center-xs margin-vertical-10">
        <div className="col-xs-12 padding-vertical-5">
          <span id="copyright">{now.getFullYear()} &copy; <a href="/">Overflow</a></span>
        </div>
        <div className="col-xs-12 padding-vertical-5">
          <span id="git">
            <a target="_blank" href={`https://github.com/myth/overflow/tree/${GIT_COMMITHASH}`}>
              {GIT_VERSION} ({GIT_BRANCH}) {BUILD_DATE}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
