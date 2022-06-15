import { Suspense, useState } from "react";
import Card from "../Card/Card";

import "./CardList.scss";

const CardList = ({ paintings, authors, locations }) => {
  const [activeCard, setActiveCard] = useState();
  return (
    <Suspense>
      <div className="CardList">
        {paintings.map((painting) => {
          return (
            <Card
              key={painting.id}
              name={painting.name}
              imageUrl={painting.imageUrl}
              activeCard={painting.id === activeCard}
              author={
                authors.find((author) => painting.authorId === author.id)?.name
              }
              created={painting.created}
              location={
                locations.find(
                  (location) => painting.locationId === location.id
                )?.location
              }
              onMouseEnter={() => setActiveCard(painting.id)}
              onMouseLeave={() => setActiveCard(null)}
            />
          );
        })}
      </div>
    </Suspense>
  );
};

export default CardList;
