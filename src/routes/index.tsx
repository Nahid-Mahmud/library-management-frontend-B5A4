import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import NotFound from "@/components/shared/NotFound";
import AllBooks from "@/components/allBooks/AllBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
    ],
  },
  {
    //not found route
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
