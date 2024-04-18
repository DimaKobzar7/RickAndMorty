// измени расширение на тайп скрипт

import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import mainLayoutStyles from "./MainLayout.module.scss";

const MainLayout: React.FC = () => {
  // const navigation = useNavigation()
  // const navigation = useNavigation();
  // const navigate = useNavigate();
  // const loction = useLocation();

  return (
    <div className={mainLayoutStyles["mainLayout"]}>
      <main className={mainLayoutStyles["mainLayout__content"]}>
        <Header />
        {/* возможно сюда чайлд а не оутлет хотя оно все в роуте стоит  */}
        {/* <div> */}
        <Outlet />
        {/* </div> */}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;

// если будут проблемы то можно пересоздать проект через npx create-react-app my-app --template redux-typescript и react-redux
//json to typescripte generator
