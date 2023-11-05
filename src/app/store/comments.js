import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentDelete: (state, action) => {
      state.entities = state.entities.filter((u) => u._id !== action.payload);
    },
    commentCreated: (state, action) => {
      // console.log(action.payload);
      state.entities.unshift(action.payload);
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
// console.log(commentsSlice);
const {
  commentsRequested,
  commentsReceved,
  commentsRequestFailed,
  commentDelete,
  commentCreated
} = actions;

const commentDeleteRequested = createAction("comments/commentDeleteRequested");
const commentDeleteSuccessed = createAction("comments/commentDeleteSuccessed");
const commentDeleteFailed = createAction("comments/commentDeleteFailed");
const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateSuccessed = createAction("comments/commentCreateSuccessed");
const commentCreateFailed = createAction("comments/commentCreateFailed");

export const deleteComment = (id) => async (dispatch) => {
  dispatch(commentDeleteRequested());
  try {
    const { content } = await commentService.removeComment(id);
    if (content === null) {
      dispatch(commentDelete(id));
      dispatch(commentDeleteSuccessed());
    }
  } catch (error) {
    dispatch(commentDeleteFailed(error.message));
  }
};

export const createComment = (comment) => async (dispatch) => {
  comment.created_at = Date.now();
  dispatch(commentCreateRequested());
  try {
    const { content } = await commentService.createComment(comment);
    dispatch(commentCreated(content));
    dispatch(commentCreateSuccessed());
    // setComments((prevState) =>
    //   _.orderBy([...prevState, content], ["created_at"], ["desc"])
    // );
  } catch (error) {
    dispatch(commentCreateFailed(error.message));
  }
};

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceved(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;
export default commentsReducer;
