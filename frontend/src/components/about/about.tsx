import * as React from 'react';

import { GitHubIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from "../icons";

import "./about.scss";

export const AboutHeader = () => {
  return (
    <div className="col-xs-12 bg-olivine-dark padding-20 text-olivine-lightest">
      About Me
    </div>
  )
}

export const AboutPicture = () => {
  return (
    <div className="col-xs-12 bg-olivine-light text-eerie-dark">
      <p>
        <a href="/">overflow.no</a> is the playground of Aleksander Skraastad. I'm a programmer,
        Artificial Intelligence major, former Air Force officer and outdoors enthusiast.
        I work as an R&amp;D engineer and team lead for Appear TV.
        This is a <b>personal</b> website which reflects my own views and opinions and not that of Appear TV.
      </p>
    </div>
  )
}

export const AboutBody = () => {
  return (
    <div className="col-xs-12 bg-olivine-light text-eerie-dark">
      <p>
        <a href="/">overflow.no</a> is the playground of Aleksander Skraastad. I'm a programmer,
        Artificial Intelligence major, ex Air Force officer and outdoors enthusiast.
        I work as an R&amp;D engineer and team lead for Appear TV.
        This is a <b>personal</b> website which reflects my own views and opinions and not that of Appear TV.
      </p>
    </div>
  )
}

export const AboutFooter = () => {
  return (
    <div className="col-xs-12 bg-olivine-lightest padding-20 text-eerie-dark">
      <a href="https://github.com/myth" target="_blank">
        <GitHubIcon></GitHubIcon>
      </a>
      <a href="https://twitter.com/askraastad" target="_blank">
        <TwitterIcon></TwitterIcon>
      </a>
      <a href="https://www.facebook.com/skraastad" target="_blank">
        <FacebookIcon></FacebookIcon>
      </a>
      <a href="https://www.instagram.com/mythern/" target="_blank">
        <InstagramIcon></InstagramIcon>
      </a>
      <a href="https://www.linkedin.com/in/aleksander-skraastad" target="_blank">
        <LinkedInIcon></LinkedInIcon>
      </a>
    </div>
  )
}

export const About = () => {
  return (
    <div id="about" className="row">
      <AboutHeader></AboutHeader>
      <AboutBody></AboutBody>
      <AboutFooter></AboutFooter>
    </div>
  )
}
