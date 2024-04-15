import React, { useEffect, useState } from "react";
// import "./App.css";
import { RouterProvider } from "react-router";

import router from "./router/index";
import FloatActionBtn from "./components/floatActionBtn/FloatActionBtn";
// import { Button, ConfigProvider, Drawer } from "antd";
import AppDrawer from "./components/appDrawer/AppDrawer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  
  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);

  const disableDownloadBtn = useSelector(
    (state) => state.secondTest.disableDownloadBtn
  );

  const test2 = useSelector((state) => state.secondTest.characters2);

  const showDrawer = () => {
    console.log("history open");
  
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    console.log("history close");
   
    setOpenDrawer(false);
  };

  //проблемы с контентом у которых стоят запятые, создается новая колонка
  const downloadCharacters = () => {
    const tableHead = `№,Name,Status,Species,Last known location,First seen in\n`;
    // это не сработало
    // const tableHead = `№|Name|Status|Species|Last known location|First seen in\n`;
    // оставлю точку с запятой без экранирования думаю так будет безопасней
    // const tableHead = `№;Name;Status;Species;Last known location;First seen in\n`;

    const dataToDownload = test2.data?.characters?.results;
    // console.log("results at download:", results);

    let tableBody = "";
    // dataToDownload.forEach((item: any, index: number) => {
    //   // console.log("item:", item);
    //   tableBody += `"${index + 1}","${item.name}","${item.status}","${
    //     item.species
    //   }","${item.location?.name}","${item.episode[0]?.name}"\n`;
    // });

    // это в теории должно помочь если где то будут двойные кавычки и их тоже екранировало
    dataToDownload.forEach((item, index) => {
      // console.log("item:", item);
      tableBody += `"${index + 1}","${item.name.replace(
        /"/g,
        '""'
      )}","${item.status.replace(/"/g, '""')}","${item.species.replace(
        /"/g,
        '""'
      )}","${item.location?.name.replace(
        /"/g,
        '""'
      )}","${item.episode[0]?.name.replace(/"/g, '""')}"\n`;
    });

    // это работает
    // dataToDownload.forEach((item: any, index: number) => {
    //   // console.log("item:", item);
    //   tableBody += `${index + 1};${item.name};${item.status};${
    //     item.species
    //   };${item.location?.name};${item.episode[0]?.name}\n`;
    // });

    // это не сработало
    // dataToDownload.forEach((item: any, index: number) => {
    //   // console.log("item:", item);
    //   tableBody += `${index + 1}|${item.name}|${item.status}|${
    //     item.species
    //   }|${item.location?.name}|${item.episode[0]?.name}\n`;
    // });

    const wholeTable = tableHead + tableBody;
    // console.log("wholeЕable:", wholeЕable);

    console.log("download");

    const blob = new Blob([wholeTable], {
      type: "text/csv;charset=UTF-8",
    });
    // data:text/plain;charset=utf-8
    // console.log("blob", blob);
    const url = URL.createObjectURL(blob);

    // console.log("url:", url);
    const downloadLink = document.createElement("a");

    downloadLink.href = url;

    downloadLink.download = "filteredCharacters.csv";

    document.body.append(downloadLink);

    downloadLink.style.display = "none";

    downloadLink.click();

    downloadLink.remove();

    URL.revokeObjectURL(url);
  };

  // вариант работает но тут та же проблема с запятыми и с номером айтемов
  // const downloadCharacters = () => {
  //   const tableHead = [
  //     "№,Name,Status,Species,Last known location,First seen in",
  //   ];

  //   const dataToDownload = test2.data?.characters?.results;
  //   // console.log("results at download:", results);

  //   let usersCsv = dataToDownload.reduce((acc: any, user: any) => {

  //     acc.push(
  //       [
  //         user.name,
  //         user.status,
  //         user.species,
  //         user.location?.name,
  //         user.episode[0]?.name,
  //       ].join(",")
  //     );
  //     return acc;
  //   }, []);

  //   const res = [...tableHead, ...usersCsv].join("\n");
  //   // downloadFile({
  //   //   data: [...tableHead, ...usersCsv].join("\n"),
  //   //   fileName: "users.csv",
  //   //   fileType: "text/csv",
  //   // });

  //   console.log("download");

  //   const blob = new Blob([res], {
  //     type: "text/csv;charset=UTF-8",
  //   });
  //   // data:text/plain;charset=utf-8
  //   // console.log("blob", blob);
  //   const url = URL.createObjectURL(blob);

  //   // console.log("url:", url);
  //   const downloadLink = document.createElement("a");

  //   downloadLink.href = url;

  //   downloadLink.download = "filteredCharacters.csv";

  //   document.body.append(downloadLink);

  //   downloadLink.style.display = "none";

  //   downloadLink.click();

  //   downloadLink.remove();

  //   URL.revokeObjectURL(url);
  // };

  return (
    <>
      <RouterProvider router={router} />

      <FloatActionBtn
        showDrawer={showDrawer}
        downloadFunc={downloadCharacters}
        disableDownloadBtn={disableDownloadBtn}
      />
      <AppDrawer openDrawer={openDrawer} closeDrawer={closeDrawer} />
    </>
  );
};

export default App;

// если будут проблемы то можно пересоздать проект через npx create-react-app my-app --template redux-typescript и react-redux
//json to typescripte generator

