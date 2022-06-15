import { useEffect, useState } from "react";

import { Pagination } from "fwt-internship-uikit";

import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import CardList from "./components/CardList/CardList";
import Spinner from "./components/Spinner/Spinner";

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
  const [storageOfPaintings, setStorageOfPaintings] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const LIMIT = 12;

  useEffect(() => {
    let paintingsApiUrl =
      "https://test-front.framework.team/paintings?_limit=" + LIMIT;

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

    setIsLoading(true);

    fetch(paintingsApiUrl + "&_page=" + currentPage)
      .then((response) => {
        const totalPaintingsCount = response.headers.get("x-total-count");
        setStorageOfPaintings(totalPaintingsCount);
        return response.json();
      })

      .then((data) => {
        setPaintings(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
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

  useEffect(() => {
    if (isDarkTheme) {
      document.querySelector("body").classList.add("Dark");
    } else {
      document.querySelector("body").classList.remove("Dark");
    }
  }, [isDarkTheme]);

  return (
    <div className={`App ${isDarkTheme ? "Dark" : "Light"}`}>
      <div className="Container">
        <header className="AppHeader">
          <Header setIsDarkTheme={setIsDarkTheme} isDarkTheme={isDarkTheme} />
        </header>
        <Nav
          isDarkTheme={isDarkTheme}
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

        {isLoading ? (
          <Spinner />
        ) : (
          <CardList
            paintings={paintings}
            authors={authors}
            locations={locations}
          />
        )}
        <Pagination
          isDarkTheme={isDarkTheme}
          pagesAmount={Math.ceil(storageOfPaintings / LIMIT)}
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
