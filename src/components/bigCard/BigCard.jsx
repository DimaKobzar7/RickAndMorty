// import { useQuery } from "@apollo/client";
import { ReactNode, useEffect, useState, useRef, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import {
  addSingleCharacter,
  fetchCharacters,
  setDOMLoaded,
  setSingleCharacterID,
} from "../../store/secondStore";

import AppContainer from "../container/Container";
import cardStyles from "./BigCard.module.scss";
import classnames from "classnames";
import { Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const BigCard = ({ content }) => {
  // console.log("props at card:", props);

  console.log("content at big card at use ef depence props:", content);

  const singleCharacter = useAppSelector(
    (state) => state.secondTest.singleCharacter
  );

  const singleCharacterID = useAppSelector(
    (state) => state.secondTest.singleCharacterID
  );
  const dispatch = useAppDispatch();

  // const { id } = useParams<{ id: string }>();
  const { id } = useParams();

  useEffect(() => {
    const getCardInfo = async () => {
      console.log("id outer:", id);
      console.log("singleCharacterID outer:", singleCharacterID);
      if (id && id !== singleCharacterID) {
        console.log("id in if:", id);
        console.log("singleCharacterID in if:", singleCharacterID);
        dispatch(setSingleCharacterID(id));
      }

      if (id !== singleCharacterID) {
        //! делаю сброс чтобы не появилось мелькание старой картинки
        dispatch(addSingleCharacter({}));

        const cardData = await dispatch(
          fetchCharacters({
            req: `query SingleCharacter {
              character(id: ${id}) {
                name
                status
                species
                gender
                image
                origin {
                  name
                  dimension
                }
                episode {
                  name
                  air_date
                  episode
                }
                location {
                  name
                  dimension
                }
              }
            }`,
            filter: "",
          })
        );

        console.log("cardData at bigCard:", cardData);
        console.log(
          "cardData at cardData.payload.data.character:",
          cardData.payload.data.character
        );

        dispatch(addSingleCharacter(cardData.payload.data.character));
        // setTestSingleCharacter(cardData.payload.data.character);
      }
    };

    getCardInfo();
  }, []);

  // ! проблема в том что если уходишь через браузер назад и заходишь снова через стрелки браузера то данные теряются
  // ! редакс нужен был чтобы чтобы при заходе на одного и того же персонажа не посылался запрос запрос на персонажа что уже был
  // может тут юз колбек или мемо пригодиться?
  return (
    <>
      {singleCharacter?.image && (
        <div className={cardStyles["card"]}>
          <div className={cardStyles["card__container-img"]}>
            <img
              className={cardStyles["card__img"]}
              alt='example'
              src={singleCharacter?.image}
            />
          </div>

          <div className={cardStyles["card__body"]}>
            <div className={cardStyles["card__wrap"]}>
              <h2 className={cardStyles["card__title"]}>
                {singleCharacter?.name}
              </h2>

              <div className={cardStyles["card__status-block"]}>
                <div
                  className={classnames(cardStyles["card__indicator"], {
                    [cardStyles["card__indicator--alive"]]:
                      singleCharacter?.status === "Alive",
                    [cardStyles["card__indicator--dead"]]:
                      singleCharacter?.status === "Dead",
                  })}
                ></div>
                <div className={cardStyles["card__inner"]}>
                  <span className={cardStyles["card__status"]}>
                    {singleCharacter?.status}
                  </span>
                  <span className={cardStyles["card__status"]}>-</span>
                  <span className={cardStyles["card__status"]}>
                    {singleCharacter?.species}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className={cardStyles["card__subTitle"]}>Gender:</p>
              <span className={cardStyles["card__info"]}>
                {singleCharacter?.gender}
              </span>
            </div>

            <div className={cardStyles["card__wrap"]}>
              <p className={cardStyles["card__subTitle"]}>
                Last known location:
              </p>
              <p className={cardStyles["card__info"]}>
                {singleCharacter?.location?.name}
              </p>

              {singleCharacter?.location?.dimension && (
                <p className={cardStyles["card__info"]}>
                  Dimension: {singleCharacter?.location?.dimension}
                </p>
              )}
            </div>
            <div className={cardStyles["card__wrap"]}>
              <p className={cardStyles["card__subTitle"]}>First seen in:</p>
              <p className={cardStyles["card__info"]}>
                <span>{singleCharacter?.episode[0]?.name}</span>

                <span>(Air date: {singleCharacter?.episode[0]?.air_date})</span>
              </p>
              <p className={cardStyles["card__subTitle"]}>Last seen in:</p>
              <p className={cardStyles["card__info"]}>
                <span>
                  {
                    singleCharacter?.episode[
                      singleCharacter?.episode?.length - 1
                    ].name
                  }
                </span>
                <span>
                  (Air date:
                  {
                    singleCharacter?.episode[
                      singleCharacter?.episode?.length - 1
                    ].air_date
                  }
                  )
                </span>
              </p>
            </div>
            <div className={cardStyles["card__wrap"]}>
              <p className={cardStyles["card__subTitle"]}>
                Character's origin location:
              </p>

              <p className={cardStyles["card__info"]}>
                Name: {singleCharacter?.origin?.name}
              </p>

              {singleCharacter?.origin?.dimension && (
                <p className={cardStyles["card__info"]}>
                  Dimension: {singleCharacter?.origin?.dimension}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BigCard;
