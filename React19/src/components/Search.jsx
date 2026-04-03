import React from 'react'
import { Search as SearchIcon } from 'lucide-react';

const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search relative group">
            <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-white transition-colors" />

            <input
            type="text"
            placeholder="Search Through thousands of anime"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            />
        </div>
        </div>
    )
}
export default Search
