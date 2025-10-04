import React from 'react';
import FooterCSS from './Footer.module.css';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p style={styles.text}>© 2025 JobQuest AI. All rights reserved.</p>
            <div className={FooterCSS.socialIcons}>
                <a href="https://github.com/Lada496/stormhacks-2025" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaXTwitter />
                </a>
            </div>
        </footer>
    );
};

const styles = {
    main: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: '#282c34',
        padding: '20px',
        textAlign: 'center',
        borderTop: '5px solid rgb(73, 181, 221)',
        color: '#ffffff',
        minHeight: '20vh',
    },
    text: {
        margin: '10px 0',
        fontSize: '1.25rem',
    },
};

export default Footer;