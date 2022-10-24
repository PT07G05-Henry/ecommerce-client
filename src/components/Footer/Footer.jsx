import React from "react";
import "./Footer.css";
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";

export default function Footer() {
  const size = 24;
  return (
    <footer className="footer">
      <section className="container footer__container">
        <article className="footer__article">
          <h3>Follow us</h3>
          <div className="footer__article-socials">
            <h5>
              <AiOutlineFacebook size={size} />
              Facebook
            </h5>
            <h5>
              <AiOutlineTwitter size={size} />
              Twitter
            </h5>
            <h5>
              <AiOutlineInstagram size={size} />
              Instagram
            </h5>
          </div>
          <p>© 2022 all rights reserved</p>
        </article>
      </section>
    </footer>
  );
}
