import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../UI/LoadingIndicator";
import classes from "./EditPost.module.css";
import { GET_POST_BY_ID } from "./PostDetails";

const UPDATE_POST = gql`
  mutation editPost($id: ID!, $title: String!, $text: String!) {
    editPost(_id: $id, title: $title, text: $text) {
      _id
      title
      text
    }
  }
`;

function EditPost() {
  const { id, pageNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();


  const post = location.state || { title: "", text: "" };

  const [updatePost] = useMutation(UPDATE_POST, {
    onCompleted: () => {
      navigate(`/page/${pageNumber}/${id}`); // Navigate back to post details with pagination
    },
    refetchQueries: [{ query: GET_POST_BY_ID, variables: { id } }],
  });

  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updatePost({ variables: { id, title, text } });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (!post) return <LoadingIndicator />;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={20}
        />
        <button type="submit" className={classes.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPost;
