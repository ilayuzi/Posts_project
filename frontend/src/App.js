import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { PageProvider } from "./components/PageContext";
import EditPost from "./routes/EditPost";
import NewPost from "./routes/NewPost";
import PostDetails from "./routes/PostDetails";
import { Posts } from "./routes/Posts";
import RootLayout from "./routes/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout title="Posts App" showNewPostButton={true} />,
    children: [
      {
        path: "/",
        element: <Posts />,
      },
      {
        path: "/page/:pageNumber",
        element: <Posts />,
      },
      {
        path: "/page/:pageNumber/:id",
        element: <PostDetails />,
      },
      {
        path: "/create-post",
        element: <NewPost />,
      },
      {
        path: "/:id",
        element: <PostDetails />,
      },
      // {
      //   path: "/:id/edit",
      //   element: <EditPost />,
      // },
      {
        path: "/page/:pageNumber/:id/edit",
        element: <EditPost />,
      },
    ],
  },
]);


function App() {
  return (
    <PageProvider>
      <RouterProvider router={router} />
    </PageProvider>
  );
}

export default App;
