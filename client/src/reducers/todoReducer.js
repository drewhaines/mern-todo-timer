import {
  SET_TODOS,
  TODOS_LOADING
} from "../actions/types";

const initialState = {
  todos: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TODOS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
