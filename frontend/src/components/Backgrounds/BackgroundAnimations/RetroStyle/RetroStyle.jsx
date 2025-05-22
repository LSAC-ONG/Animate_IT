import './RetroStyle.css';

const RetroStyle = () => {
    return (
        <div className='retro-container'>
            <div class="scanlines"></div>

            <div class="intro-wrap">
                <div class="noise"></div>
                <div class="noise noise-moving"></div>

                <div class="play" data-splitting>PLAY</div>
                <div class="time">--:--</div>
                <div class="recordSpeed">SLP 0:00:00</div>
            </div>
        </div>
    );
};

export default RetroStyle;