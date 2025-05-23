import React, { useState, useRef, useEffect } from 'react';
import './LoadCheck.scss';

const CHECKMARK_ANIMATION_TOTAL_TIME_MS = (0.5 + 0.1) * 1000;

const LoadCheck = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const loadingTimeoutRef = useRef(null);
    const completionTimeoutRef = useRef(null);
    const componentRef = useRef(null);

    useEffect(() => {
        return () => {
            if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
            if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);
        };
    }, []);

    const resetComponent = () => {
        setIsLoading(false);
        setIsCompleted(false);
        setIsResetting(true);

        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
            loadingTimeoutRef.current = null;
        }
        if (completionTimeoutRef.current) {
            clearTimeout(completionTimeoutRef.current);
            completionTimeoutRef.current = null;
        }

        setTimeout(() => {
            setIsResetting(false);
        }, 50);
    };

    const handleClick = () => {
        if (isLoading || isResetting) {
            return;
        }
        if (isCompleted) {
            resetComponent();
            return;
        }
        startLoading();
    };

    const startLoading = () => {
        setIsLoading(true);
        setIsCompleted(false);
        setIsResetting(false);

        if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
        if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);

        loadingTimeoutRef.current = setTimeout(() => {
            if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);
            completionTimeoutRef.current = setTimeout(() => {
                setIsLoading(false);
                setIsCompleted(true);
                completionTimeoutRef.current = null;
            }, CHECKMARK_ANIMATION_TOTAL_TIME_MS);

        }, 1200);
    };

    let containerClasses = "load-check-container";
    if (isLoading) containerClasses += " is-loading";
    if (isCompleted) containerClasses += " is-completed";

    return (
        <div className={containerClasses} ref={componentRef}>
            <div className="check-button" onClick={handleClick}>
                <div className="check-text">
                    {isCompleted ? "Done!" : "Submit"}
                </div>
                <div className="check-progress-bar"></div>
                <div className="check-svg-container">
                    <svg x="0px" y="0px" viewBox="0 0 25 30" style={{ enableBackground: "new 0 0 25 30" }}>
                        <path className="check-check" d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default LoadCheck;