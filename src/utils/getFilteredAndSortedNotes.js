import { getFilteredNotes } from './getFilteredNotes';
import { getSortedNotes } from './getSortedNotes'; 

const getFilteredAndSortedNotes = (notes, searchText, filterByLabel, sortBy) => {
    const filteredNotes = getFilteredNotes(notes, searchText, filterByLabel);
    const filteredAndSortedNotes = getSortedNotes(filteredNotes, sortBy); 
    return filteredAndSortedNotes;
}

export { getFilteredAndSortedNotes };