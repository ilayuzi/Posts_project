import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Outlet } from "react-router-dom";
import PostsList from "../components/PostsList";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/Error.block";

const GET_POSTS = gql`
  query getPosts {
    posts {
      _id
      title
      text
    }
  }
`;

const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  let content;

  if (loading) {
    content = <LoadingIndicator />;
  }

  if (error) {
    content = (
      <ErrorBlock
        title="An error ocurred"
        message={error.message || "failed to fetch notes"}
      />
    );
  }

  if (data) {
    content = <PostsList posts={data.posts} />;
  }

  return (
    <>
      <Outlet />
      <main>{content}</main>
    </>
  );
};

export { GET_POSTS, Posts };


