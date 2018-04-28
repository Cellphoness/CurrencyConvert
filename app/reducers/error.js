import {
  EMIT_CONVERSION_ERROR,
  RESET_CONVERSION_ERROR
} from '../actions/error';

const initialState = {
  error:null,
}

export default (state = initialState, action) => {
  console.log('action ', action);
  switch (action.type) {
    case EMIT_CONVERSION_ERROR:
      return {error:action.error};
      break;
    case RESET_CONVERSION_ERROR:
      return {error:null};
      break;
    default:
      return state;
  }
}
