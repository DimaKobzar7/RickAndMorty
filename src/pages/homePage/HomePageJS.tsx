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
// //! можно юз мемо на карточки поставить попробовать?
// По умолчанию, когда компонент перерисовывается, React рекурсивно перерисовывает все его дочерние элементы.
//  Вот почему, когда TodoList выполняет повторную визуализацию с использованием другой темы, компонент List также перерисовывается.
//! это можно попробовать для взаимодействия с локал стором useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
// ! memo(Component, arePropsEqual?) можно ставить на весь компонент чтобы он не рендерился если у него ничего не меняется
// ! и такое можно сделать для загрузки компонента const SomeComponent = lazy(load)

import {
  addCharacters,
  fetchCharacters,
  setCurrentPaginationPage,
} from "../../store/secondStore";
import AppPagination from "../../components/appPagination/AppPagination";
import { useSearchParams } from "react-router-dom";

import AppForm from "../../components/appForm/AppForm";

// test for title scroll animation at cards
import cardStyles from "../../components/smallCard/SmallCard.module.scss";
import { charactersRequest } from "../../api";
import { setFilterIsOpen, setFilterRequestData } from "../../store/formStore";
import { useAppSelector } from '../../hooks/hooks';
// import { useGetCardInfo } from "../../hooks/useGetCardInfo";

// import cardStyles from "./SmallCard.module.scss";

// ! надо сделать чтобы при возврате назад на текущей странице не летел запрос на все карточки маленькие
const HomePageJS: React.FC  = () => {
  // изменение места не исправило ошибку что происходит при изменении экрана
  // gsap.registerPlugin(ScrollTrigger);
  // gsap.registerPlugin(TextPlugin);

  // const test = useSelector((state) => state.characters.characters);
  const test2 = useAppSelector((state) => state.secondTest.characters2);

  const currentPaginationPage = useAppSelector(
    (state) => state.secondTest.currentPaginationPage
  );

  const filterRequestData = useAppSelector(
    (state) => state.formStore.filterRequestData
  );

  const filterIsOpen = useAppSelector((state) => state.formStore.filterIsOpen);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  //! тут обычно летит строка из урлы но из пагинации летит цифра
  const getCardInfo = async (
    page: string | number = '1',
    characterName?: string,
    characterStatus?: string,
    characterSpecies?: string,
    characterType?: string,
    characterGender?: string
  ) => {
    // console.log("page at getCardInfo at homepagejs:", page);
    console.log(" typeof page at getCardInfo at homepagejs:", typeof page);

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
    console.log("cardData at home page:", cardData);
    // dispatch(addCharacters(cardData));
    dispatch(addCharacters(cardData.payload.data.characters));
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

      // !попытка кешрования 
      dispatch(
        setCurrentPaginationPage('1')
        // setCurrentPaginationPage(1)
      );
    } else {
      dispatch(
        // setCurrentPaginationPage(+searchParams.get("page"))
        setCurrentPaginationPage(searchParams.get("page"))
      );
    }

    // после перезагрузки оно выполняет иф будто стор есть хоть его и нет поэтому и фильтр не исчезает
    if (localStorageData ) {
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
      console.log('typeof searchParams.get("page") at:', typeof searchParams.get("page"))
      const pageParam: string | null = searchParams.get("page");
      
      // getCardInfo(pageParam ? parseInt(pageParam) : 1);
      // getCardInfo(searchParams.get("page"));

      // !попытка кеширования
      // ! успешная но надо это условие кудато переставить
      if(currentPaginationPage !== searchParams.get("page")) {
        // console.log('currentPaginationPage !== searchParams.get("page"):', currentPaginationPage !== searchParams.get("page"))
        // console.log('searchParams.get("page") for cache:', searchParams.get("page"))
        // console.log('currentPaginationPage for cache:', currentPaginationPage)
        getCardInfo(pageParam ? parseInt(pageParam) : 1);
      }
    }

    // закрываю фильтр если локал стора нет или там пустые поля. Просто это услови поставил ниже чтобы переменная с закрытием фильтра не конфликтовала с условием ниже
    if (localStorageDataIsEmpty) {
      console.log("gg storage is all FALSE at home page!!");
      localStorage.removeItem("userSearchQuery");
      dispatch(setFilterIsOpen(false));

      console.log('typeof searchParams.get("page") at:', typeof searchParams.get("page"))
      // if(Boolean(searchParams.get("page"))) {
      //   getCardInfo(searchParams.get("page"));
      // }

      const pageParam: string | null = searchParams.get("page");
      
      getCardInfo(pageParam ? parseInt(pageParam) : 1);
      // getCardInfo(searchParams.get("page"));
    
    }

    console.log("test2 at home before req:", test2);
  }, []);

  useEffect(() => {
    console.log("test2 at home at use effect with dependtnse:", test2);
    // console.log(" cards.current at test2 useEffect:", cards.current);
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
      // console.log('typeof searchParams.get("page") at .length === 0:', typeof searchParams.get("page"))
      const pageParam: string | null = searchParams.get("page");

      getCardInfo(
        // searchParams.get("page"),
        pageParam ? parseInt(pageParam) : 1,
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
  const pagination = (page: number) => {
    // !Тест сброса карточек чтобы анимация нормально сработала
    console.log("gg pagination");
    console.log("typeof pagination:", typeof page)
    // ! при клике на пагинацию убиваем анимацию и запускаем ее когда есть window.scrollY === 0 (тест)
    // ! анимация не убивается даже когда тест е меняется!!!

    setSearchParams(`page=${page}`);
    dispatch(
      setCurrentPaginationPage(String(page))
      // setCurrentPaginationPage((page))
    );
    getCardInfo(
      page,
      filterRequestData.characterName,
      filterRequestData.characterStatus,
      filterRequestData.characterSpecies,
      filterRequestData.characterType,
      filterRequestData.characterGender
    );

    // setSearchParams(`page=${page}`);

    // не уверен что надо после каждого клика подымать вверх
    // чтобы увидеть все с начала то хорошо но если пользователь просто хочет прокликать до определенной страниц то это будет бесить
    window.scrollTo({
      top: 0,
      // left: 100,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    console.log(
      "filterIsOpen at home at use effect with dependtnse [filterIsOpen]!!!!!ПП!!!:",
      filterIsOpen
    );
  }, [filterIsOpen]);

  return (
    <section className={homePageStyles["homePage"]}>
      <AppContainer>
        <AppForm />

        <div className={`${homePageStyles["homePage__cards"]}`}>
          {test2.results &&
            test2.results.map((data) => {
              return (
                <SmallCard
                  key={data.id}
                  image={data.image}
                  id={data.id}
                  name={data.name}
                  status={data.status}
                  species={data.species}
                  location={data.location}
                  episode={data.episode}
                />
              );
            })}
        </div>
      </AppContainer>

      <AppPagination
      currentPage={searchParams.get("page")}
        // currentPage={+searchParams.get("page")}
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
