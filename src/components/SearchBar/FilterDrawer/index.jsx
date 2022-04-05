import { Close } from '@mui/icons-material';

import { useNotes } from "contexts";

const FilterDrawer = ({ handleChangeShowFilterModal }) => {

    const { labels, filterByLabel, notesDispatch, sortBy } = useNotes();

    const handleFilterByLabelChange = labelId => {
        const newFilterByLabels = filterByLabel.map(filter => filter.id === labelId ? { ...filter, filtered: !filter.filtered } : filter);

        notesDispatch({
			action: { 
                type: "FILTER_BY_LABELS", 
                payload: { filterByLabel: newFilterByLabels }
            }
        });
    }

    const handleSortByChange = ({ target: { value } }) => {
        notesDispatch({ action: { type: 'SORT_BY', payload: { sortBy: value } } });
    }

	return (
		<div className="filter-sort-wrapper flex-col flex-justify-center flex-align-center p-2">
			<div className="filter-sort-drawer py-0-25">
				<div className="filter-sort-drawer-head py-0-75 px-0-75 flex-row flex-align-center flex-justify-between">
					<h6>Filter &amp; Sort Notes</h6>
					<button className="btn-icon btn btn-light" onClick={e => handleChangeShowFilterModal('CLOSE_FILTER_MODAL')}>
						<Close color="white" />
					</button>
				</div>
				<div className="filter-sort-options py-0-75 px-0-75 flex-col flex-align-start flex-justify-center">
					<div className="sort-options">
						<p className="sort-head text-reg">Sort By</p>
						<select
							name="sort-by"
							id="sort-by"
							className="dropdown sorting-dropdown px-0-5 py-0-25 mt-0-25 text-sm"
                            onChange={handleSortByChange}
                            value={sortBy}
						>
                            <option value="" name="sort-by" defaultValue disabled>
                                --Chose an option--
                            </option>
							<option value="Newest First" name="sort-by">
								Newest First
							</option>
							<option value="Oldest First" name="sort-by">
								Oldest First
							</option>
						</select>
					</div>
					{
                        labels.length > 0 && (
                            <div className="filter-options">
                                <p className="filter-head text-reg">
                                    Filter By Labels
                                </p>
                                <div className="label-checkbox-wrapper flex-row flex-align-center flex-justify-start mt-0-25 flex-wrap">
                                    {labels.map(({ label, id }) => (
                                        <label className="text-sm flex-row flex-align-center flex-justify-start" key={id}>
                                            <input
                                                type="checkbox"
                                                value={label}
                                                checked={filterByLabel.find(filter => filter.id === id).filtered}
                                                onChange={() => handleFilterByLabelChange(id)}
                                            />
                                            {label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )
					}
				</div>
			</div>
		</div>
	);
};

export { FilterDrawer };
