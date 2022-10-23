import React from "react";
import "./Footer.css";
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="container footer__container">
        <article className="footer__article">
          <h3>Contact</h3>
          <p>+5492477564712</p>
          <p>Henryecommerce@gmail.com</p>
        </article>
        <article className="footer__article">
          <p>© 2022 all rights reserved to | HENRY <hr></hr> </p>
        </article>
        <article className="footer__article">
          <h3>Follow us</h3>
          <h5>
            <AiOutlineFacebook />
            Facebook
          </h5>
          <h5>
            <AiOutlineTwitter />
            Twitter
          </h5>
          <h5>
            <AiOutlineInstagram />
            Instagram
          </h5>
        </article>
      </section>
    </footer>
  );
}
