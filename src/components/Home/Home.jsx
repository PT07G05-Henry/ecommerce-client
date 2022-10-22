import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, selectProducts } from "../../store/api";
import Cards from "../../components/Cards/Cards";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function Home() {
  const { user, getIdTokenClaims } = useAuth0();
  const [userAuth, setUserAuth] = useState({});
  //console.log(user);
  var userToPost = {};

  if (user) {
    const makeUserObject = (user) => {
      const social = user.sub.split("|");
      if (social[0].includes("google")) {
        return {
          first_name: user.given_name,
          last_name: user.family_name,
          email: user.email,
          picture_profile: user.picture,
          social: "google",
        };
      }
      if (social[0].includes("microsoft")) {
        return {
          first_name: user.given_name,
          last_name: user.family_name,
          email: user.email,
          picture_profile: user.picture,
          social: "microsoft",
        };
      }
      if (social[0].includes("auth0")) {
        return {
          first_name: user.nickname,
          email: user.email,
          picture_profile: user.picture,
          social: "auth0",
        };
      }
    };

    userToPost = makeUserObject(user);
  }
  const postUserAuth0 = async (userToPost) => {
    const { sid } = await getIdTokenClaims();
    userToPost.sid = sid;
    try {
      const resp = await axios.post(
        `http://localhost:3001/users/auth0`,
        userToPost
      );
      console.log(resp.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(userToPost);
    if (user && user.email_verified) {
      if (!userAuth.hasOwnProperty("user")) {
        console.log("posteando");
        postUserAuth0(userToPost);
        setUserAuth({ user: userToPost });
      }
    } else {
      if (!user) setUserAuth({});
      else console.log("Verify your email first!");
    }
  }, [user]);

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  return (
    <div className="homeContainer">
      {/* <div className="navBar">
        <Cards products={product} />
      </div> */}
      <h1>Home!</h1>
    </div>
  );
}

/*
      ----------------------
      GOOGLE ACCOUNT:
      
      user -> {
        family_name,
        given_name,
        email,
        email_varified (no hace falta verificar)
        nickname: (mail sin @blabla)
        sub --> "google-oauth2|114071796340862555646"
        picture
      }
      ------------------
      GITHUB ACCOUNT:
    
      user ->{
        nickname: (nombre de github),
        email,
        email_verified (no hace falta verificar)
        name (igual q email),
        sub: "github|70079186",
        picture
      }
      ------------------
      SIGN UP AUTH0:
    
      user ->{
      email, 
      email_verified (hay que verificar manualmente para que de true),
      name: "ing.finterlandi@gmail.com",
      nickname: "ing.finterlandi",
      picture: "https://s.gravatar.com/avatar/15a747c28b2b80edca2ca621ddc9664a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fin.png"
      sub: "auth0|6352df81e584359a2df82675"
      }
      
      */
