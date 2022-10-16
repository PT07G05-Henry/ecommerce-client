import React from "react"
import "./Footer.css"
import {
    AiOutlineFacebook,
    AiOutlineTwitter,
    AiOutlineInstagram,
} from 'react-icons/ai';

export default function Footer() {
    return (
        <div className="cointainerM">
            <div className="centerVertically">
                <h3>Contact</h3>
                <p>+5492477564712</p>
                <p>Henryecommerce@gmail.com</p>
            </div>
            <div className="centerVertically1">
                <p>© 2022 all rights reserved to | HENRY</p>
            </div>
            <div className="centerVertically2">
                <h3>Follow us</h3>
                <div className="imagesContainer">
                    <h5 className="flex ml-8 m-2 text-lg md:text-sm">
                        <AiOutlineFacebook />
                        Facebook
                    </h5>


                    <h5 className="flex ml-8 m-2 text-lg md:text-sm">
                        <AiOutlineTwitter />
                        Twitter
                    </h5>
                    <h5 className="flex ml-8 m-2 text-lg md:text-sm">
                        <AiOutlineInstagram />
                        Instagram
                    </h5>

                </div>
            </div>
        </div>
    )
}