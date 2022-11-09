import React from "react";
import { useState } from "react";
import api, { endPoint } from "../../lib/api";
import { useEffect } from "react";
import { selectThisUser } from "../../store/thisUser";
import { useSelector } from "react-redux";
import { selectThisUserId } from "../../store/thisUser";


export default function Comments({ productId, setCondition }) {
  const user = useSelector(selectThisUser);
  const [checkProductID, setCheckProductID] = useState([]);
  const userId = useSelector(selectThisUserId);
  const [commentValue, setCommentValue] = useState();
  const [star, setStar] = useState(5);
  const [orders, setOrders] = useState();

  function rating(e) {
    const elClass = e.target.classList;
    const container = document.querySelector(".rating");
    const items = container.querySelectorAll(".rating-item");
    // change the rating if the user clicks on a different star
    if (!elClass.contains("active")) {
      items.forEach(
        // reset the active class on the star
        (item) => item.classList.remove("active")
      );
      setStar(e.target.getAttribute("data-rate"));
      elClass.add("active"); // add active class to the clicked star
    }
  }

  function handlerComment(e) {
    setCommentValue(e.target.value);
  }

  function submit() {
    star > 0 && commentValue.length > 0
      ? api
          .post(endPoint.comments, {
            data: { rating: star, value: commentValue, productId: productId },
          })
          .then((r) => {
            alert("Your Comment Was Sended");
            setCommentValue("");
          })
      : star > 0
      ? alert("Please Select Your Rating ")
      : alert("Please Insert Comment");
  }

  useEffect(() => {
    userId &&
    api.get(endPoint.comments+`/${userId}?relation=user`).then(r=>setCheckProductID(r.data));
    api.get(endPoint.users).then((r) => {setOrders(r.data);});
  }, [userId]);

  useEffect(() => {
    if (typeof checkProductID === "object") {
      if (userId) {
        const verify = checkProductID.filter(
          (c) =>
            c.userId === Number(userId) && c.productId === Number(productId)
        );
        if (verify.length === 0) {
          setCondition(true);
        } else {
          setCondition(false);
        }
      }
    }
  }, [checkProductID, userId, orders]);

  return (
    <>
      {user && user.userDb && user.userDb.id && (
        <div className="productDetail__comment div_full">
          <div>
            <img
              className="productDetail__comment-picture"
              src={user.userDb.profile_picture}
              alt={user.userDb.first_name + user.userDb.id}
            ></img>
          </div>
          <div className="productDetail__comment-containerProfile">
            <p className="productDetail__comment-name">
              {user.userDb.first_name +
                (user.userDb.last_name && " " + user.userDb.last_name)}
            </p>
            <ul class="rating">
              <li
                class="rating-item"
                data-rate="1"
                onClick={(e) => {
                  rating(e);
                }}
              ></li>
              <li
                class="rating-item"
                data-rate="2"
                onClick={(e) => {
                  rating(e);
                }}
              ></li>
              <li
                class="rating-item"
                data-rate="3"
                onClick={(e) => {
                  rating(e);
                }}
              ></li>
              <li
                class="rating-item"
                data-rate="4"
                onClick={(e) => {
                  rating(e);
                }}
              ></li>
              <li
                class="rating-item active"
                data-rate="5"
                onClick={(e) => {
                  rating(e);
                }}
              ></li>
            </ul>
          </div>
          <div className="productDetail__comment-section">
            <textarea
              type="text"
              className="productDetail__comment-value"
              value={commentValue}
              onChange={(e) => {
                handlerComment(e);
              }}
            ></textarea>
            <input
              type="button"
              value="Comment"
              onClick={() => {
                submit();
              }}
            ></input>
          </div>
        </div>
      )}
    </>
  );
}
