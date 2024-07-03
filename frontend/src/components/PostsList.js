import React, { useState } from "react";
import Post from "./Post";
import classes from "./PostsList.module.css";

const PostsList = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Calculate the posts to be displayed on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {posts.length > 0 ? (
        <>
          <ul className={classes.posts}>
            {currentPosts.map((post) => (
              <Post key={post._id} id={post._id} title={post.title} text={post.text} />
            ))}
          </ul>
          <div className={classes.pagination}>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`${classes.page_number} ${currentPage === index + 1 ? classes.active : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", color: "black" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
};

export default PostsList;

