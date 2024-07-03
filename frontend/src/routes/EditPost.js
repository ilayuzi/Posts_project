import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/Error.block";
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
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state;
  // const post = state;
  //   const { post } = state;

  const [updatePost] = useMutation(UPDATE_POST, {
    onCompleted: () => {
      navigate(`/${id}`); // Navigate back to the post details page after updating
    },
    refetchQueries: [{ query: GET_POST_BY_ID, 
      variables: { id },
     }]
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

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title || post.title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          value={text || post.text}
          onChange={(e) => setText(e.target.value)}
          required rows={20}
        />
        <button type="submit" className={classes.button}>Save Changes</button>
      </form>
    </div>
  );
}

export default EditPost;


