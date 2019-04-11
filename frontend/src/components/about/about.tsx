import * as React from 'react';

import "./about.scss";

export const AboutHeader = () => {
  return (
    <div className="col-xs-12 bg-olivine-dark padding-20 text-eerie-dark">
      About Me
    </div>
  )
}

export const AboutPicture = () => {
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

export const About = () => {
  return (
    <div id="about" className="row">
      <AboutHeader></AboutHeader>
      <AboutBody></AboutBody>
    </div>
  )
}
