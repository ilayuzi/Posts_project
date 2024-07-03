import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { GET_POSTS, Posts } from "./routes/Posts";
import NewPost from "./routes/NewPost";
import RootLayout from "./routes/RootLayout";
import PostDetails from "./routes/PostDetails";
import EditPost from "./routes/EditPost";

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
        path: "/create-post",
        element: <NewPost />,
      },
      {
        path: "/:id",
        element: <PostDetails />,
      },
      {
        path: "/:id/edit",
        element: <EditPost />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
