import { Close } from '@mui/icons-material';

import { useNotes } from "contexts";

const FilterDrawer = ({ handleChangeShowFilterModal }) => {

    const { labels, filterByLabel, notesDispatch, sortBy, filterByPriority } = useNotes();

    const {  sortByDate, sortByPriority } = sortBy;

    const handleFilterByLabelChange = labelId => {
        const newFilterByLabels = filterByLabel.map(filter => filter.id === labelId ? { ...filter, filtered: !filter.filtered } : filter);

        notesDispatch({
			action: { 
                type: "FILTER_BY_LABELS", 
                payload: { filterByLabel: newFilterByLabels }
            }
        });
    }

    const handleFilterByPriorityChange = priorityId => {
        const newFilterByPriority = filterByPriority.map(priority => priority.id === priorityId ? { ...priority, filtered: !priority.filtered } : priority);

        notesDispatch({
            action: { 
                type: "FILTER_BY_PRIORITY", 
                payload: { filterByPriority: newFilterByPriority }
            }
        })
    }

    const handleSortByChange = ({ target: { value, name } }) => {
        notesDispatch({ action: { type: 'SORT_BY', payload: { sortBy: { ...sortBy, [name]: value } } } });        
    }

	return (
		<div className="filter-sort-wrapper flex-col flex-justify-center flex-align-center p-2">
			<div className="filter-sort-drawer py-0-25">
				<div className="filter-sort-drawer-head py-0-75 px-0-75 flex-row flex-align-center flex-justify-between">
					<h6>Filter &amp; Sort Notes</h6>
					<button
						className="btn-icon btn btn-light"
						onClick={(e) =>
							handleChangeShowFilterModal("CLOSE_FILTER_MODAL")
						}
					>
						<Close color="white" />
					</button>
				</div>
				<div className="filter-sort-options py-0-75 px-0-75 flex-col flex-align-start flex-justify-center">
					<div className="sort-options">
						<p className="sort-head text-reg">Sort By Date</p>
						<select
							name="sortByDate"
							id="sort-by"
							className="dropdown sorting-dropdown px-0-5 py-0-25 mt-0-25 text-sm"
							onChange={handleSortByChange}
							value={sortByDate}
						>
							<option
								value=""
								name="sortByDate"
								defaultValue
								disabled
							>
								--Chose an option--
							</option>
							<option value="Newest First" name="sortByDate">
								Newest First
							</option>
							<option value="Oldest First" name="sortByDate">
								Oldest First
							</option>
						</select>
					</div>
                    <div className="sort-options">
						<p className="sort-head text-reg">Sort By Priority</p>
						<select
							name="sortByPriority"
							id="sort-by"
							className="dropdown sorting-dropdown px-0-5 py-0-25 mt-0-25 text-sm"
							onChange={handleSortByChange}
							value={sortByPriority}
						>
							<option
								value=""
								name="sortByPriority"
								defaultValue
								disabled
							>
								--Chose an option--
							</option>
							<option value="High to Low" name="sortByPriority">
                                High to Low
							</option>
							<option value="Low to High" name="sortByPriority">
                                Low to High
							</option>
						</select>
					</div>
					{labels.length > 0 && (
						<div className="filter-options">
							<p className="filter-head text-reg">
								Filter By Labels
							</p>
							<div className="label-checkbox-wrapper flex-row flex-align-center flex-justify-start mt-0-25 flex-wrap">
								{labels.map(({ label, id }) => (
									<label
										className="text-sm flex-row flex-align-center flex-justify-start"
										key={id}
									>
										<input
											type="checkbox"
											value={label}
											checked={
												filterByLabel.find(
													(filter) => filter.id === id
												).filtered
											}
											onChange={() =>
												handleFilterByLabelChange(id)
											}
										/>
										{label}
									</label>
								))}
							</div>
						</div>
					)}

					<div className="filter-options">
						<p className="filter-head text-reg">Filter By Priority</p>
						<div className="label-checkbox-wrapper flex-row flex-align-center flex-justify-start mt-0-25 flex-wrap">
							{filterByPriority.map(({ id, priority, filtered }) => (
								<label
									className="text-sm flex-row flex-align-center flex-justify-start"
									key={id}
								>
									<input
										type="checkbox"
										value={priority}
										checked={filtered}
										onChange={() =>
											handleFilterByPriorityChange(id)
										}
									/>
									{priority}
								</label>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { FilterDrawer };
