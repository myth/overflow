import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import "./filter.scss";

/**
 * Post filters matching the url params matched by ReactRouter
 */
export interface PostFilterParams {
  year?: string,
  month?: string,
  day?: string,
}

export interface PostFilterProps extends RouteComponentProps<PostFilterParams> {
  subfilters: string[],
}

export const PostFilter: React.FunctionComponent<PostFilterProps> = props => {
  const p = props.match.params;
  const filterTitle = p.day ? "hours? Hah." : p.month ? "day:" : p.year ? "month:" : "year:";

  let filters = props.subfilters.sort((a, b) => b.localeCompare(a)).map(f => {
    let path = `/blog/`;

    if (p.year) path += `${p.year}/`
    if (p.month) path += `${p.month}/`

    path += `${f}/`;

    return <Link to={path}>{f}</Link>
  });

  if (filters.length > 1) filters = [filters.reduce((p, c) => <span>{p} | {c}</span>)];

  return (
    <div className="row">
      <div id="filters" className="col-xs-12 bg-olivine-dark padding-20 text-olivine-lightest">
        Filter by {filterTitle} {filters}
      </div>
    </div>
  )
}

