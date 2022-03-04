import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

import PageNumbers from "../components/PageNumbers";
import ListItems from "../components/ListItems";
import Search from "../components/Search";

import "../style/Pagination.css";

const override = css`
  display: block;
  position: abolute;
  margin: 300px auto;
`;

const API = (pageNumber) =>
  `https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=${pageNumber}`;

const Pagination = ({ match }) => {
  const history = useHistory();
  const [newsData, setNewsData] = useState([]);
  const [presentPage, setPresentPage] = useState(match.params.id || 1);
  const [maxPageNumber, setMaxPageNumber] = useState();
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!match.params.id) {
      history.push("/Pagination/1");
    }
  }, []);

  useEffect(() => {
    // console.log(presentPage);
    fetch(API(presentPage))
      .then((response) => {
        if (response.ok) {
          setNewsData([]);
          return response.json();
        }
      })
      .then((res) => {
        setMaxPageNumber(Math.ceil(res.totalItems / 50));
        setTimeout(() => {
          // setMaxPageNumber(Math.ceil(res.totalItems / 50));
          setNewsData(res.items);
        }, 500);
      })
      .catch((err) => {
        setError(!error);
      });
  }, [presentPage, match.params.id]);

  useEffect(() => {
    if (newsData.length > 5) {
      setNewsData(newsData.slice(0, 5));
    }
  }, [newsData]);

  return (
    <div className="App">
      {newsData.length > 0 ? (
        <>
          <div>
            <Search setSearch={setSearch} />
          </div>
          <h1 className="title">Pagination App</h1>
          {search.length > 0 ? (
            <div>
              <ListItems
                items={newsData.filter((item) =>
                  item.title_normal.toLowerCase().includes(search.toLowerCase())
                )}
                pageNumber={1}
              />
            </div>
          ) : (
            <div>
              <ListItems items={newsData} pageNumber={presentPage} />

              <PageNumbers
                maxPageNumber={maxPageNumber}
                presentPage={presentPage}
                setPresentPage={setPresentPage}
              />
            </div>
          )}
        </>
      ) : error ? (
        <h2>Can't fetch data, error.</h2>
      ) : (
        // <h1 className="loading">Loading...</h1>

        <ClipLoader css={override} size={120} />
      )}
    </div>
  );
};

export default Pagination;
