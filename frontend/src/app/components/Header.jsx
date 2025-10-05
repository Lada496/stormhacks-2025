import React from 'react';
import { IoGameController } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import HeaderCSS from './Header.module.css'

const Header = ({ isFullscreen = false, onStartAdventure, contextText = null }) => {
    return (
        <header className={`${HeaderCSS.header} ${isFullscreen ? HeaderCSS.fullscreen : HeaderCSS.compact}`}>
            <div className={HeaderCSS.bannerContent}>
                <h1 className={`${HeaderCSS.title} ${isFullscreen ? HeaderCSS.titleLarge : HeaderCSS.titleSmall}`}>
                    JobQuest AI
                    {!isFullscreen && (
                        <div className={HeaderCSS.gameControllerSmall}>
                            <IoGameController />
                        </div>
                    )}
                </h1>

                {!isFullscreen && contextText && (
                    <div className={HeaderCSS.contextText}>
                        {contextText}
                    </div>
                )}
            </div>

            {isFullscreen && (
                <>
                    <div className={HeaderCSS.gameController}>
                        <IoGameController />
                    </div>
                    <h3 className={HeaderCSS.subheader}>
                        Level up your career skills through epic quests and challenges!
                    </h3>
                    <button className={HeaderCSS.startButton} onClick={onStartAdventure}>
                        Start Adventure <FaLongArrowAltRight />
                    </button>
                </>
            )}
        </header>
    );
};

export default Header;