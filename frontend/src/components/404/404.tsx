import * as React from "react";

import "./404.scss";

export const NotFound: React.FunctionComponent = props => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div id="not-found">
          <h4>The server hamster couldn't find anything here and gave up.</h4>
          <img src="/images/server-hamster.jpg" id="not-found__image" />
        </div>
      </div>
    </div>
  );
}
