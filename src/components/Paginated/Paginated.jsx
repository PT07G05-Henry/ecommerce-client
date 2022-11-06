import React, { useState, useEffect } from "react";
import { PAGE } from "../../store/api";

const Paginated = ({ data, dispatch }) => {
  const [controller, setController] = useState(data.query);
  const [change, setChange] = useState(false);
  const addToController = (flag) => {
    setController({ ...controller, ...flag });
    setChange(!change);
  };

  useEffect(() => {
    change && dispatch(controller);
  }, [controller]);

  const NEXT = true;
  const BACK = false;
  const pageButtons = (direction) => {
    const DEFAULT = "pager__btn btn-rounded";
    const SM = "pager__btn-sm pager__btn btn-rounded";
    const MD = "pager__btn-md pager__btn btn-rounded";
    const LG = "pager__btn-lg pager__btn btn-rounded";
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
        page: direction
          ? Math.ceil((currentPage + 10) / 10) * 10
          : Math.floor((currentPage - 10) / 10) * 10,
      },
      {
        class: LG,
        page: direction
          ? Math.ceil((currentPage + 20) / 10) * 10
          : Math.floor((currentPage - 20) / 10) * 10,
      },
    ];
    if (direction) {
      let button = {
        class: LG,
        page:
          Math.ceil(
            (currentPage + (data.totalPage - currentPage) / 2) / 10
          ) * 10,
      };
      button.page > pages[4].page && pages.push(button);
    } else {
      let button = {
        class: LG,
        page: Math.floor((currentPage - currentPage / 2) / 10) * 10,
      };
      button.page < pages[4].page && pages.push(button);
    }
    pages = pages.filter((button) =>
      direction ? button.page < data.totalPage : button.page > 1
    );
    direction
      ? currentPage !== data.totalPage &&
        pages.push({ class: DEFAULT, page: data.totalPage })
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
    <div className="pager">
      <div className="pager__back">
        {pageButtons(BACK).map((page) => (
          <PageButton page={page} />
        ))}
      </div>
      <div className="pager__current">
        <div className="pager__current-page btn-rounded">{controller.page}</div>
      </div>
      <div className="pager__next">
        {pageButtons(NEXT).map((page) => (
          <PageButton page={page} />
        ))}
      </div>
    </div>
  );
};

export default Paginated;
