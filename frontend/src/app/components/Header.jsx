import React from 'react';
import { IoGameController } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import HeaderCSS from './Header.module.css'

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>JobQuest AI<div className={HeaderCSS.gameController}><IoGameController></IoGameController></div>
            </h1>
            <h3 style={styles.subheader}>Level up your career skills through epic quests and challenges!</h3>
            <button className={HeaderCSS.startButton}>Start Adventure<FaLongArrowAltRight></FaLongArrowAltRight></button>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#282c34',
        flexDirection: 'column',
        display: 'flex',
        padding: '25px',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box',
        minHeight: 'auto',
        borderBottom: '5px solid rgb(73, 181, 221)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#61dafb',
        fontSize: '5rem',
        margin: 0,
    },
    subheader: {
        padding: '25px',
        color: '#ffffff',
        fontSize: '2rem',
    },
};

export default Header;