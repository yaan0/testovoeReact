import { useImage } from "react-image";

import "./Card.scss";

const Card = ({ imageUrl, name, activeCard, author, created, location }) => {
  const { src } = useImage({
    srcList: [`https://test-front.framework.team${imageUrl}`, "/empty.png"],
  });

  return (
    <div className="Card">
      <img
        // loading="lazy"
        className="CardImg"
        src={src}
        alt={name}
      />
      <div className={`CardText ${activeCard ? "Active" : ""}`}>
        <p>{name}</p>
        {activeCard && (
          <>
            <p className="CardParagraph">{author}</p>
            <p className="CardParagraph">{created}</p>
            <p className="CardParagraph">{location}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
