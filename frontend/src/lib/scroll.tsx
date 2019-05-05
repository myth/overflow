import { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";

/**
 * Scrolls the page to the top when a <Link> component is clicked,
 * and the location pathname changes.
 */
class ScrollToTopBase extends Component<RouteComponentProps<any>> {
  componentDidUpdate(prevProps: RouteComponentProps<any>) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export const ScrollToTop = withRouter(ScrollToTopBase);
