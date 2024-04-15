// import SelectedCharacter from "../pages/SelectedCharacter";

import { createBrowserRouter } from "react-router-dom";

import HomePageJS from "../pages/homePage/HomePageJS";
import MainLayout from "../layouts/MainLayout";
import SelectedCharacterJSX from "../pages/selectedCharacter/SelectedCharacter";

// !сделай страницу с ошибкой есл путь неверный
const router = createBrowserRouter([
  {
    path: "/",
    // будет лейаут
    // element: <Layout />,
    // loader: rootLoader,
    element: <MainLayout />,
    children: [
      {
        path: "/",
        // если делаешь ленивую загрузку то нужен компонент саспенс
        // element: lazy( () => import('./pages/HomePage')) ,
        element: <HomePageJS />,
      },
      // {
      //   path: "character",
      //   element: <SelectedCharacter />,
      // },

      // {
      // 	path: 'about-us',
      // 	element: <Navigate to="/about" replace />
      // },
      // {
      // 	path: 'posts',
      // 	element: <BlogPage />,
      // 	loader: blogLoader,
      // 	errorElement: <ErrorPage />
      // },
      {
        path: "character/:id",
        element: <SelectedCharacterJSX />,
      },
      // {
      // 	path: 'posts/:id/edit',
      // 	element: <EditPost />
      // },
      // {
      // 	path: 'posts/new',
      // 	element: (
      // 		<RequireAuth>
      // 			<CreatePost />
      // 		</RequireAuth>
      // 	),
      // 	action: createPostAction
      // },
      // {
      // 	path: 'login',
      // 	element: <LoginPage />
      // },
      // {
      // 	path: '*',
      // 	element: <NotFoundPage />
      // }
    ],
  },
]);

export default router;
