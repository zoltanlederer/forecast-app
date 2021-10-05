import React, { useState } from "react";
import { languages as language } from "../components/Languages";
import { colortheme } from "../components/Colortheme";

interface ISearch {
    onSearch: any,
    languageSwitch: any,
    themeColor: any,
}

const Search = ({onSearch, languageSwitch, themeColor}: ISearch) => {
    const [input, setInput] = useState('');
    const [lang, setLang] = useState('hu');
    const [darkTheme, setDarkTheme] = useState('light');
    
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

    // Light/Dark mode
    const handleTheme = (e: React.MouseEvent<Element, MouseEvent>) : void => {
        e.preventDefault();
        if (darkTheme === 'light') {            
            setDarkTheme('dark') 
            themeColor('dark');
            document.body.style.backgroundColor = '#6c757d';
        } else if (darkTheme === 'dark') {
            setDarkTheme('light')   
            themeColor('light');
            document.body.style.backgroundColor = '#fff';
        }
    }

    
    return (
        <>
        <div className="card-header pt-3 d-flex justify-content-around">
            <button className="btn text-uppercase"
                type="submit" onClick={handleTheme}
            >
                {
                    darkTheme === 'light' ?
                    <><i className="fas fa-toggle-on me-2"></i><img className="pb-2" src={require(`../images/moon.png`).default} alt="" width="20px" /></> : 
                    <><i className="fas fa-toggle-off me-2"></i><img className="pb-2" src={require(`../images/sun.png`).default} alt="" width="20px" /></>
                }
            </button>

            <input
                className="search-input" 
                placeholder={language[lang]['search']}
                type="string" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={handleKeypress}
            />
        
            <button className={`btn text-uppercase ms-3 ${colortheme[darkTheme]['updateBtn']}`}
                type="submit" onClick={handleLanguage}
            >
                {lang === 'hu' ? 'en' : 'hu'}
            </button>
        </div>
        </>
    )
};

export default Search;