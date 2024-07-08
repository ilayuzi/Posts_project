import { gql, useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorBlock from "../UI/Error.block";
import LoadingIndicator from "../UI/LoadingIndicator";
import classes from "./PostDetails.module.css";
import { GET_POSTS } from "./Posts";

export const GET_POST_BY_ID = gql`
  query getPostById($id: ID!) {
    post(_id: $id) {
      _id
      author
      title
      text
      date
      status
      createdAt
      updatedAt
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(_id: $id) {
      _id
    }
  }
`;

function convertTimestampToReadableDate(timestampStr) {
  const timestamp = Number(timestampStr);
  const date = new Date(timestamp);
  const readableDate = date.toLocaleString();
  return readableDate;
}

function PostDetails() {
  const { id, pageNumber } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: { id },
  });

  const [deletePost] = useMutation(DELETE_POST, {
    variables: { id },
    onCompleted: () => {
      navigate(`/page/${pageNumber}`);
    },
    refetchQueries: [{ query: GET_POSTS }],
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

  let content;

  if (loading) {
    content = <LoadingIndicator />;
  } else if (error) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="failed to load event"
          message={error.info?.message || "failed to fetch data"}
        />
      </div>
    );
  } else if (data) {
    const post = data.post;
    const readableDate = convertTimestampToReadableDate(post.updatedAt);
    content = (
      <main className={classes.details}>
        <div className={classes.top_bar}>
          <p className={classes.author}>Written By: {post.author}</p>
          <p className={classes.date}>{post.date}</p>
          <p className={classes.date}>{readableDate}</p>
        </div>
        <p className={classes.title}>{post.title}</p>
        <p className={classes.text}>{post.text}</p>
        <div className={classes.buttons}>
          <button onClick={handleDelete} className={classes.button}>
            Delete
          </button>
          <Link to={`/page/${pageNumber}/${id}/edit`} state={post} className={classes.button}>
            Edit
          </Link>
        </div>
        <Link to={`/page/${pageNumber}`} className={classes.backLink}>
          Back
        </Link>
      </main>
    );
  }

  return content;
}

export default PostDetails;





