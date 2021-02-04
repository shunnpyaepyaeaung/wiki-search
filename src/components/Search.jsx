import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(`http://en.wikipedia.org/w/api.php`, {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };

    if (term && !results.length) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        term && search();
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term, results.length]);

  const renderedResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            className="ui teal button"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });
  return (
    <div className="main">
      <h1 className="ui header">🌎 Wiki Search 🌎</h1>
      <div className="search">
        <div className="ui form">
          <div className="column">
            <label>Enter Search Term</label>
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              type="text"
              className="input"
            />
          </div>
        </div>
        <div className="ui celled list">{renderedResults}</div>
      </div>
    </div>
  );
};

export default Search;
