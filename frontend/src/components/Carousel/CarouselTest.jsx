import React from 'react';
import Carousel from './carousel';

export default function CarouselTest() {
    return (
        <div className="carousel-test">
        <h1>Carousel Test</h1>
        <Carousel VISIBLE={5} MAX_HEIGHT={'40vh'}/>
        </div>
    );
    }