import React, { useState } from "react";

interface ISearch {
    onSearch: any
}

const Search = ({onSearch}: ISearch) => {
    const [input, setInput] = useState('');
    
    // There isn't any button at the current design
    // const handleSearch = (e: React.MouseEvent<Element, MouseEvent>) : void => {
    //     e.preventDefault();
    //     onSearch(input);
    //     setInput('');
    // }

    // Submit with the Enter keyboard
    const handleKeypress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch(input);
            setInput('');
        }
    }

    return (
        <>
        <div className="card-header">
            <input
                className="search-input" 
                placeholder="Search"
                type="string" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={handleKeypress}
            />
        </div>
        </>
    )
};

export default Search;