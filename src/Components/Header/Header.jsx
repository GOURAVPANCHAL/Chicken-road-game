import React from 'react'
import logo from "../../images/cropped-logo.webp"
import './header.css'
const Header = () => {
    return (
        <>
            <header className='header'>
                <div className='header-logo'>
                    <img src={logo} alt='murgi' />
                </div>
                <div className='header-links'>
                    <a href="">Ελληνικά</a>
                    <a href="">Deutsch</a>
                    <a href="">Suomi</a>
                </div>
            </header>
        </>
    )
}

export default Header