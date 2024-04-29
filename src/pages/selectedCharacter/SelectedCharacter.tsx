// import { useQuery } from "@apollo/client";
import { ReactNode, useEffect, useState,  Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import {
  addSingleCharacter,
  fetchCharacters,

  setDOMLoaded,
  setDisableDownloadBtn,
  setSingleCharacterID,
} from "../../store/secondStore";
import { useDispatch, useSelector } from "react-redux";
import BigCard from "../../components/bigCard/BigCard";
import AppContainer from "../../components/container/Container";
import FloatActionBtn from "../../components/floatActionBtn/FloatActionBtn";
// import {useAppSelector} from '../../hooks/hooks.ts'

import selectedCharacterStyles from "./SelectedCharacter.module.scss";
import { Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const SelectedCharacterJSX: React.FC = () => {
  
  
  const test2 = useAppSelector((state) => state.secondTest.characters2);
  const reduxDOMloaded = useAppSelector((state) => state.secondTest.DOMloaded);
  const singleCharacter = useAppSelector(
    (state) => state.secondTest.singleCharacter
  );
  // const singleCharacterID = useAppSelector(
  //   (state) => state.secondTest.singleCharacterID
  // );



  // const disableDownloadBtn = useSelector(
  //   (state) => state.secondTest.disableDownloadBtn
  // );

  const dispatch = useAppDispatch();

  // const { id } = useParams<{ id: string }>();
  // надо сделать чтобы кидало в самый вверх при заходе на страницу
  useEffect(() => {
    // console.log("character");
    // console.log("id:", id);
    console.log("reduxDOMloaded mount at select character:", reduxDOMloaded);


    console.log("test2 at character:", test2);

    dispatch(setDisableDownloadBtn(true));

    window.scrollTo({
      top: 0,
      // left: 100,
      behavior: "smooth",
    });

    return () => {
      // dispatch(setDOMLoaded());
      console.log("reduxDOMloaded leave character page:", reduxDOMloaded);
      dispatch(setDisableDownloadBtn(false));
    };
  }, []);

  // useEffect(() => {
  //   console.log("test2 at character at depend use ef:", test2);
  // }, [test2]);

  useEffect(() => {
    console.log(
      "singleCharacter at character at depend use ef:",
      singleCharacter
    );
  }, [singleCharacter]);

  return (
    <div className={selectedCharacterStyles["selectedCharacter"]}>
    
      <AppContainer>
        {/* <BigCard content={singleCharacter} /> */}
        <Row justify='center'>
          <Col xs={1}></Col>
          <Col xs={22}>
            {/* <BigCard content={singleCharacter} /> */}
            {/* <BigCard content={testSingleCharacter} /> */}
            <BigCard />
            {/* <Suspense fallback={<h1>GG WP</h1>}>
              <BigCard/>
            </Suspense> */}
            
          </Col>
          <Col xs={1}></Col>
        </Row>
      </AppContainer>

      
    </div>
  );
};

export default SelectedCharacterJSX;
