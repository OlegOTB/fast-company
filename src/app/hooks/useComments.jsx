import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import commentService from "../services/comment.service";
import { useParams } from "react-router-dom";

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function createComment(comment) {
    comment.created_at = Date.now();
    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [content, ...prevState]);
      // setComments((prevState) =>
      //   _.orderBy([...prevState, content], ["created_at"], ["desc"])
      // );
    } catch (error) {
      errorCatcher(error);
    }
  }
  useEffect(() => {
    getComments();
  }, [userId]);
  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments((prevState) => prevState.filter((c) => c._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }
  useEffect(() => {
    if (error !== null) toast.error(error);
    setError(null);
  }, [error]);
  function errorCatcher(error) {
    setError(error.message);
  }
  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      // setComments(content);
      setComments(_.orderBy(content, ["created_at"], ["desc"]));
      // console.log(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <CommentsContext.Provider
      value={{ isLoading, comments, createComment, removeComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default CommentsProvider;
