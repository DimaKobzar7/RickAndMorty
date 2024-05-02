
import { FC } from "react";
import { Link } from "react-router-dom";
import { SmallCardProps } from '../../interfaces/componentsProps/SmallCard';
import cardStyles from "./SmallCard.module.scss";
import classnames from "classnames";



// ! чини высоту картинок карточки 
// но они увеличиваются из за контента что есть больше

const SmallCard: FC<SmallCardProps> = ({ image, id, name, status, species, location, episode }) => {
  return (
    <div key={id} className={cardStyles["card"]}>
      <div className={cardStyles["card__container-img"]}>
        <img className={cardStyles["card__img"]} alt='character' src={image} />
      </div>

      <div className={cardStyles["card__body"]}>
        <div className={cardStyles["card__wrap"]}>
          <Link className={cardStyles["card__link"]} to={`/character/${id}`}>
       
            <h2 className={cardStyles["card__title"]}>
              {name}
            </h2>
          </Link>

          <div className={cardStyles["card__status-block"]}>
            <div
              className={classnames(cardStyles["card__indicator"], {
                [cardStyles["card__indicator--alive"]]: status === "Alive",
                [cardStyles["card__indicator--dead"]]: status === "Dead",
              })}
            ></div>
            <div className={cardStyles["card__inner"]}>
             
              <div className={cardStyles["card__status"]}>
                {status} - {species}
              </div>
            </div>
          </div>
        </div>
        <div className={cardStyles["card__wrap"]}>
          <p className={cardStyles["card__subTitle"]}>Last known location:</p>
          <p className={cardStyles["card__info"]}>{location.name}</p>
        </div>
        <div className={cardStyles["card__wrap"]}>
          <p className={cardStyles["card__subTitle"]}>First seen in:</p>
          {/* тут проблема при сабмите формы с этим полем */}
          <p className={cardStyles["card__info"]}>
            {episode[0]?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
