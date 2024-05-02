// import { useQuery } from "@apollo/client";
import { useEffect, FC} from "react";
// import { Link, useParams } from "react-router-dom";
import {setDisableDownloadBtn} from "../../store/secondStore";
// import { useDispatch, useSelector } from "react-redux";
import BigCard from "../../components/bigCard/BigCard";

import AppContainer from '../../components/container/Container';
// import FloatActionBtn from "../../components/floatActionBtn/FloatActionBtn";
// import {useAppSelector} from '../../hooks/hooks.ts'

import selectedCharacterStyles from "./SelectedCharacter.module.scss";
// import { Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const SelectedCharacterJSX: FC = () => {
  
  
  const test2 = useAppSelector((state) => state.secondTest.characters2);

  const singleCharacter = useAppSelector(
    (state) => state.secondTest.singleCharacter
  );
 
  // const disableDownloadBtn = useSelector(
  //   (state) => state.secondTest.disableDownloadBtn
  // );

  const dispatch = useAppDispatch();

  // const { id } = useParams<{ id: string }>();
  // надо сделать чтобы кидало в самый вверх при заходе на страницу
  useEffect(() => {
    // console.log("character");
    // console.log("id:", id);
   
    console.log("test2 at character:", test2);

    dispatch(setDisableDownloadBtn(true));

    window.scrollTo({
      top: 0,
      // left: 100,
      behavior: "smooth",
    });

    return () => {
      // dispatch(setDOMLoaded());
     
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
        <div className={selectedCharacterStyles["selectedCharacter__wrap"]}>
          <BigCard />
        </div>
      </AppContainer>

      
    </div>
  );
};

export default SelectedCharacterJSX;
