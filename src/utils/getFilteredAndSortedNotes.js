import { getFilteredNotes } from './getFilteredNotes';
import { getSortedNotes } from './getSortedNotes'; 

const getFilteredAndSortedNotes = (notes, searchText, filterByLabel, sortBy, filterByPriority) => {
    const filteredNotes = getFilteredNotes(notes, searchText, filterByLabel, filterByPriority);
    const filteredAndSortedNotes = getSortedNotes(filteredNotes, sortBy); 
    return filteredAndSortedNotes;
}

export { getFilteredAndSortedNotes };