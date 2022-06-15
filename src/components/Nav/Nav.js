import { Select, Input, Range } from "fwt-internship-uikit";

import "./Nav.scss";

const Nav = ({
  authors,
  locations,
  setLocationsFilter,
  setAuthorsFilter,
  onPaintingNameFilterChange,
  setFilterByPaintingYear,
  setFilterByMaxYear,
  currentAuthor,
  currentFilter,
  isDarkTheme,
}) => {
  let currentAuthorName = authors.find((author) => {
    return currentAuthor === author.id;
  });
  currentAuthorName =
    currentAuthorName === undefined ? "Author" : currentAuthorName.name;

  let currentLocationName = locations.find((location) => {
    return currentFilter === location.id;
  });

  currentLocationName =
    currentLocationName === undefined
      ? "Location"
      : currentLocationName.location;

  return (
    <div className="NavContainer">
      <div className="NavItem">
        <Input
          placeholder="Name"
          isDarkTheme={isDarkTheme}
          onChange={(event) => {
            onPaintingNameFilterChange(event.target.value);
            // console.log(event, event.target.value);
          }}
        />

        <Select
          isDarkTheme={isDarkTheme}
          value={currentAuthorName}
          onChange={(authorName) => {
            const author = authors.find((author) => {
              return authorName === author.name;
            });
            setAuthorsFilter(author.id);
          }}
          options={authors}
        ></Select>

        <Select
          isDarkTheme={isDarkTheme}
          value={currentLocationName}
          onChange={(locationName) => {
            const location = locations.find((location) => {
              return locationName === location.location;
            });
            setLocationsFilter(location.id);
          }}
          options={locations.map((location) => {
            return {
              id: location.id,
              name: location.location,
            };
          })}
        ></Select>

        <Range isDarkTheme={isDarkTheme}>
          <Input
            placeholder="from"
            type="number"
            className="RangeInput"
            onChange={(event) => {
              setFilterByPaintingYear(event.target.value);
            }}
          />
          <span className={`RangeSpan ${isDarkTheme ? "Dark" : "Light"}`} />
          <Input
            placeholder="before"
            type="number"
            className="RangeInput"
            onChange={(event) => {
              setFilterByMaxYear(event.target.value);
            }}
          />
        </Range>
      </div>
    </div>
  );
};

export default Nav;
