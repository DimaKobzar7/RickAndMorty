// import { useQuery } from "@apollo/client";
import { ReactNode, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCharacters, setDOMLoaded } from "../../store/secondStore";

import AppContainer from "../container/Container";
import cardStyles from "./BigCard.module.scss";
import classnames from "classnames";
import { Col, Row } from "antd";

const BigCard = ({ content }) => {
  // console.log("props at card:", props);
  const [cardInfo, setCardInfo] = useState({});

  // useEffect(() => {
  //   console.log("cardInfo at depend card info at use effect:", cardInfo);
  // }, [cardInfo]);

  useEffect(() => {
    // console.log("props at depend usse effect:", props);
    // setCardInfo(props);
    console.log("content at big card at use ef depence props:", content);
    setCardInfo({
      characterImage: content?.data?.character?.image,
      characterName: content?.data?.character?.name,
      characterStatus: content?.data?.character?.status,
      characterSpecies: content?.data?.character?.species,
      characterLastLocationName: content?.data?.character?.location?.name,
      characterLastLocationDimension:
        content?.data?.character?.location?.dimension,
      characterStartEpisodeName: content?.data?.character?.episode[0].name,
      characterStartEpisodeAirDate:
        content?.data?.character?.episode[0].air_date,
      characterFinalEpisodeName:
        content?.data?.character?.episode[
          content?.data?.character?.episode.length - 1
        ].name,
      characterFinalEpisodeAirDate:
        content?.data?.character?.episode[
          content?.data?.character?.episode.length - 1
        ].air_date,
      characterOriginName: content?.data?.character?.origin.name,
      characterOriginDimension: content?.data?.character?.origin.dimension,
    });
    // setCardInfo({
    //   characterImage: content?.image,
    //   characterName: content?.name,
    //   characterStatus: content?.status,
    //   characterSpecies: content?.species,
    //   characterLastLocationName: content?.location?.name,
    //   characterLastLocationDimension: content?.location?.dimension,
    //   characterStartEpisodeName: content?.episode?.name,
    //   characterStartEpisodeAirDate: content?.episode?.air_date,
    //   // characterFinalEpisodeName:
    //   //   content?.episode[content?.episode.length - 1].name,
    //   // characterFinalEpisodeAirDate:
    //   //  content?.episode[content?.episode.length - 1].air_date,
    //   characterOriginName: content?.origin?.name,
    //   characterOriginDimension: content?.origin?.dimension,
    // });

    // console.log("content?.episode at big card:", content?.episode);
    // console.log("cardInfo at props depend use ef:", cardInfo);
  }, [content]);

  return (
    <>
      {/* это условие надо чтобы не прыгал текст если картинка не успела прогрузится */}
      {cardInfo.characterImage && (
        <div className={cardStyles["card"]}>
          <div className={cardStyles["card__container-img"]}>
            <img
              className={cardStyles["card__img"]}
              alt='example'
              src={cardInfo.characterImage}
            />
          </div>

          <div className={cardStyles["card__body"]}>
            <div className={cardStyles["card__wrap"]}>
              <h2 className={cardStyles["card__title"]}>
                {cardInfo.characterName}
              </h2>

              <div className={cardStyles["card__status-block"]}>
                <div
                  className={classnames(cardStyles["card__indicator"], {
                    [cardStyles["card__indicator--alive"]]:
                      cardInfo.characterStatus === "Alive",
                    [cardStyles["card__indicator--dead"]]:
                      cardInfo.characterStatus === "Dead",
                  })}
                ></div>
                <div className={cardStyles["card__inner"]}>
                  <span className={cardStyles["card__status"]}>
                    {cardInfo.characterStatus}
                  </span>
                  <span className={cardStyles["card__status"]}>-</span>
                  <span className={cardStyles["card__status"]}>
                    {cardInfo.characterSpecies}
                  </span>
                </div>
              </div>
            </div>
            <div className={cardStyles["card__wrap"]}>
              <p className={cardStyles["card__subTitle"]}>
                Last known location:
              </p>
              <p className={cardStyles["card__info"]}>
                {cardInfo.characterLastLocationName}
              </p>

              {cardInfo.characterLastLocationDimension && (
                <p className={cardStyles["card__info"]}>
                  Dimension: {cardInfo.characterLastLocationDimension}
                </p>
              )}
            </div>
            <div className={cardStyles["card__wrap"]}>
              <p className={cardStyles["card__subTitle"]}>First seen in:</p>
              <p className={cardStyles["card__info"]}>
                <span>{cardInfo.characterStartEpisodeName}</span>
                {/* этот спан кинуть вниз столбиком */}
                <span>(Air date: {cardInfo.characterStartEpisodeAirDate})</span>
              </p>
              <p className={cardStyles["card__subTitle"]}>Last seen in:</p>
              <p className={cardStyles["card__info"]}>
                <span>{cardInfo.characterFinalEpisodeName}</span>
                <span>
                  (Air date:
                  {cardInfo.characterFinalEpisodeAirDate})
                </span>
              </p>
            </div>
            <div className={cardStyles["card__wrap"]}>
              <p className={cardStyles["card__subTitle"]}>
                Character's origin location:
              </p>
              {/* возможно надо больше елвис операторов поставить */}
              <p className={cardStyles["card__info"]}>
                Name: {cardInfo.characterOriginName}
              </p>

              {cardInfo.characterOriginDimension && (
                <p className={cardStyles["card__info"]}>
                  Dimension: {cardInfo.characterOriginDimension}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
    // <>
    //   {props.content?.image && (
    //     <div className={cardStyles["card"]}>
    //       <div className={cardStyles["card__container-img"]}>
    //         <img
    //           className={cardStyles["card__img"]}
    //           alt='example'
    //           src={props.content?.image}
    //         />
    //       </div>

    //       <div className={cardStyles["card__body"]}>
    //         <div className={cardStyles["card__wrap"]}>
    //           <h2 className={cardStyles["card__title"]}>
    //             {props.content?.name}
    //           </h2>

    //           <div className={cardStyles["card__status-block"]}>
    //             <div
    //               className={classnames(cardStyles["card__indicator"], {
    //                 [cardStyles["card__indicator--alive"]]:
    //                   props.content?.status === "Alive",
    //                 [cardStyles["card__indicator--dead"]]:
    //                   props.content?.status === "Dead",
    //               })}
    //             ></div>
    //             <div className={cardStyles["card__inner"]}>
    //               <span className={cardStyles["card__status"]}>
    //                 {props.content?.status}
    //               </span>
    //               <span className={cardStyles["card__status"]}>-</span>
    //               <span className={cardStyles["card__status"]}>
    //                 {props.content?.species}
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //         <div className={cardStyles["card__wrap"]}>
    //           <p className={cardStyles["card__subTitle"]}>
    //             Last known location:
    //           </p>
    //           <p className={cardStyles["card__info"]}>
    //             {props.content?.location?.name}
    //           </p>

    //           {props.content?.location?.dimension && (
    //             <p className={cardStyles["card__info"]}>
    //               Dimension: {props.content?.origin?.dimension}
    //             </p>
    //           )}
    //         </div>
    //         <div className={cardStyles["card__wrap"]}>
    //           <p className={cardStyles["card__subTitle"]}>First seen in:</p>
    //           <p className={cardStyles["card__info"]}>
    //             <span>{props.content?.episode?.name}</span>

    //             {JSON.stringify(props.content?.episode?.name)}
    //             <span>(Air date: {props.content?.episode?.air_date})</span>
    //           </p>
    //           <p className={cardStyles["card__subTitle"]}>Last seen in:</p>
    //           <p className={cardStyles["card__info"]}>
    //             <span>
    //               {
    //                 props.content?.episode[props.content?.episode.length - 1]
    //                   .name
    //               }
    //             </span>
    //             <span>
    //               (Air date:
    //               {
    //                 props.content?.episode[props.content?.episode.length - 1]
    //                   .air_date
    //               }
    //               )
    //             </span>
    //           </p>
    //         </div>
    //         <div className={cardStyles["card__wrap"]}>
    //           <p className={cardStyles["card__subTitle"]}>
    //             Character's origin location:
    //           </p>
    //           {/* возможно надо больше елвис операторов поставить */}
    //           <p className={cardStyles["card__info"]}>
    //             Name: {props.content?.origin?.name}
    //           </p>

    //           {props.content?.origin?.dimension && (
    //             <p className={cardStyles["card__info"]}>
    //               Dimension: {props.content?.origin?.dimension}
    //             </p>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </>
  );
};

export default BigCard;
