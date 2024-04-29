// import React from 'react'
// import ReactDOM from 'react-dom/client'
// // import App from './App.tsx'
// import App from './App.jsx';

// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />

//   </React.StrictMode>
// )

import ReactDOM from "react-dom/client";

import App from "./App";

import { Provider } from "react-redux";
import { store } from "./store/index";


import "./assets/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// ! надо сделать сорс меп для файлов чтобы в браузере в инструментах видеть откуда идет код из какого файла
root.render(
  // <React.StrictMode>

  <Provider store={ store }>
    {/* походу у этой версии роутера нет закр тега вот и оно ругается */ }
    {/* <RouterProvider router={router}> */ }
    <App />
    {/* </RouterProvider> */ }
  </Provider>

  //</React.StrictMode>
);