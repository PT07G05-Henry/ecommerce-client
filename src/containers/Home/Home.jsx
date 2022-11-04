import React, { useEffect, useState } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, selectCategories } from "../../store/categories";
import SeeProduct from "../../components/SeeProducts/SeeProduct";
import Banner from "./Banner";
import Loading from "../../components/loading/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const getRandomSort = () => {
    return Math.floor(Math.random() * 3) - 1;
  };
  const getRandomSlice = (array) => {
    let slice = structuredClone(array);
    return slice.sort(getRandomSort).slice(0, 5);
  };
  const [toBeRender, setToBeRender] = useState(<Loading />);
  useEffect(() => {
    (categories[0].toBeField || categories[0].error) &&
      dispatch(getCategories());
    categories[0].id &&
      setToBeRender(
        getRandomSlice(categories).map((e) => (
          <SeeProduct key={`cat${e.id}`} category={e.id} name={e.name} />
        ))
      );
  }, [categories]);

  return (
    <section className="container home__container">
      <Banner />
      {toBeRender}
    </section>
  );
};

export default Home;
