import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        const categoryMap = {
            'computerscience': '/shopcategory/computerscience',
            'mathematics': '/shopcategory/mathematics',
            'english': '/shopcategory/english',
            'economics': '/shopcategory/economics',
            'biology': '/shopcategory/biology',
        };

        const path = categoryMap[searchTerm.toLowerCase()];
        if (path) {
            navigate(path);
        } else {
            alert('Category not found');
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search for category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>
                <SearchIcon />
            </button>
        </div>
    );
};

export default SearchBar;
