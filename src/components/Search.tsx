import React, { useState } from "react";
import { languages as language } from "../components/Languages";

interface ISearch {
    onSearch: any,
    languageSwitch: any
}

const Search = ({onSearch, languageSwitch}: ISearch) => {
    const [input, setInput] = useState('');
    const [lang, setLang] = useState('hu');
    
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

    // Switch language
    const handleLanguage = (e: React.MouseEvent<Element, MouseEvent>) : void => {
        e.preventDefault();
        if (lang === 'en') {            
            setLang('hu'); 
            languageSwitch('hu');
        } else if (lang === 'hu') {
            setLang('en');    
            languageSwitch('en');
        }
    }

    
    return (
        <>
        <div className="card-header">
            <input
                className="search-input" 
                placeholder={language[lang]['search']}
                type="string" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={handleKeypress}
            />
            <button className="btn btn-outline-secondary text-uppercase float-end"
                type="submit" onClick={handleLanguage}
            >
                {lang === 'hu' ? 'en' : 'hu'}
            </button>
        </div>
        </>
    )
};

export default Search;