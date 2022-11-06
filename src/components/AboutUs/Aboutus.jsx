import React from "react";
import "./Aboutus.css";
import dat from "../../img/dat.jpg";
import chrs from "../../img/chrs.jpg";
import fran from "../../img/fran.jpg";
import matias from "../../img/matias.jpg";
import jor from "../../img/jor.jpg";
import fede from "../../img/fede.jpg";
import julio from "../../img/julio.jpg";

const nos = [
  {
    name: "Franco",
    profession:
      "I am a front end developer. I provide clean code and perfect design. I also make the website more and more interactive. I apply different technologies to improve the site. Support and inquiries.",
    mail: "frankitooserafini493@gmail.com",
    image: fran,
    age: 26,
  },
  {
    name: "Jorge",
    profession:
      "I am a front end developer. I provide clean code and perfect design. I also make the website more and more interactive. I apply different technologies to improve the site. Support and inquiries.",
    mail: "jorge.andrade.y@hotmail.com",
    image: jor,
    age: 30,
  },
  {
    name: "Fede",
    profession:
      "I am a front end developer. I provide clean code and perfect design. I also make the website more and more interactive. I apply different technologies to improve the site. Support and inquiries.",
    mail: "ing.finterlandi@gmail.com",
    image: fede,
    age: 26,
  },
  {
    name: "Chris",
    profession:
      "I am a front end developer. I provide clean code and perfect design. I also make the website more and more interactive. I apply different technologies to improve the site. Support and inquiries.",
    mail: "chrisvill.2312@gmail.com",
    image: chrs,
    age: 26,
  },
  {
    name: "Julio",
    profession:
      "I am a front end developer. I provide clean code and perfect design. I also make the website more and more interactive. I apply different technologies to improve the site. Support and inquiries.",
    mail: "villajul3@hotmail.com",
    image: julio,
    age: 26,
  },
  {
    name: "Matias",
    profession:
      "I am a front end developer. I provide clean code and perfect design. I also make the website more and more interactive. I apply different technologies to improve the site. Support and inquiries.",
    mail: "mativillagra98@gmail.com",
    image: matias,
    age: 26,
  },
  {
    name: "Ramiro",
    profession:
      "I am a front end developer. I provide clean code and perfect design. I also make the website more and more interactive. I apply different technologies to improve the site. Support and inquiries.",
    mail: "ramijujuy@gmail.com",
    image: dat,
    age: 47,
  },
];

const About = () => {
  return (
    <div className="container">
        <div>

      <h5 className="container h5">
        We are a group dedicated to developing and integrating technology in
        order to provide solutions to various industries and private and public
        organizations in different parts of Argentina. Our competitive advantage
        is to provide added value to our clients through a professional service,
        we offer complete solutions tailored to the needs of our clients.{" "}
      </h5>
        </div>

      <h2 className="container dat">About Us </h2>

      {nos.map((e, i) => (
        <section key={i}>
          <div className="container about">
            <div className="main">
              <img className="image" src={e.image} />

              <div className="about">
                <div>
                  <h1 className="container about-texth1">{e.name}</h1>
                </div>
                <div>
                  <h5 className="about-texth5">
                    Developer <span className="span">& Desingner </span>{" "}
                  </h5>
                </div>
                <div>
                  <p className="p"> {e.profession} </p>
                </div>
                <div className="btn_selec">
                  <button type="button" className="btn" href={e.mail}>
                    {e.mail}{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
export default About;
