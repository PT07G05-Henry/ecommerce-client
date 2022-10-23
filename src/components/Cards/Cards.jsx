import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import {
  NAME,
  PAGE,
  QUANTITY,
  CATEGORY,
  TYPE_ORDER,
  ASC,
  DESC,
  ORDERBY,
  ID,
  PRICE,
  DESCRIPTION,
  STOCK,
  RATING,
  USER_ROL_ID,
  getCategories,
  selectCategories,
} from "../../store/api";
import { useDispatch, useSelector } from "react-redux";
import "./cards.css";
import { ImFilter } from "react-icons/im";

const REMOVE = "remove";

const Cards = ({ products, dispatch }) => {
  const internalDispatch = useDispatch();
  const [controller, setController] = useState(products.query);
  const categoriesList = useSelector(selectCategories);
  useEffect(() => {
    (categoriesList[0].toBeField || categoriesList[0].error) &&
      internalDispatch(getCategories());
  }, [categoriesList]);

  const [arrayPag, setArrayPag] = useState([]);
  const [change, setChange] = useState(false);
  let buttons = [];

  const removeOfController = (key) => {
    let newController = structuredClone(controller);
    delete newController[key];
    setController({...newController,[PAGE]:"1"});
    setChange(!change);
  };
  const addToController = (flag) => {
    setController({ ...controller, ...flag });
    setChange(!change);
  };

  const isInController = (key) => {
    const applied = Object.keys(controller);
    return applied.length ? Boolean(applied.find((e) => e === key)) : false;
  };

  useEffect(() => {
    change && dispatch(controller);
  }, [controller]);

  //Pager------------------------

  const Pager = () => {
    const NEXT = true;
    const BACK = false;
    const pageButtons = (direction) => {
      const DEFAULT = "cards__pager-btn btn";
      const SM = "cards__pager-btn-sm cards__pager-btn btn";
      const MD = "cards__pager-btn-md cards__pager-btn btn";
      const LG = "cards__pager-btn-lg cards__pager-btn btn";
      const currentPage = parseInt(controller.page);
      let pages = [
        {
          class: DEFAULT,
          page: (direction ? 1 : -1) + currentPage,
        },
        {
          class: SM,
          page: (direction ? 2 : -2) + currentPage,
        },
        {
          class: MD,
          page: (direction ? 3 : -3) + currentPage,
        },
        {
          class: MD,
          page: direction ? Math.ceil((currentPage + 10) / 10) * 10 : Math.floor((currentPage - 10) / 10) * 10,
        },
        {
          class: LG,
          page: direction ? Math.ceil((currentPage + 20) / 10) * 10 : Math.floor((currentPage - 20) / 10) * 10,
        },
      ];
      if (direction) {
        let button = {
          class: LG,
          page:
            Math.ceil(
              (currentPage + (products.totalPage - currentPage) / 2) / 10
            ) * 10,
        };
        button.page > pages[4].page && pages.push(button);
      } else {
        let button = {
          class: LG,
          page: Math.floor((currentPage - (currentPage / 2)) / 10) * 10,
        };
        button.page < pages[4].page && pages.push(button);
      }
      pages = pages.filter((button) =>
        direction ? button.page < products.totalPage : button.page > 1
      );
      direction
        ? currentPage !== products.totalPage &&
          pages.push({ class: DEFAULT, page: products.totalPage })
        : currentPage !== 1 && pages.push({ class: DEFAULT, page: 1 });
      return pages.map((button) => ({ ...button, page: `${button.page}` }));
    };
    const PageButton = ({ page }) => (
      <button
        className={page.class}
        onClick={() => {
          addToController({ [PAGE]: page.page });
        }}
      >
        {page.page}
      </button>
    );

    return (
      <div className="cards__pager">
        <div className="cards__pager-back">
          {pageButtons(BACK).map((page) => (
            <PageButton page={page} />
          ))}
        </div>
        <div className="btn cards__pager-currentPage">{controller.page}</div>
        <div className="cards__pager-next">
          {pageButtons(NEXT).map((page) => (
            <PageButton page={page} />
          ))}
        </div>
      </div>
    );
  };

  //Filtros----------------------

  const filters = [
    {
      name: "Categories",
      key: CATEGORY,
      values: !(categoriesList[0].toBeField || categoriesList[0].error)
        ? categoriesList.map((category) => ({
            [CATEGORY]: category.id,
            label: category.name,
          }))
        : [{ [CATEGORY]: REMOVE, label: "Loading Categories" }],
    },
    {
      name: "Products per page",
      key: QUANTITY,
      values: [
        { [QUANTITY]: "25", label: "25 Items" },
        { [QUANTITY]: "50", label: "50 Items" },
        { [QUANTITY]: "75", label: "75 Items" },
        { [QUANTITY]: "100", label: "100 Items" },
      ],
    },
    {
      name: "Order direction",
      key: TYPE_ORDER,
      values: [
        { [TYPE_ORDER]: ASC, label: "Ascendent" },
        { [TYPE_ORDER]: DESC, label: "Decedent" },
      ],
    },
    {
      name: "Order by",
      key: ORDERBY,
      values: [
        { [ORDERBY]: ID, label: "Id" },
        { [ORDERBY]: NAME, label: "Name" },
        { [ORDERBY]: PRICE, label: "Price" },
        { [ORDERBY]: DESCRIPTION, label: "Description" },
        { [ORDERBY]: STOCK, label: "Stock" },
        { [ORDERBY]: RATING, label: "Rating" },
        { [ORDERBY]: USER_ROL_ID, label: "CreatedBy" },
      ],
    },
  ];

  const RenderFilters = ({ filters }) => {
    const [show, setShow] = useState(false);

    const Filter = ({ name, flag, values }) => {
      const applyFilter = (e, key) => {
        const flag = {...JSON.parse(e.target.value),[PAGE]:"1"};
        flag[key] === REMOVE ? removeOfController(key) : addToController(flag);
      };

      return (
        <label className="filter">
          {name}
          <select
            value={
              isInController(flag)
                ? JSON.stringify({ [flag]: `${controller[flag]}` })
                : JSON.stringify({ [flag]: REMOVE })
            }
            onChange={(e) => applyFilter(e, flag)}
          >
            <option
              value={JSON.stringify({ [flag]: REMOVE })}
              className="filter__option"
            >
              None
            </option>
            {values.map((option) => {
              return (
                <option
                  key={`option_${flag}-${option[flag]}`}
                  value={JSON.stringify({ [flag]: `${option[flag]}` })}
                  className="filter__option"
                >
                  {option.label}
                </option>
              );
            })}
          </select>
        </label>
      );
    };

    return (
      <>
        <button
          className="btn filters__btn"
          onClick={() => {
            setShow(!show);
          }}
        >
          <ImFilter />
        </button>
        <form
          action=""
          className="modal filters__modal"
          style={show ? undefined : { display: "none" }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {filters.map(({ name, key, values }) => (
            <Filter
              key={`${key}_filter`}
              name={name}
              flag={key}
              values={values}
            />
          ))}
        </form>
      </>
    );
  };

  //Render-----------------------

  return (
    <>
      <Pager />
      <RenderFilters filters={filters} />
      <div className="cards__grid">
        {products.results?.map((el) => (
          <Card
            key={`product${el.id}`}
            id={el.id}
            images={el.images}
            name={el.name}
            price={el.price}
          />
        ))}
      </div>
    </>
  );
};

export default Cards;
