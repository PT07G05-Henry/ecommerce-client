import React from "react";
import SeeProduct from "../../components/SeeProducts/SeeProduct";
import "./home.css";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, selectCategories } from "../../store/categories";
import Loading from "../../components/loading/Loading";
import { useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const category = categories.slice(0, 5);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    !loaded && dispatch(getCategories());
  }, [loaded]);

  return (
    <section className="container home__container">
      
      {category[0].id ? (
        category.map((e) => (
          <SeeProduct key={`cat${e.id}`} category={e.id} name={e.name} />
        ))
      ) : (
        <Loading />
      )}
      
      
    </section>
  );
};

export default Home;
