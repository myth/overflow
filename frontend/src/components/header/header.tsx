import * as React from "react";
import { Link } from "react-router-dom";

import "./header.scss";

export const Header = () => {
  return (
    <header id="site-header">
      <div className="row center-xs">
        <div className="col-xs-12">
          <h1 id="site-title">
            <Link to="/">overflow.no</Link>
          </h1>
        </div>
      </div>
    </header>
  );
}
