// import { useQuery } from "@apollo/client";
import { ReactNode, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCharacters, setDOMLoaded } from "../../store/secondStore";

import AppContainer from "../container/Container";
import cardStyles from "./BigCard.module.scss";
import classnames from "classnames";
import { Col, Row } from "antd";

const BigCard = (props) => {
  // console.log("props at card:", props);
  const [cardInfo, setCardInfo] = useState({});

  useEffect(() => {
    const getCardInfo = async () => {
      if (props) {
        const data = await props;
        console.log("data at card:", data);
        setCardInfo(data);
      }
      // const data = await props;
      // console.log("data at card:", data);
      // setCardInfo(data);
    };

    // getCardInfo();
    // console.log("cardInfo at NO depend:", cardInfo);
  }, []);

  // useEffect(() => {
  //   console.log("cardInfo at depend card info at use effect:", cardInfo);
  // }, [cardInfo]);

  useEffect(() => {
    // console.log("props at depend usse effect:", props);
    // setCardInfo(props);
    console.log("props at big card at use ef depence props:", props);
    setCardInfo({
      characterImage: props.content?.data?.character?.image,
      characterName: props.content?.data?.character?.name,
      characterStatus: props.content?.data?.character?.status,
      characterSpecies: props.content?.data?.character?.species,
      characterLastLocationName: props.content?.data?.character?.location?.name,
      characterLastLocationDimension:
        props.content?.data?.character?.location?.dimension,
      characterStartEpisodeName:
        props.content?.data?.character?.episode[0].name,
      characterStartEpisodeAirDate:
        props.content?.data?.character?.episode[0].air_date,
      characterFinalEpisodeName:
        props.content?.data?.character?.episode[
          props.content?.data?.character?.episode.length - 1
        ].name,
      characterFinalEpisodeAirDate:
        props.content?.data?.character?.episode[
          props.content?.data?.character?.episode.length - 1
        ].air_date,
      characterOriginName: props.content?.data?.character?.origin.name,
      characterOriginDimension:
        props.content?.data?.character?.origin.dimension,
    });
    // setCardInfo({
    //   characterImage: props.content?.image,
    //   characterName: props.content?.name,
    //   characterStatus: props.content?.status,
    //   characterSpecies: props.content?.species,
    //   characterLastLocationName: props.content?.location?.name,
    //   characterLastLocationDimension: props.content?.location?.dimension,
    //   characterStartEpisodeName: props.content?.episode[0]?.name,
    //   characterStartEpisodeAirDate: props.content?.episode[0]?.air_date,
    //   // characterFinalEpisodeName:
    //   //   props.content?.episode[
    //   //     props.content?.data?.character?.episode.length - 1
    //   //   ].name,
    //   // characterFinalEpisodeAirDate:
    //   //   props.content?.episode[props.content?.episode.length - 1].air_date,
    //   // characterOriginName: props.content?.origin.name,
    //   // characterOriginDimension: props.content?.origin.dimension,
    // });
    // console.log("cardInfo at props depend use ef:", cardInfo);
  }, [props]);

  return (
    // {props.characterImage ? 'gg' : 'wp'}
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
                {/* {cardInfo?.content?.data?.character?.name} */}
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
          {/* <div className='testBox'></div> */}
        </div>
      )}
    </>
    // <div ref={cardWrap} className={cardStyles["card"]}>
    //   <div ref={cardImg} className={cardStyles["card__container-img"]}>
    //     <img
    //       className={cardStyles["card__img"]}
    //       alt='example'
    //       src={cardInfo.characterImage}
    //     />
    //   </div>

    //   <div ref={cardBody} className={cardStyles["card__body"]}>
    //     <div className={cardStyles["card__wrap"]}>
    //       <h2 className={cardStyles["card__title"]}>
    //         {/* {cardInfo?.content?.data?.character?.name} */}
    //         {cardInfo.characterName}
    //       </h2>

    //       <div className={cardStyles["card__status-block"]}>
    //         <div
    //           className={classnames(cardStyles["card__indicator"], {
    //             [cardStyles["card__indicator--alive"]]:
    //               cardInfo.characterStatus === "Alive",
    //             [cardStyles["card__indicator--dead"]]:
    //               cardInfo.characterStatus === "Dead",
    //           })}
    //         ></div>
    //         <div className={cardStyles["card__inner"]}>
    //           <span className={cardStyles["card__status"]}>
    //             {cardInfo.characterStatus}
    //           </span>
    //           <span className={cardStyles["card__status"]}>-</span>
    //           <span className={cardStyles["card__status"]}>
    //             {cardInfo.characterSpecies}
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //     <div className={cardStyles["card__wrap"]}>
    //       <p className={cardStyles["card__subTitle"]}>Last known location:</p>
    //       <p className={cardStyles["card__info"]}>
    //         {cardInfo.characterLastLocationName}
    //       </p>

    //       {cardInfo.characterLastLocationDimension && (
    //         <p className={cardStyles["card__info"]}>
    //           Dimension: {cardInfo.characterLastLocationDimension}
    //         </p>
    //       )}
    //     </div>
    //     <div className={cardStyles["card__wrap"]}>
    //       <p className={cardStyles["card__subTitle"]}>First seen in:</p>
    //       <p className={cardStyles["card__info"]}>
    //         <span>{cardInfo.characterStartEpisodeName}</span>
    //         {/* этот спан кинуть вниз столбиком */}
    //         <span>(Air date: {cardInfo.characterStartEpisodeAirDate})</span>
    //       </p>
    //       <p className={cardStyles["card__subTitle"]}>Last seen in:</p>
    //       <p className={cardStyles["card__info"]}>
    //         <span>{cardInfo.characterFinalEpisodeName}</span>
    //         <span>
    //           (Air date:
    //           {cardInfo.characterFinalEpisodeAirDate})
    //         </span>
    //       </p>
    //     </div>
    //     <div className={cardStyles["card__wrap"]}>
    //       <p className={cardStyles["card__subTitle"]}>
    //         Character's origin location:
    //       </p>
    //       {/* возможно надо больше елвис операторов поставить */}
    //       <p className={cardStyles["card__info"]}>
    //         Name: {cardInfo.characterOriginName}
    //       </p>

    //       {cardInfo.characterOriginDimension && (
    //         <p className={cardStyles["card__info"]}>
    //           Dimension: {cardInfo.characterOriginDimension}
    //         </p>
    //       )}
    //     </div>
    //   </div>
    //   {/* <div className='testBox'></div> */}
    // </div>
    // <>
    //   <div class='book' id='book'>
    //     <div class='book-cover'>
    //       <div class='book-back'></div>
    //       <div class='book-front'></div>
    //     </div>
    //   </div>
    // </>
  );
};

export default BigCard;
