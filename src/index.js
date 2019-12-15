import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("react native");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://hn.algolia.com/api/v1/search?query=${search}`
      );

      setData(result.data);
    };

    fetchData();
  }, [search]);

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
