import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { usePage } from "../components/PageContext";
import PostsList from "../components/PostsList";
import ErrorBlock from "../UI/Error.block";
import LoadingIndicator from "../UI/LoadingIndicator";

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
  const { currentPage, setCurrentPage } = usePage();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage) {
      setCurrentPage(parseInt(currentPage, 10));
    } else {
      navigate("/page/1");
    }
  }, [currentPage, setCurrentPage, navigate]);

  let content;

  if (loading) {
    content = <LoadingIndicator />;
  }

  if (error) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.message || "Failed to fetch posts"}
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
