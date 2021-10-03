import React, { useState } from "react";

interface ISearch {
    onSearch: any
}

const Search = ({onSearch}: ISearch) => {
    const [input, setInput] = useState('');
    
    const handleSearch = (e: React.MouseEvent<Element, MouseEvent>) : void => {
        e.preventDefault();
        onSearch(input);
        setInput('');
    }

    // Submit with the Enter keyboard
    const handleKeypress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch(input);
            setInput('');
        }
    }

    return (
        <div>
            <h2>Search</h2>
            <input
                type="string" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={handleKeypress}
            />
            <button type="submit" onClick={handleSearch}>Search</button>
        </div>
    )
};

export default Search;