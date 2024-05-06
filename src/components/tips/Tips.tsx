import tipsStyles from "./Tips.module.scss";
import { TipsProps } from '../../interfaces/componentsProps/Tips';

// Перепроверь стили на мобилке особенно на сайари там точно места не будет при вводе в инпут оно перекроет кнопку файнд
// //! миксины не работают
//  ! надо делать 1 айтем и туда по массиву загонять и общие стили кинуть в форму а не тут 4 цикла
// а смысл? все равно 4 цикла будет но в компонентах

const Tips: React.FC<TipsProps> = ({ status, species, types, gender, text }) => {
  return (
    <div className={tipsStyles["tips"]}>
      <h2 className={tipsStyles["tips__title"]}>{text.Title}</h2>

      <div className={tipsStyles["tips__content"]}>
        <h5 className={tipsStyles["tips__subtitle"]}>{text.Status}</h5>

        <div className={tipsStyles["tips__content-inner"]}>
          {status.map((item) => (
            <p className={tipsStyles["tips__text"]} key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className={tipsStyles["tips__content"]}>
        <h5 className={tipsStyles["tips__subtitle"]}>{text.Species}</h5>

        <div className={tipsStyles["tips__content-inner"]}>
          {species.map((item) => (
            <p className={tipsStyles["tips__text"]} key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className={tipsStyles["tips__content"]}>
        <h5 className={tipsStyles["tips__subtitle"]}>{text.Types}</h5>

        <div className={tipsStyles["tips__content-inner"]}>
          {types.map((item) => (
            <p className={tipsStyles["tips__text"]} key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className={tipsStyles["tips__content"]}>
        <h5 className={tipsStyles["tips__subtitle"]}>{text.Gender}</h5>

        <div className={tipsStyles["tips__content-inner"]}>
          {gender.map((item) => (
            <p className={tipsStyles["tips__text"]} key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tips;
