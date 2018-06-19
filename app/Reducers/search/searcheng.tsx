import { SEARCH_RESULTS } from '../../actions/types';

const SearchResultsReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return action.results.details;

    default:
      return (state = []);
  }
};

export default SearchResultsReducer;
