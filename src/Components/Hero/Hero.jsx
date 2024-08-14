import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import hero_img from '../Assets/hero_img.mp4';

const Hero = () => {
    const videoRef = useRef(null); // Create a reference to the video element

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play().catch((error) => {
                console.error("Error attempting to play", error);
            });
        }
    }, []);

    return (
        <div className='hero-right'>
            <Link to='/login'>
                <video
                    ref={videoRef}
                    src={hero_img}
                    loop
                    muted
                    className="video-element"
                />
            </Link>
        </div>
    );
};

export default Hero;
