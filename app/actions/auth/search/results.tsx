import { SEARCH_RESULTS } from '../../types';
import searchResult from '../../searchResult';

export const searchResults = results => ({
  type: 'SEARCH_RESULTS',
  results,
});

export const search = credentials => dispatch =>
searchResult.result.search(credentials).then(result => dispatch(searchResults(result)));
