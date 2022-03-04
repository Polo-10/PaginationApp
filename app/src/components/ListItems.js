import React from "react";

function ListItems({ items, pageNumber }) {
  return (
    <div>
      <ol start={pageNumber * 5 - 4} className="numberList">
        {items.map((item, index) => (
          <li className="list" key={index}>
            {item.title_normal}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ListItems;
