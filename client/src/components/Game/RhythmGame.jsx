import React, { useState, useEffect, useRef } from 'react';
import '../../styles/RhythmGame.css';
import arrowUp from '../../assets/Game/arrow-up.png';
import arrowDown from '../../assets/Game/arrow-down.png';
import arrowLeft from '../../assets/Game/arrow-left.png';
import arrowRight from '../../assets/Game/arrow-right.png';

const RhythmGame = () => {
    const [sequence, setSequence] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [coins, setCoins] = useState(0);
    const [validationMessage, setValidationMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [validatedSteps, setValidatedSteps] = useState(new Set());
    const [isSuccess, setIsSuccess] = useState(false);
    const [transparentArrows, setTransparentArrows] = useState(new Set());
    const [audio, setAudio] = useState(null);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [messagePosition, setMessagePosition] = useState({ top: '50%', left: '50%' });
    const [countdown, setCountdown] = useState(null);
    const [musicDuration, setMusicDuration] = useState(0);
    const gameAreaRef = useRef(null);
    const intervalRef = useRef(null);

    const playerName = "Joueur 1";

    useEffect(() => {
        fetch('http://localhost:8000/api/random-track')
            .then(response => response.json())
            .then(data => {
                if (data && data.filePath) {
                    const audioFile = new Audio(`http://localhost:8000${data.filePath}`);
                    setAudio(audioFile);

                    audioFile.onloadedmetadata = () => {
                        setMusicDuration(audioFile.duration);
                    };
                } else {
                    console.error('Erreur : aucun fichier audio trouvé.');
                }
            })
            .catch(error => console.error('Erreur lors du chargement de la musique:', error));
    }, []);

    return (
        <div className="game-container">
            <h1>EpiGame</h1>
            {!isGameStarted && (
                <button 
                    onClick={startGameAndMusic} 
                    className="start-button"
                    aria-label="Démarrer la partie"
                >
                    Jouez
                </button>
            )}
            {successMessage && (
                <div className="success-message" role="alert">
                    {successMessage}
                </div>
            )}
            <div className="game-content">
                <div className="player-info-container">
                    <div className="player-name">{playerName}</div>
                </div>
                <div className="game-area" ref={gameAreaRef}>
                    {countdown !== null && (
                        <div className="countdown" aria-live="assertive">
                            {countdown}
                        </div>
                    )}
                    {validationMessage && (
                        <div 
                            className={`validation-message ${isSuccess ? 'success' : 'miss'}`}
                            style={{ top: messagePosition.top, left: messagePosition.left }}
                            aria-live="assertive"
                            aria-label={isSuccess ? "Coup réussi : PERFECT!" : "Coup raté : MISS"}
                        >
                            {validationMessage}
                        </div>
                    )}
                    <div className="arrow-targets">
                        <div className="arrow-column">
                            <div className="validation-zone validation-zone-left" aria-label="Zone de validation pour la flèche gauche"></div>
                            <img src={arrowLeft} alt="Flèche gauche fixe" className="fixed-arrow"/>
                        </div>
                        <div className="arrow-column">
                            <div className="validation-zone validation-zone-down" aria-label="Zone de validation pour la flèche bas"></div>
                            <img src={arrowDown} alt="Flèche bas fixe" className="fixed-arrow"/>
                        </div>
                        <div className="arrow-column">
                            <div className="validation-zone validation-zone-up" aria-label="Zone de validation pour la flèche haut"></div>
                            <img src={arrowUp} alt="Flèche haut fixe" className="fixed-arrow"/>
                        </div>
                        <div className="arrow-column">
                            <div className="validation-zone validation-zone-right" aria-label="Zone de validation pour la flèche droite"></div>
                            <img src={arrowRight} alt="Flèche droite fixe" className="fixed-arrow"/>
                        </div>
                    </div>
                    <div className="arrows">
                        {sequence[currentStep - 1] && (
                            <Arrow 
                                key={currentStep - 1} 
                                direction={sequence[currentStep - 1]}
                                isTransparent={transparentArrows.has(currentStep - 1)}
                            />
                        )}
                    </div>
                </div>
                <div className="score-container">
                    <div className="score">Score : {score}</div>
                </div>
            </div>
        </div>
    );
};

const Arrow = ({ direction, isTransparent }) => {
    const arrowMap = {
        up: arrowUp,
        down: arrowDown,
        left: arrowLeft,
        right: arrowRight,
    };

    return (
        <div 
            className={`arrow arrow-${direction} ${isTransparent ? 'transparent' : ''}`}
            aria-label={`Flèche ${direction} en mouvement`}
        >
            <img src={arrowMap[direction]} alt={`Flèche ${direction}`} />
        </div>
    );
};

export default RhythmGame;
