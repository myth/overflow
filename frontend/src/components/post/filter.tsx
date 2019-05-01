import * as React from "react";
import { Link } from "react-router-dom";

import "./filter.scss";

/**
 * What type of filter is currently being shown.
 * Value is used for description text
 */
export enum PostFilterType {
  YEAR = "year",
  MONTH = "month",
  DAY = "day",
  TAG = "tag",
  HOUR = "hours",
  NONE = "none",
}

export interface PostFilterProps {
  filters: string[],
  type: PostFilterType,
  baseUrl: string,
}

/**
 * What text prefix to display before the filter links.
 * @param props PostFilterProps
 */
const filterTitle = (props: PostFilterProps) => {
  if (props.type === PostFilterType.NONE) return "";
  else if (props.type === PostFilterType.HOUR) return "Filter by hours? Hah.";
  else return `Filter by ${props.type}:`;
}

export const PostFilter: React.FunctionComponent<PostFilterProps> = props => {
  const filters = props.filters.sort((a, b) => b.localeCompare(a)).map((f, i) => {
    const path = `${props.baseUrl}${f}/`;

    if (i < props.filters.length - 1) return <span key={i}><Link to={path}>{f}</Link> | </span>;
    else return <span key={i}><Link to={path}>{f}</Link></span>
  });

  return (
    <div className="row">
      <div id="filters" className="col-xs-12 bg-olivine-dark padding-20 text-olivine-lightest">
        {filterTitle(props)} {filters}
      </div>
    </div>
  )
}

