import _ from "lodash";
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../actions/types";
// from the API we get the array of object but state is object so we use lodash
// mapKeys function which takes second arg and makes its value as key of state #try
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      // payload is array and we can make it object
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    // we need id to remove thats why we sent id from action creator
    case DELETE_STREAM:
      return _.omit(state, action.payload);

    default:
      return state;
  }
};
