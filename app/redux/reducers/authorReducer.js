import { ACTION_CONSTANTS } from '../actions/action-type';
import Immutable from 'immutable';

export const initialState = {
    fetching: false,
    error: '',
    results: {},
}

export default function authorResults(state = initialState, action) {
    console.log("action.type:", action.type)
  switch (action.type) {
    case ACTION_CONSTANTS.AUTHOR_RESULT_FETCHING:
        return {
            ...state,
            fetching: true,
        }
    case ACTION_CONSTANTS.AUTHOR_RESULT_ERROR:
        return {
            ...state,
            error: action.error,
        }
    case ACTION_CONSTANTS.AUTHOR_RESULT_RECEIVED:
        const { result } = action
        return {
            ...state,
            fetching: false,
            results: {
                query: result.query,
                work: result.results.work ? result.results.work : [],
                totalResults: result['total-results'],
            },
            error: '',
      }
    default:
      return state
  }
}
