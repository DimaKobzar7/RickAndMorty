// import { useQuery } from "@apollo/client";
import { ReactNode, useEffect, useState } from "react";
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

import selectedCharacterStyles from "./SelectedCharacter.module.scss";
import { Col, Row } from "antd";

const SelectedCharacterJSX = () => {
  const test2 = useSelector((state) => state.secondTest.characters2);
  const reduxDOMloaded = useSelector((state) => state.secondTest.DOMloaded);
  const singleCharacter = useSelector(
    (state) => state.secondTest.singleCharacter
  );
  const singleCharacterID = useSelector(
    (state) => state.secondTest.singleCharacterID
  );

  // const disableDownloadBtn = useSelector(
  //   (state) => state.secondTest.disableDownloadBtn
  // );

  const dispatch = useDispatch();

  const { id } = useParams();
  // надо сделать чтобы кидало в самый вверх при заходе на страницу
  useEffect(() => {
    // console.log("character");
    // console.log("id:", id);
    console.log("reduxDOMloaded mount at select character:", reduxDOMloaded);

    const getCardInfo = async () => {
      // console.log("singleCharacterID at get card info:", singleCharacterID);
      // console.log("id:", id);
      if (id !== singleCharacterID) {
        dispatch(setSingleCharacterID(id));
      }
      if (id !== singleCharacterID) {
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
          })
        );

        dispatch(addSingleCharacter(cardData));

        // dispatch(addSingleCharacter(cardData.payload.data.character));
        console.log("cardData at selectedCharacter:", cardData);
      }

      console.log(
        "singleCharacter store at selectedCharacter:",
        singleCharacter
      );

      // console.log("cardData data at async:", cardData);
    };

    getCardInfo();

    console.log("test2 at character:", test2);

    dispatch(setDisableDownloadBtn(true));

    // нормальные данные но тайпскрипт в апе ругается
    // а ругается потому что их изначально нет они с сервнра нне пришли
    // елвис операторами это фиксил но в тайпскрипте это не катит
    // const results = test2.data?.characters?.results;
    // console.log("results at download:", results);

    window.scrollTo({
      top: 0,
      // left: 100,
      behavior: "smooth",
    });

    return () => {
      dispatch(setDOMLoaded());
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
      {/* <h1>Selected Character page</h1> */}

      {/* <Link to='/'>Home</Link> */}

      {/* {reduxDOMloaded && <div>{test2.data?.character?.name}</div>} */}
      {/* <div>{test2.data?.character?.name}</div> */}
      {/* <AppContainer><AppCard content={test2} /></AppContainer> */}
      <AppContainer>
        {/* <BigCard content={singleCharacter} /> */}
        <Row justify='center'>
          <Col xs={1}></Col>
          <Col xs={22}>
            <BigCard content={singleCharacter} />
          </Col>
          <Col xs={1}></Col>
        </Row>
      </AppContainer>

      {/* <br />
      <Link to='/testPage'>testPage</Link>
      <br />
      <Link to='/testPageApollo'>testPageApollo</Link>
      <br />
      <Link to='/testPageRedux'>testPageRedux</Link> */}
      {/* <FloatActionBtn /> */}
    </div>
  );
};

export default SelectedCharacterJSX;
