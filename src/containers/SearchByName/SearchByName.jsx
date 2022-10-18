import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProductsByName, getProductsByName, NAME } from "../../store/api";
import Cards from "../../components/Cards/Cards";
import Loading from "../../components/loading/Loading";

const SearchByName = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const search = useSelector(selectProductsByName);

  useEffect(() => {
    dispatch(getProductsByName({ [NAME]: name }));
  }, [name]);

  return (
    <section className="container SearchByName__container">
      {search.results ? (
        <Cards
          products={search}
          dispatch={(flags) => {
            dispatch(getProductsByName(flags));
          }}
        />
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default SearchByName;
