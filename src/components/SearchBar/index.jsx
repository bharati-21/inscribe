import { FilterAltSharp } from '@mui/icons-material';
import { useNotes } from 'contexts';
import './search-bar.css';

const SearchBar = () => {
    const { searchText, handleChangeSearchText } = useNotes();

    return (
        <div className="search-bar-wrapper my-2 mx-auto text-center px-0-75 py-0-5">
            <input type="section" className="input-search-note text-lg" placeholder="Enter search text" onChange={handleChangeSearchText} value={searchText} />
            <button className="btn btn-secondary btn-icon btn-filter">
                <span className="icon mui-icon">
                    <FilterAltSharp />
                </span>
            </button>      
        </div>
    )
}

export { SearchBar };