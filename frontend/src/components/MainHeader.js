import { Link, useLocation } from "react-router-dom";
import classes from "./MainHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

function MainHeader() {
  const location = useLocation();
  let pageTitle;
  let showNewPostButton = true;

  // Determine the page title and button visibility based on the current location
  switch (true) {
    case location.pathname.includes("/create-post") :
      pageTitle = "New Post";
      showNewPostButton = false;
      break;
      case /^\/page\/\d+\/[a-f0-9]{24}$/.test(location.pathname):
      pageTitle = "Post Details";
      showNewPostButton = false;
      break;
    case location.pathname.includes("edit"):
      pageTitle = "Edit Post";
      showNewPostButton = false;
      break;
    case location.pathname === "/":
    default:
      pageTitle = "Posts App";
      break;
  }

  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <FontAwesomeIcon icon={faFileAlt} className={classes.icon} /> {pageTitle}
      </h1>
      {showNewPostButton && (
        <p>
          <Link to="/create-post" className={classes.button}>
            <FontAwesomeIcon icon={faPlus} className={classes.icon} /> New Post
          </Link>
        </p>
      )}
    </header>
  );
}

export default MainHeader;
