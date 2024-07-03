import { gql, useMutation, useQuery } from "@apollo/client";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/Error.block";
import classes from "./PostDetails.module.css";
import { GET_POSTS } from "./Posts";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import EditPost from "./EditPost";

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
  // Create a new Date object using the timestamp
  const timestamp = Number(timestampStr);
  const date = new Date(timestamp);

  // Format the date as needed, for example:
  const readableDate = date.toLocaleString(); // Converts to a readable string

  return readableDate;
}

function PostDetails() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const currentPage = query.get("page") || 1;

  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: { id },
  });

  const [deletePost] = useMutation(DELETE_POST, {
    variables: { id },
    onCompleted: () => {
      navigate("..");
    },
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
          <Link to={`/${id}/edit`} state={post} className={classes.button}>
            Edit
          </Link>
        </div>
        <Link to={"/"} className={classes.backLink}>
          Back
        </Link>
      </main>
    );
  }

  return content;
}

export default PostDetails;




