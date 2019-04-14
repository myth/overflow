import * as React from "react";

import GitHubSvg from "../lib/images/github.svg";
import TwitterSvg from "../lib/images/twitter.svg";
import FacebookSvg from "../lib/images/facebook.svg";
import LinkedInSvg from "../lib/images/linkedin.svg";
import InstagramSvg from "../lib/images/instagram.svg";

export const GitHubIcon = () => {
    return <span className="socialicon" dangerouslySetInnerHTML={{ __html: GitHubSvg }}></span>;
}

export const TwitterIcon = () => {
    return <span className="socialicon" dangerouslySetInnerHTML={{ __html: TwitterSvg }}></span>;
}

export const FacebookIcon = () => {
    return <span className="socialicon" dangerouslySetInnerHTML={{ __html: FacebookSvg }}></span>;
}

export const LinkedInIcon = () => {
    return <span className="socialicon" dangerouslySetInnerHTML={{ __html: LinkedInSvg }}></span>;
}

export const InstagramIcon = () => {
    return <span className="socialicon" dangerouslySetInnerHTML={{ __html: InstagramSvg }}></span>;
}
