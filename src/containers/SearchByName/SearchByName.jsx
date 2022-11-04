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
    <section className="container" style={{ minHeight: "100vh" }}>
      {search.results ? (
        search.results.length ? (
          <>
            <h1
              className="searchByName__title"
              style={{ textAlign: "center" }}
            >{`Search results for "${name}"...`}</h1>
            <Cards
              products={search}
              dispatch={(flags) => {
                dispatch(getProductsByName(flags));
              }}
            />
          </>
        ) : (
          <h1
            className="searchByName__title"
            style={{ textAlign: "center" }}
          >{`No results for "${name}"`}</h1>
        )
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default SearchByName;
