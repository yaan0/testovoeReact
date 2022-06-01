import { useEffect, useState } from "react";

import { Pagination } from "fwt-internship-uikit";

import Logo from "./components/Logo/Logo";
import Nav from "./components/Nav/Nav";
import CardList from "./components/CardList/CardList";

import "./App.scss";

function App() {
  const [paintings, setPaintings] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [authorsFilter, setAuthorsFilter] = useState(null);
  const [locations, setLocations] = useState([]);
  const [locationsFilter, setLocationsFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterByPaintingName, setFilterByPaintingName] = useState("");
  const [filterByPaintingYear, setFilterByPaintingYear] = useState("");
  const [filterByMaxYear, setFilterByMaxYear] = useState("");

  useEffect(() => {
    let paintingsApiUrl =
      "https://test-front.framework.team/paintings?_limit=12";

    if (authorsFilter !== null) {
      paintingsApiUrl = paintingsApiUrl + "&authorId=" + authorsFilter;
    }

    if (locationsFilter !== null) {
      paintingsApiUrl = paintingsApiUrl + "&locationId=" + locationsFilter;
    }

    if (filterByPaintingName !== "") {
      paintingsApiUrl = paintingsApiUrl + "&q=" + filterByPaintingName;
    }

    if (filterByPaintingYear !== "") {
      paintingsApiUrl =
        paintingsApiUrl + "&created_gte=" + filterByPaintingYear;
    }

    if (filterByMaxYear !== "") {
      paintingsApiUrl = paintingsApiUrl + "&created_lte=" + filterByMaxYear;
    }

    fetch(paintingsApiUrl + "&_page=" + currentPage)
      .then((response) => response.json())
      .then((data) => {
        setPaintings(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [
    currentPage,
    authorsFilter,
    locationsFilter,
    filterByPaintingName,
    filterByPaintingYear,
    filterByMaxYear,
  ]);

  useEffect(() => {
    fetch("https://test-front.framework.team/authors")
      .then((response) => response.json())
      .then((data) => {
        setAuthors(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    fetch("https://test-front.framework.team/locations")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div className="App">
      <div className="Container">
        <header className="AppHeader">
          <Logo />
        </header>

        <Nav
          setFilterByMaxYear={setFilterByMaxYear}
          setFilterByPaintingYear={setFilterByPaintingYear}
          onPaintingNameFilterChange={setFilterByPaintingName}
          authors={authors}
          currentAuthor={authorsFilter}
          currentFilter={locationsFilter}
          setAuthorsFilter={setAuthorsFilter}
          locations={locations}
          setLocationsFilter={setLocationsFilter}
        />

        <CardList
          paintings={paintings}
          authors={authors}
          locations={locations}
        />

        <Pagination
          pagesAmount={30}
          onChange={(newPage) => {
            setCurrentPage(newPage);
          }}
          currentPage={currentPage}
        ></Pagination>
      </div>
    </div>
  );
}

export default App;
