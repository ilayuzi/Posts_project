import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./NewPost.module.css";
import { GET_POSTS } from "./Posts";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/Error.block";

const ADD_POST = gql`
  mutation addPost($author: String!, $title: String!, $text: String!) {
    addPost(author: $author, title: $title, text: $text) {
      _id
      title
      text
    }
  }
`;

function NewPost() {
  const navigate = useNavigate();

  const [mutate, { loading, error }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => {
      navigate(".."); // Navigate back to the posts list after adding a post
    },
  });

  const currentDate = new Date();

  // Function to format the date as "dd/mm/yy"
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const [currentDateString] = useState(formatDate(currentDate));

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <ErrorBlock
        title="An error occurred"
        message={error.message || "Failed to fetch posts"}
      />
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      author: formData.get("author"),
      title: formData.get("title"),
      text: formData.get("text"),
    };
    mutate({ variables: data });
  }
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <p>
          <label htmlFor="author">Author</label>
          <textarea id="author" name="author" required rows={1} />
        </p>
        <p>
          <label htmlFor="title">Title</label>
          <textarea id="title" name="title" required rows={1} />
        </p>
        <p>
          <label htmlFor="text">Text</label>
          <textarea id="text" name="text" required rows={7} />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            name="date"
            value={currentDateString}
            readOnly
          />
        </p>
        <p className={classes.actions}>
          <Link to=".." className={classes.cancelButton}>
            Cancel
          </Link>
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}

export default NewPost;
