import React from "react";
import { useHistory } from "react-router-dom";

const PageNumbers = ({ maxPageNumber, presentPage, setPresentPage }) => {
  console.log(presentPage);
  const pages = Array.from(Array(maxPageNumber).keys());
  const history = useHistory();
  const click = (e) => {
    history.push(`/Pagination/${e.target.id}`);
    setPresentPage(e.target.id);
  };

  return (
    <div>
      <ul className="pageNumbers">
        {pages.map((number) => (
          <li
            key={number + 1}
            id={number + 1}
            onClick={click}
            className={presentPage == number + 1 ? "active" : null}
          >
            {number + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(PageNumbers);
