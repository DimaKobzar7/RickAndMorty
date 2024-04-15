// import { useEffect, useState } from "react";
import { useEffect, useState, forwardRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Card,
  Col,
  DatePicker,
  Flex,
  Pagination,
  Row,
  FloatButton,
} from "antd";

import { useRef } from "react";

// Register ScrollTrigger with GSAP

// import Meta from "antd/es/card/Meta";
import cardStyles from "./SmallCard.module.scss";
import classnames from "classnames";

// const SmallCard = ({
//   image,
//   id,
//   name,
//   status,
//   species,
//   location,
//   episode,
//   index,
// }) => {
// без  forwardRef кинет ошибку
// можно назвать ref и по другому это просто 2й аргумент кроме пропсов что появился из за forwardRef
const SmallCard = forwardRef((props, ref) => {
  const {
    image,
    id,
    name,
    status,
    species,
    location,
    episode,
    onMouseOver,
    onMouseOut,
    cardTitle,
    index,
  } = props;
  // GSAP TEST
  // const container = useRef();
  const elementRef = useRef();
  const elementRefTest = useRef();

  // card title animation gsap test
  const cardRef = useRef(null);

  // console.log("ref at small card:", ref);

  useEffect(() => {
    // const cards = document.querySelectorAll(".box");

    const cardTitles = document.querySelectorAll(".cardAnimationTitle");

    // console.log("cards:", cards);
    // console.log("cardTitles:", cardTitles);
    // console.log("cardTitle:", cardTitle);
    // const cardAnimation = gsap.from(cards, {
    //   opacity: 0,
    //   y: 50,
    //   duration: 1,
    //   ease: "power4.out",
    //   scrollTrigger: {
    //     trigger: cards,
    //     start: "top bottom-=100", // Adjust as needed
    //     end: "bottom center", // Adjust as needed
    //     scrub: true, // Smoothly scrub through the animation
    //   },
    // });

    // такое что то делает и возможно тогда лучше было из мейна просто вешать на каждую карточку анимацию
    //  чтобы при ее попадании во вью порт была анимация и тогда не надо искать конкретную карточку так как у каждой из них своя анимация?
    // на тайтлах много перерендеров
    // cardTitles.forEach((item) => {
    //   const cardAnimation = gsap.from(item, {
    //     opacity: 0,
    //     // y: 50,
    //     duration: 2,
    //     ease: "power4.out",
    //     scrollTrigger: {
    //       trigger: item,
    //       markers: true,
    //       start: "top bottom+=5%", // Adjust as needed
    //       end: "bottom center", // Adjust as needed
    //       scrub: 2, // Smoothly scrub through the animation
    //     },
    //   });
    // });

    // return () => {
    //   cardAnimation.kill(); // Kill the animation when the component unmounts
    // };
  }, []);

  return (
    // className={cardStyles["card"]}
    // ref={elementRefTest}
    // надо ставить тут статичный класс чтобы хоть отсюда добратся
    //  onMouseOver={onMouseOver}
    // виды событий мыши
    // onMouseEnter={e => console.log('onMouseEnter')}
    // onMouseOver={e => console.log('onMouseOver')}
    // onMouseDown={e => console.log('onMouseDown')}
    // onMouseUp={e => console.log('onMouseUp')}
    // onMouseLeave={e => console.log('onMouseLeave')}
    // возможно можно и без  onMouseOut={onMouseOut} оставить
    // onMouseLeave={onMouseOut}
    // onMouseEnter={onMouseOver}
    // нет, надо сбрасывать анимацию иначе она при быстром переключении между карточками не будет завершатся и текст будет ломатся
    <div
      key={id}
      id={`test-${id}`}
      className={`box ${cardStyles["card"]}`}
      ref={ref}
      onMouseLeave={onMouseOut}
      onMouseEnter={onMouseOver}
    >
      <div className={cardStyles["card__container-img"]}>
        {/* исправь альты */}
        {/* className='box' */}
        {/* походу через модули просто не работает */}
        {/* и в обсуждениях этого вопроса походу так и есть */}
        {/* <div className={cardStyles["testBox"]}>test</div> */}
        {/* <div className={`box ${cardStyles["testBox"]}`}>test</div> */}
        <img className={cardStyles["card__img"]} alt='character' src={image} />
      </div>

      <div className={cardStyles["card__body"]}>
        <div className={cardStyles["card__wrap"]}>
          <Link className={cardStyles["card__link"]} to={`/character/${id}`}>
            {/* className={cardStyles["card__title"]} */}
            <h2
              ref={cardTitle}
              className={`cardAnimationTitle ${cardStyles["card__title"]}`}
            >
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
              {/* <span className={cardStyles["card__status"]}>{status}</span>
                  <span
                    className={
                      cardStyles[("card__status--separator", "card__status")]
                    }
                  >
                    -
                  </span>
                  <span className={cardStyles["card__status"]}>{species}</span> */}
              <div className={cardStyles["card__status"]}>
                {status} - {species}
              </div>
            </div>
          </div>
        </div>
        <div className={cardStyles["card__wrap"]}>
          <p className={cardStyles["card__subTitle"]}>Last known location:</p>
          <p className={cardStyles["card__info"]}>
            {/* тут баг */}
            {/* исправил добавлением евис оператора */}
            {/* {item.location.name} */}
            {/* {item.location?.name} */}
            {location?.name}
          </p>
        </div>
        <div className={cardStyles["card__wrap"]}>
          <p className={cardStyles["card__subTitle"]}>First seen in:</p>
          {/* тут проблема при сабмите формы с этим полем */}
          <p className={cardStyles["card__info"]}>
            {/* {item.episode[0]?.name} */}
            {episode[0]?.name}
          </p>
        </div>
        {/* или можно как то к плагину скрола и параметру прогре прицепится и тогда анимацию для тайтла проигрывать */}
        {/* <button>
          btn for mobile becase no animation for card title at mobile (more
          info)
        </button> */}
      </div>
      {/* <div id='wordContainer'></div> */}
    </div>
  );
  // добавил лишнюю скобку для форвард реф
});

export default SmallCard;
