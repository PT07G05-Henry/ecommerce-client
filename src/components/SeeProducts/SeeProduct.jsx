import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper";
import { getThisUser, selectThisUserRoles } from "../../store/thisUser";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import "./SeeProduct.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { getProducts, CATEGORY } from "../../store/products";
import { useNavigate } from "react-router-dom";

const SeeProduct = ({ category, name }) => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const rol = useSelector(selectThisUserRoles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    !loaded &&
      axios
        .get(
          `https://${
            process.env.REACT_APP_DEV_API || document.domain
          }/products?quantity=5&orderBy=rating&typeOrder=DESC&category=${category}`
        )
        .then((res) => {
          setProducts(res.data.results);
        });
  }, [loaded]);



  return (
    <div className="title">
      <h1
        className="seeProduct__title"
        onClick={() => {
          dispatch(getProducts({ [CATEGORY]: category }));
          navigate("/catalog");
        }}
      >
        {name}
      </h1>
      <div className="seeProduct__container">
        <Swiper
          loop={true}
          effect={"coverflow"}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            360: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          navigation={true}
          modules={[Navigation, EffectCoverflow]}
          grabCursor={true}
          className="Card-Product"
        >
          {products?.map((el) => (
            <SwiperSlide key={el.id}>
              <Card
                key={el.id}
                id={el.id}
                images={el.images}
                name={el.name}
                price={el.price}
                stock={el.stock}
                description={el.description}
                rol={rol}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SeeProduct;
