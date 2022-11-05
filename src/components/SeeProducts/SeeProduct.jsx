import React, { useEffect, useState } from "react";
import api, { endPoint, query, value } from "../../lib/api";
import Card from "../Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper";
import { selectThisUserRoles } from "../../store/thisUser";
import { useDispatch, useSelector } from "react-redux";
import "./SeeProduct.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { getProducts, CATEGORY } from "../../store/products";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const SeeProduct = ({ category, name }) => {
  const [products, setProducts] = useState([]);
  const rol = useSelector(selectThisUserRoles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    !products.length &&
      api
        .get(
          endPoint.products,
          {
            params: {
              [query.quantity]: 5,
              [query.orderBy]: value.rating,
              [query.typeOrder]: value.DESC,
              [query.category]: category,
            },
          } // quantity=5&orderBy=rating&typeOrder=DESC&category=${category}`
        )
        .then((res) => {
          setProducts(res.data.results);
        });
  }, [products]);

  const Carousel = () => (
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
  );

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
      {!products.length ? (
        <div className="seeProduct__carousel">
          <Loading />
        </div>
      ) : (
        <Carousel />
      )}
    </div>
  );
};

export default SeeProduct;
