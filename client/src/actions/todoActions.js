import axios from "axios";
import { SET_TODOS, TODOS_LOADING } from "./types";

// get todos
export const getTodos = (userId) => dispatch => {
  dispatch({ type: TODOS_LOADING })

  axios
    .get(`/api/todos/${userId}`)
    .then(res => {
      dispatch({
        type: SET_TODOS,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
};

// create todo
export const createTodo = (todo) => dispatch => {
  axios
    .post(`/api/todos`, todo)
    .then(res => dispatch(getTodos(todo.userId)))
    .catch(err => console.log(err));
};

// update todo
export const updateTodo = (todo) => dispatch => {
  axios
    .patch(`/api/todos/${todo._id}`, todo)
    .then(res => dispatch(getTodos(todo.userId)))
    .catch(err => console.log(err));
};

// delete todo
export const deleteTodo = (todo) => dispatch => {
  axios
    .delete(`/api/todos/${todo._id}`)
    .then(res => dispatch(getTodos(todo.userId)))
    .catch(err => console.log(err));
};
