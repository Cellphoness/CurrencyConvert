import { CHANGE_PRIMARARY_COLOR } from '../actions/theme';

const initialState = {
  primaryColor: '#4F6D7A',
}

export default (state = initialState, action) => {
  console.log('action ', action);
  switch (action.type) {
    case CHANGE_PRIMARARY_COLOR:
      return {...state, primaryColor:action.color}
      break;
    default:
      return state;
  }
}
