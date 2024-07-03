import { Link } from "react-router-dom";

import classes from "./Post.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_POSTS } from "../routes/Posts";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(_id: $id) {
      _id
    }
  }
`;

function Post({ id, title, text, currentPage }) {
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { id },
    // onCompleted: () => {},
    refetchQueries: [{ query: GET_POSTS }], // Refetch the list of posts after deletion
  });

  async function handleDelete() {
    try {
      await deletePost();
    } catch (error) {
      console.error("Error deleting post:", error);
      console.error(
        "Error details:",
        error.networkError?.result || error.graphQLErrors || error.message
      );
    }
  }

    // Extract the first two sentences of the text
    const extractFirstTwoSentences = (text) => {
      const sentences = text.split('. ');
      return sentences.slice(0, 1).join('. ') + (sentences.length > 1 ? '...' : '');
    };

  return (
    <li className={classes.post}>
      <Link to={id}> 
        <p className={classes.title}>{title}</p>
        <p className={classes.text}>{extractFirstTwoSentences(text)}</p>
      </Link>
      <button onClick={handleDelete} className={classes.deleteButton}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </li>
  );
}

export default Post;


