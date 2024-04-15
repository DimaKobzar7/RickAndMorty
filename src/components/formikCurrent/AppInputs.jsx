import { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
// import Styles from "./index.module.css";

import customSelectInputsStyles from "./AppInputs.module.scss";
// import { useField, useFormikContext } from "formik";

const AppInputs = ({ ...props }) => {
  // const filterRequestData = useSelector(
  //   (state) => state.formStore.filterRequestData
  // );
  // const [field, meta] = useField(props);
  // const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    // console.log("character:", character);
    // setInputsData((inputsData.name = "gg"));
    // console.log("fieldNames:", fieldNames);
    // console.log("field:", field);
    // console.log("meta:", meta);
    // console.log("props:", props);
    // console.log(
    //   "props.filterRequestData at AppInputs:",
    //   props.filterRequestData
    // );
  }, []);

  return (
    // className={classnames(customSelectInputsStyles["selectInputs"], {
    //   [customSelectInputsStyles["selectInputs--default"]]:
    //     values.filterIsOpen,
    // })}
    // className={customSelectInputsStyles["selectInputs"]}
    // !надо убрать цикл отсюда и вынестиего в компонент где этот компонент вызовется
    <div className={customSelectInputsStyles["selectInputs"]}>
      {props.characterPlaceholder.map((item, i) => {
        return (
          // тест с велью
          // такое может не стоит писать  value={filterRequestData[i]} так как обект так не перебирается и он общий а сюда залетают три разных массива с плейсхолдерами и названиями имен
          //  value={props.filterRequestData[i]}
          <input
            key={i}
            className={customSelectInputsStyles["selectInputs__input"]}
            type='text'
            name={props.charactersInfo[i]}
            id={i}
            placeholder={item}
            value={props.charactersValues[i]}
            onChange={(e) => props.getInputValue(e, props.charactersInfo[i])}
          />
          // JSON.stringify(props.filterRequestData[i])
          // </div>
        );
      })}
    </div>
  );
};

export default AppInputs;

// Old working version
// import { useState, useEffect, useRef } from "react";
// import classnames from "classnames";
// import { useDispatch, useSelector } from "react-redux";
// // import Styles from "./index.module.css";

// import customSelectInputsStyles from "./AppInputs.module.scss";
// // import { useField, useFormikContext } from "formik";

// const AppInputs = ({ ...props }) => {
//   // const filterRequestData = useSelector(
//   //   (state) => state.formStore.filterRequestData
//   // );
//   // const [field, meta] = useField(props);
//   // const { values, setFieldValue } = useFormikContext();

//   useEffect(() => {
//     // console.log("character:", character);
//     // setInputsData((inputsData.name = "gg"));
//     // console.log("fieldNames:", fieldNames);
//     // console.log("field:", field);
//     // console.log("meta:", meta);
//     // console.log("props:", props);
//     // console.log(
//     //   "props.filterRequestData at AppInputs:",
//     //   props.filterRequestData
//     // );
//   }, []);

//   return (
//     // className={classnames(customSelectInputsStyles["selectInputs"], {
//     //   [customSelectInputsStyles["selectInputs--default"]]:
//     //     values.filterIsOpen,
//     // })}
//     // className={customSelectInputsStyles["selectInputs"]}
//     <div className={customSelectInputsStyles["selectInputs"]}>
//       {props.characterPlaceholder.map((item, i) => {
//         return (
//           // тест с велью
//           // такое может не стоит писать  value={filterRequestData[i]} так как обект так не перебирается и он общий а сюда залетают три разных массива с плейсхолдерами и названиями имен
//           //  value={props.filterRequestData[i]}
//           <input
//             key={i}
//             className={customSelectInputsStyles["selectInputs__input"]}
//             type='text'
//             name={props.charactersInfo[i]}
//             id={i}
//             placeholder={item}
//             value={props.charactersValues[i]}
//             onChange={(e) => props.getInputValue(e, props.charactersInfo[i])}
//           />
//           // JSON.stringify(props.filterRequestData[i])
//           // </div>
//         );
//       })}
//     </div>
//   );
// };

// export default AppInputs;
