// import { useEffect, useState } from "react";

import { useEffect, useState, useRef, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { fetchTodos } from "../store/characterStore";

// import { Card, Col, DatePicker, Flex, Pagination, Row } from "antd";
// import { fetchCharacters } from "../store/secondStore";
// import Meta from "antd/es/card/Meta";
// import cardStyles from "../assets/cards/Card.module.scss";
// import classnames from "classnames";
import SmallCard from "../../components/smallCard/SmallCard";
import AppContainer from "../../components/container/Container";
import homePageStyles from "./HomePage.module.scss";
import { Col, Flex, Pagination, Row } from "antd";

// тут нет useLayoutEffect

import {
  addCharacters,
  fetchCharacters,
  setCurrentPaginationPage,
} from "../../store/secondStore";
import AppPagination from "../../components/appPagination/AppPagination";
import { useSearchParams } from "react-router-dom";

import AppForm from "../../components/formikCurrent/AppForm";

// test for title scroll animation at cards
import cardStyles from "../../components/smallCard/SmallCard.module.scss";
import { charactersRequest } from "../../api";
import { setFilterIsOpen, setFilterRequestData } from "../../store/formStore";
// import { useGetCardInfo } from "../../hooks/useGetCardInfo";

// import cardStyles from "./SmallCard.module.scss";

const HomePageJS = () => {
  // изменение места не исправило ошибку что происходит при изменении экрана
  // gsap.registerPlugin(ScrollTrigger);
  // gsap.registerPlugin(TextPlugin);

  // const test = useSelector((state) => state.characters.characters);
  const test2 = useSelector((state) => state.secondTest.characters2);

  const currentPaginationPage = useSelector(
    (state) => state.secondTest.currentPaginationPage
  );

  const filterRequestData = useSelector(
    (state) => state.formStore.filterRequestData
  );

  const filterIsOpen = useSelector((state) => state.formStore.filterIsOpen);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const cardsWrap = useRef();
  const cards = useRef([]);
  const titleCardAnimation = useRef([]);
  const scrollTitleAnimation = useRef(null);
  const textTimeline = useRef(null);
  const animation1 = useRef(null);
  const animation2 = useRef(null);
  const animation3 = useRef(null);
  const cards2 = useRef(null);

  const getCardInfo = async (
    page,
    // changePage,
    characterName,
    characterStatus,
    characterSpecies,
    characterType,
    characterGender
  ) => {
    // console.log("page at getCardInfo:", page);

    // await тут нужен
    const cardData = await dispatch(
      fetchCharacters(
        charactersRequest(
          page,
          // 1
          // filterRequestData.characterName,
          // filterRequestData.characterStatus,
          // filterRequestData.characterSpecies,
          // filterRequestData.characterType,
          // filterRequestData.characterGender
          characterName,
          characterStatus,
          characterSpecies,
          characterType,
          characterGender
        )
      )
    );

    // ! убрал отсюда установку серч параметра для страницы так как проблемы с реактивностью и сюда вместо 1 приходит нал и он ставится и происходит перезапись с 1 на нал
    // setSearchParams(`page=${page}`);
    // setSearchParams("page=1");
    dispatch(addCharacters(cardData));
  };

  // ! есть баг что если есть что то в сторадже и ты убрал серч параметр со страницами то при перезагрузке вместо цифры кинет нал но такое если не лезть в урлу не случится
  //  ! клик снаружи модалки не всегда отрабатывает так как форма находится в бади модалки а бади не следует за размером формы
  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("userSearchQuery")
    );

    const localStorageDataIsEmpty =
      localStorageData &&
      Object.values(localStorageData).every((item) => Boolean(item) === false);

    if (!searchParams.get("page")) {
      // !при 1м запуске ставит нал вместо цифры в серч параметр и это ломает пагинацию
      // если функция что ниже не работает то все ок ставит
      console.log("no page at home page useEffect[]!");
      setSearchParams("page=1");
      console.log("searchParams at !searchParams.get('page'):", searchParams);
    }

    // после перезагрузки оно выполняет иф будто стор есть хоть его и нет поэтому и фильтр не исчезает
    if (localStorageData) {
      // это надо заталкать в редакс
      console.log(
        "storage is in home page JS:",
        JSON.parse(localStorage.getItem("userSearchQuery"))
      );

      dispatch(
        setFilterRequestData(
          // JSON.parse(localStorage.getItem("userSearchQuery"))
          localStorageData
        )
      );

      dispatch(setFilterIsOpen(true));

      // console.log(
      //   "filterRequestData at client after get starage data from redux at []",
      //   filterRequestData
      // );
    } else {
      console.log("no storage");

      // !Тут ставит нал вместо нужной цифры
      console.log(
        'searchParams.get("page") at ELSE no storage:',
        searchParams.get("page")
      );

      // dispatch(setFilterIsOpen(false));
      // setSearchParams(`page=1`);
      getCardInfo(searchParams.get("page"));
    }

    // закрываю фильтр если локал стора нет или там пустые поля. Просто это услови поставил ниже чтобы переменная с закрытием фильтра не конфликтовала с условием ниже
    if (localStorageDataIsEmpty) {
      console.log("gg storage is all FALSE at home page!!");
      localStorage.removeItem("userSearchQuery");
      dispatch(setFilterIsOpen(false));

      getCardInfo(searchParams.get("page"));
    }

    console.log("test2 at home before req:", test2);
  }, []);

  // useEffect(() => {
  //   console.log(
  //     "filterIsOpen at home at use effect with dependtnse [filterIsOpen]:",
  //     filterIsOpen
  //   );
  // }, [filterIsOpen]);

  useEffect(() => {
    console.log("test2 at home at use effect with dependtnse:", test2);
    console.log(" cards.current at test2 useEffect:", cards.current);
  }, [test2]);

  useEffect(() => {
    console.log(
      "filterRequestData at home at use effect with dependtnse of  filterRequestData:",
      filterRequestData
    );
    // тут походу нельзя это использовать так как каждое изменение в инпуте тригерит этт юз ефект и происходит запрос надо условие какое то прописать

    // console.log("test2 at use effect with depend filterRequestData:", test2);

    // если есть хоть что то в фильтре то кинет тру
    const someTest = Object.values(filterRequestData).some((value) => {
      return Boolean(value) === true;
    });

    if (someTest && Object.values(test2).length === 0) {
      getCardInfo(
        searchParams.get("page"),
        filterRequestData.characterName,
        filterRequestData.characterStatus,
        filterRequestData.characterSpecies,
        filterRequestData.characterType,
        filterRequestData.characterGender
      );
    } else {
    }

    // console.log("someTest at only [filterRequestData]:", someTest);
  }, [filterRequestData]);

  // ! Если перезагружаешь то кидает базовые персонажи а не по фильтру
  const pagination = (page) => {
    // !Тест сброса карточек чтобы анимация нормально сработала
    console.log("gg pagination");
    // ! при клике на пагинацию убиваем анимацию и запускаем ее когда есть window.scrollY === 0 (тест)
    // ! анимация не убивается даже когда тест е меняется!!!
    console.log(
      " scrollTitleAnimation.current before kill:",
      scrollTitleAnimation.current
    );

    // dispatch(addCharacters({ data: { characters: "gg" } }));
    // dispatch(addCharacters({ data: { characters: {} } }));
    // dispatch(addCharacters({ payload: { data: { characters: [] } } }));
    // dispatch(
    //   addCharacters({ payload: { data: { characters: { results: [] } } } })
    // );

    // dispatch(addCharacters({ characters: {} }));

    // titleCardAnimation.current.forEach((title, index) => {
    //   // console.log("card:", card);
    //   // console.log("titleCardAnimation:", titleCardAnimation);
    //   // console.log("titleCardAnimation.current:", titleCardAnimation.current);
    //   // console.log("title at media at for each:", title);

    //   // && window.scrollY === 0
    //   if (title) {
    //     scrollTitleAnimation.current = gsap.to(title, {
    //       duration: 3,

    //       scrollTrigger: {
    //         markers: true,

    //         trigger: title,
    //         // trigger: cardsWrap.current,
    //         toggleActions: "play none none reset",
    //         onEnter: () => {
    //           console.log("onEnter");
    //           animation1.current = gsap.to(title, {
    //             duration: 1,
    //             delay: 1,

    //             text: {
    //               value: "Click on me!",
    //             },
    //             color: "rgb(255, 152, 0)",
    //           });

    //           animation3.current = gsap.to(title, {
    //             duration: 1,
    //             delay: 3,
    //             text: {
    //               value: () => test2.results[index].name,
    //             },
    //             color: "#f5f5f5",
    //           });
    //         },

    //         onEnterBack: () => {
    //           console.log("onEnterBack");
    //           animation1.current = gsap.to(title, {
    //             duration: 1,
    //             delay: 1,

    //             text: {
    //               value: "Click on me!",
    //             },
    //             color: "rgb(255, 152, 0)",
    //           });

    //           animation3.current = gsap.to(title, {
    //             duration: 1,
    //             delay: 3,
    //             text: {
    //               value: () => test2.results[index].name,
    //             },
    //             color: "#f5f5f5",
    //           });
    //         },
    //         onLeave: () => {
    //           console.log("onLeave");
    //           animation2.current = gsap.to(title, {
    //             duration: 1,
    //             delay: 2,
    //             text: {
    //               value: () => test2.results[index].name,
    //             },
    //             color: "#f5f5f5",
    //           });
    //         },
    //         onLeaveBack: () => {
    //           console.log("onLeaveBack");
    //           // console.log("test2.results[index]:", test2.results[index]);
    //           animation2.current = gsap.to(title, {
    //             duration: 1,
    //             delay: 2,
    //             text: {
    //               value: () => test2.results[index].name,
    //             },
    //             color: "#f5f5f5",
    //           });
    //         },
    //       },
    //     });
    //     // scrollAnimation.kill();
    //   }
    // });
    // анимации даже так не убиваются
    // setTimeout(() => {
    //   scrollTitleAnimation.current.kill();
    //   animation1.current.kill();
    //   animation2.current.kill();
    //   animation3.current.kill();
    //   scrollTitleAnimation.current = null;
    //   animation1.current = null;
    //   animation2.current = null;
    //   animation3.current = null;
    //   titleCardAnimation.current = [];
    // }, 4000);

    // scrollTitleAnimation.current.kill();
    // animation1.current.kill();
    // animation2.current.kill();
    // animation3.current.kill();
    // scrollTitleAnimation.current = null;
    // animation1.current = null;
    // animation2.current = null;
    // animation3.current = null;
    // titleCardAnimation.current = [];
    // cardsWrap.current = null;
    // cards.current = [];

    // cards2.current.kill();
    console.log(
      " scrollTitleAnimation.current after kill:",
      scrollTitleAnimation.current
    );

    // dispatch(addCharacters({}));
    // const cardData = dispatch(
    //   fetchCharacters(charactersRequest(page, "", "", "", "", ""))
    // );

    // const test2 = useSelector((state) => state.secondTest.characters2);

    // dispatch(addCharacters('data': {}));
    // !конец теста этого
    // GSAP TEST

    // if (page === 1) {
    //   return;
    // }
    // console.log("pagination");

    // console.log("page at pagination func:", page);

    setSearchParams(`page=${page}`);
    getCardInfo(
      page,
      filterRequestData.characterName,
      filterRequestData.characterStatus,
      filterRequestData.characterSpecies,
      filterRequestData.characterType,
      filterRequestData.characterGender
    );

    // setSearchParams(`page=${page}`);

    // сносит в 0 то есть работает как надо но если ставить до получения карточек то анимация ломалась как и ломается
    // dispatch(
    //   addCharacters({ payload: { data: { characters: { results: [] } } } })
    // );
    // cards.current = [];
    // titleCardAnimation.current = [];

    // не уверен что надо после каждого клика подымать вверх
    // чтобы увидеть все с начала то хорошо но если пользователь просто хочет прокликать до определенной страниц то это будет бесить
    window.scrollTo({
      top: 0,
      // left: 100,
      behavior: "smooth",
    });
  };

  // !определяет где самый верх страницы
  // window.addEventListener("scroll", function () {
  //   if (window.scrollY === 0) {
  //     console.log("Страница прокручена в самый верх");
  //     // scrollTitleAnimation.current.kill();
  //     // animation1.current.kill();
  //     // animation2.current.kill();
  //     // animation3.current.kill();
  //     // !так какой то андефайнд летит
  //     // ! но ставит анимацию как надо
  //     if (titleCardAnimation.current) {
  //       // console.log("settings at new file with animations:", settings);

  //       // !! надо хавер эфекты в это поставить чтобы при клике на карточку не срабатывала лишняя анимация
  //       let mm = gsap.matchMedia();

  //       // !работает
  //       // это для анимации заголовков на планшетах и телефонах
  //       mm.add("(max-width: 991px)", () => {
  //         // !тест сноса анимации
  //         // if (scrollTitleAnimation.current) {
  //         //   scrollTitleAnimation.current.kill();
  //         //   console.log("scrollTitleAnimation.current killed");
  //         //   // return;
  //         // }
  //         console.log(
  //           'mm.add("(max-width: 991px)" at depend with test2, filterIsOpen'
  //         );
  //         // ! конец теста сноса анимации

  //         titleCardAnimation.current.forEach((title, index) => {
  //           // console.log("card:", card);
  //           // console.log("titleCardAnimation:", titleCardAnimation);
  //           // console.log("titleCardAnimation.current:", titleCardAnimation.current);
  //           // console.log("title at media at for each:", title);

  //           // && window.scrollY === 0
  //           // if (scrollTitleAnimation.current) {
  //           //   scrollTitleAnimation.current.kill();
  //           //   // console.log("scrollTitleAnimation.current killed");
  //           //   console.log(
  //           //     "scrollTitleAnimation.current killed at gsap hook before create animation:",
  //           //     scrollTitleAnimation.current
  //           //   );
  //           // }
  //           if (title) {
  //             scrollTitleAnimation.current = gsap.to(title, {
  //               duration: 3,

  //               scrollTrigger: {
  //                 markers: true,
  //                 // заставляет сработать анимцацию один раз
  //                 // once: true,

  //                 trigger: title,

  //                 // trigger: cardsWrap.current,
  //                 toggleActions: "play none none reset",

  //                 start: "top top",
  //                 onEnter: () => {
  //                   console.log("onEnter");
  //                   animation1.current = gsap.to(title, {
  //                     duration: 1,
  //                     delay: 1,

  //                     text: {
  //                       value: "Click on me!",
  //                     },
  //                     color: "rgb(255, 152, 0)",
  //                   });

  //                   animation3.current = gsap.to(title, {
  //                     duration: 1,
  //                     delay: 3,
  //                     text: {
  //                       value: () => test2.results[index].name,
  //                     },
  //                     color: "#f5f5f5",
  //                   });
  //                 },

  //                 onEnterBack: () => {
  //                   console.log("onEnterBack");
  //                   animation1.current = gsap.to(title, {
  //                     duration: 1,
  //                     delay: 1,

  //                     text: {
  //                       value: "Click on me!",
  //                     },
  //                     color: "rgb(255, 152, 0)",
  //                   });

  //                   animation3.current = gsap.to(title, {
  //                     duration: 1,
  //                     delay: 3,
  //                     text: {
  //                       value: () => test2?.results[index].name,
  //                     },
  //                     color: "#f5f5f5",
  //                   });
  //                 },
  //                 onLeave: () => {
  //                   console.log("onLeave");
  //                   animation2.current = gsap.to(title, {
  //                     duration: 1,
  //                     delay: 2,
  //                     text: {
  //                       value: () => test2?.results[index].name,
  //                     },
  //                     color: "#f5f5f5",
  //                   });
  //                 },
  //                 onLeaveBack: () => {
  //                   console.log("onLeaveBack");
  //                   // console.log("test2.results[index]:", test2.results[index]);
  //                   animation2.current = gsap.to(title, {
  //                     duration: 1,
  //                     delay: 2,
  //                     text: {
  //                       value: () => test2.results[index].name,
  //                     },
  //                     color: "#f5f5f5",
  //                   });
  //                 },
  //               },
  //             });
  //             // scrollAnimation.kill();
  //             // scrollTitleAnimation.current.kill();
  //           }
  //         });
  //         // if (scrollTitleAnimation.current) {
  //         //   scrollTitleAnimation.current.kill();
  //         //   // console.log("scrollTitleAnimation.current killed");
  //         //   console.log(
  //         //     "scrollTitleAnimation.current killed at gsap hook:",
  //         //     scrollTitleAnimation.current
  //         //   );
  //         // }
  //         // titleCardAnimation.current = [];
  //         // scrollTitleAnimation.current.kill();
  //       });
  //     }
  //   }
  // });

  // GSAP TEST

  // !пока неясно будет ли оно на телефонах при касании работать
  // ! надо сделать отдельный файл для анимаций

  // ! при открытии фильтра тоже ломается и выпадение карточек по очереди при скроле
  // useCardsScrollAnimation({
  //   dependencies: test2,
  //   scope: cardsWrap.current,
  //   trigger: cardsWrap.current,
  //   animateItems: cards.current,
  // });

  // !ANIMATION OF CARDS TITLE

  // useGSAP(
  //   () => {
  //     console.log("gg gsap hook");
  //     // GSAP SCROLL
  //     if (titleCardAnimation.current) {
  //       // console.log("settings at new file with animations:", settings);

  //       // !! надо хавер эфекты в это поставить чтобы при клике на карточку не срабатывала лишняя анимация
  //       let mm = gsap.matchMedia();

  //       // !работает
  //       // это для анимации заголовков на планшетах и телефонах
  //       mm.add("(max-width: 991px)", () => {
  //         titleCardAnimation.current.forEach((title, index) => {
  //           // console.log("card:", card);
  //           // console.log("titleCardAnimation:", titleCardAnimation);
  //           // console.log("titleCardAnimation.current:", titleCardAnimation.current);
  //           console.log("title at media at for each:", title);

  //           if (title) {
  //             gsap.to(title, {
  //               duration: 3,

  //               scrollTrigger: {
  //                 markers: true,

  //                 trigger: title,
  //                 toggleActions: "play none none reset",
  //                 onEnter: () => {
  //                   console.log("onEnter");
  //                   const animation1 = gsap.to(title, {
  //                     duration: 1,
  //                     delay: 1,

  //                     text: {
  //                       value: "Click on me!",
  //                     },
  //                     color: "rgb(255, 152, 0)",
  //                   });

  //                   gsap.to(title, {
  //                     duration: 1,
  //                     delay: 3,
  //                     text: {
  //                       value: () => test2.results[index].name,
  //                     },
  //                     color: "#f5f5f5",
  //                   });
  //                 },

  //                 onEnterBack: () => {
  //                   console.log("onEnterBack");
  //                   gsap.to(title, {
  //                     duration: 1,
  //                     delay: 1,

  //                     text: {
  //                       value: "Click on me!",
  //                     },
  //                     color: "rgb(255, 152, 0)",
  //                   });

  //                   gsap.to(title, {
  //                     duration: 1,
  //                     delay: 3,
  //                     text: {
  //                       value: () => test2.results[index].name,
  //                     },
  //                     color: "#f5f5f5",
  //                   });
  //                 },
  //                 onLeave: () => {
  //                   console.log("onLeave");
  //                   const animation2 = gsap.to(title, {
  //                     duration: 1,
  //                     delay: 2,
  //                     text: {
  //                       value: () => test2.results[index].name,
  //                     },
  //                     color: "#f5f5f5",
  //                   });
  //                 },
  //                 onLeaveBack: () => {
  //                   console.log("onLeaveBack");
  //                   // console.log("test2.results[index]:", test2.results[index]);
  //                   const animation2 = gsap.to(title, {
  //                     duration: 1,
  //                     delay: 2,
  //                     text: {
  //                       value: () => test2.results[index].name,
  //                     },
  //                     color: "#f5f5f5",
  //                   });
  //                 },
  //               },
  //             });
  //           }
  //         });
  //       });
  //     }
  //   },

  //   {
  //     dependencies: [test2, filterIsOpen],
  //     scope: cardsWrap.current,
  //     revertOnUpdate: true,
  //   }
  // );

  // ! test with kill animation
  // ! надо после каждого обновления в массиве зависимостей убивать анимацию в конце
  // ! или мелкие анимации убивать или общюю и ее заново создовать так как после перехода на новую страницу все ломается

  // useEffect(() => {
  //   if (titleCardAnimation.current) {
  //     // console.log("settings at new file with animations:", settings);

  //     // !! надо хавер эфекты в это поставить чтобы при клике на карточку не срабатывала лишняя анимация
  //     let mm = gsap.matchMedia();

  //     // !работает
  //     // это для анимации заголовков на планшетах и телефонах
  //     mm.add("(max-width: 991px)", () => {
  //       // !тест сноса анимации
  //       // if (scrollTitleAnimation.current) {
  //       //   scrollTitleAnimation.current.kill();
  //       //   console.log("scrollTitleAnimation.current killed");
  //       //   // return;
  //       // }
  //       console.log(
  //         'mm.add("(max-width: 991px)" at depend with test2, filterIsOpen'
  //       );
  //       // ! конец теста сноса анимации

  //       titleCardAnimation.current.forEach((title, index) => {
  //         // console.log("card:", card);
  //         // console.log("titleCardAnimation:", titleCardAnimation);
  //         // console.log("titleCardAnimation.current:", titleCardAnimation.current);
  //         // console.log("title at media at for each:", title);

  //         // && window.scrollY === 0
  //         // if (scrollTitleAnimation.current) {
  //         //   scrollTitleAnimation.current.kill();
  //         //   // console.log("scrollTitleAnimation.current killed");
  //         //   console.log(
  //         //     "scrollTitleAnimation.current killed at gsap hook before create animation:",
  //         //     scrollTitleAnimation.current
  //         //   );
  //         // }
  //         if (title) {
  //           scrollTitleAnimation.current = gsap.to(title, {
  //             duration: 3,

  //             scrollTrigger: {
  //               markers: true,
  //               // заставляет сработать анимцацию один раз
  //               // once: true,

  //               trigger: title,
  //               // trigger: cardsWrap.current,
  //               toggleActions: "play none none reset",
  //               onEnter: () => {
  //                 console.log("onEnter");
  //                 animation1.current = gsap.to(title, {
  //                   duration: 1,
  //                   delay: 1,

  //                   text: {
  //                     value: "Click on me!",
  //                   },
  //                   color: "rgb(255, 152, 0)",
  //                 });

  //                 animation3.current = gsap.to(title, {
  //                   duration: 1,
  //                   delay: 3,
  //                   text: {
  //                     value: () => test2.results[index].name,
  //                   },
  //                   color: "#f5f5f5",
  //                 });
  //               },

  //               onEnterBack: () => {
  //                 console.log("onEnterBack");
  //                 animation1.current = gsap.to(title, {
  //                   duration: 1,
  //                   delay: 1,

  //                   text: {
  //                     value: "Click on me!",
  //                   },
  //                   color: "rgb(255, 152, 0)",
  //                 });

  //                 animation3.current = gsap.to(title, {
  //                   duration: 1,
  //                   delay: 3,
  //                   text: {
  //                     value: () => test2.results[index].name,
  //                   },
  //                   color: "#f5f5f5",
  //                 });
  //               },
  //               onLeave: () => {
  //                 console.log("onLeave");
  //                 animation2.current = gsap.to(title, {
  //                   duration: 1,
  //                   delay: 2,
  //                   text: {
  //                     value: () => test2.results[index].name,
  //                   },
  //                   color: "#f5f5f5",
  //                 });
  //               },
  //               onLeaveBack: () => {
  //                 console.log("onLeaveBack");
  //                 // console.log("test2.results[index]:", test2.results[index]);
  //                 animation2.current = gsap.to(title, {
  //                   duration: 1,
  //                   delay: 2,
  //                   text: {
  //                     value: () => test2.results[index].name,
  //                   },
  //                   color: "#f5f5f5",
  //                 });
  //               },
  //             },
  //           });
  //           // scrollAnimation.kill();
  //           // scrollTitleAnimation.current.kill();
  //         }
  //       });
  //       // if (scrollTitleAnimation.current) {
  //       //   scrollTitleAnimation.current.kill();
  //       //   // console.log("scrollTitleAnimation.current killed");
  //       //   console.log(
  //       //     "scrollTitleAnimation.current killed at gsap hook:",
  //       //     scrollTitleAnimation.current
  //       //   );
  //       // }
  //       // titleCardAnimation.current = [];
  //       // scrollTitleAnimation.current.kill();
  //     });
  //   }
  // }, []);

  // ! end test with kill animation

  useEffect(() => {
    console.log(
      "filterIsOpen at home at use effect with dependtnse [filterIsOpen]!!!!!ПП!!!:",
      filterIsOpen
    );

    // console.log(
    //   "titleCardAnimation.current at filter useEffect:",
    //   titleCardAnimation.current
    // );
    // cardsTitleAnimationTabsAndMob({
    //   // dependencies: test2,
    //   // scope: cardsWrap.current,
    //   selectors: titleCardAnimation.current,
    //   titleText: test2.results,
    // });
  }, [filterIsOpen]);

  // ! при переключений страниц идет неправильный рассчет карточек, возможно
  // useCardsTitleAnimationTabsAndMob({
  //   // dependencies: { test2, filterIsOpen },
  //   dependencies: filterIsOpen,
  //   // dependencies: { test2, filterIsOpen, ...test2?.info?.pages },
  //   // dependencies: test2,
  //   // dependencies: test2?.info?.pages,

  //   // dependencies: test2?.results,
  //   // dependencies: cards.current,
  //   scope: cardsWrap.current,
  //   selectors: titleCardAnimation.current,
  //   titleText: test2.results,
  // });

  //! если заголовок длинный и он на 2 строки то происходит прыжок текста и высоты карточки при анимации заголовка

  // ! при переключении пагинации когда 2 карточки то неправильно анимация начинает проигрыватся
  // ! чтобы при включении фильтра анимация учитывала высоту фильтра на мобилках надо через вотч отслеживать стейта открытия фильтра и перезаписывать анимацию

  // ! баг как и с анимациями не експортированми: если несколько раз подняться и опустится до тайтла на мобилках то обратная анимация после клик ми
  // !не будет по буквенно перестраиватся на тайтл а сразу покажет имя

  return (
    <section className={homePageStyles["homePage"]}>
      <AppContainer>
        <AppForm />

        <div ref={cardsWrap} className={`${homePageStyles["homePage__cards"]}`}>
          {test2.results &&
            test2.results.map((data, index) => {
              return (
                <SmallCard
                  ref={(el) => (cards.current[index] = el)}
                  index={index}
                  key={data.id}
                  image={data.image}
                  id={data.id}
                  name={data.name}
                  status={data.status}
                  species={data.species}
                  location={data.location}
                  episode={data.episode}
                  cardTitle={(el) => (titleCardAnimation.current[index] = el)}
                />
              );
            })}
        </div>
      </AppContainer>

      <AppPagination
        currentPage={+searchParams.get("page")}
        total={test2?.info?.pages}
        pagination={pagination}
        nextPage={test2?.info?.next}
        prevPage={test2?.info?.prev}
        showSizeChanger={false}
        defaultPageSize={1}
      />
    </section>
  );
};

export default HomePageJS;
