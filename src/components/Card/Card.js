import { useImage } from "react-image";

import "./Card.scss";

const Card = ({
  imageUrl,
  name,
  activeCard,
  author,
  created,
  location,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { src } = useImage({
    srcList: [`https://test-front.framework.team${imageUrl}`, "/empty.png"],
  });

  return (
    <div
      className="Card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        // loading="lazy"
        className="CardImg"
        src={src}
        alt={name}
      />
      <div className={`CardText ${activeCard ? "Active" : ""}`}>
        <p className="CardTitle">{name}</p>
        {activeCard && (
          <>
            <p className="CardParagraph">
              <span className="Label">Author:</span> {author}
            </p>
            <p className="CardParagraph">
              <span className="Label">Created:</span> {created}
            </p>
            <p className="CardParagraph">
              <span className="Label">Locations:</span> {location}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
