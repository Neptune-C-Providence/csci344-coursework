function addTrackCard() {
    const trackHTML = `
        <section class="track">
            <img src="https://i.scdn.co/image/ab67616d0000b273f6e31941d10e4819d290af41">
            <div>
                <h3>When the Sun Hits</h3>
                <p>Slowdive</p>
                <p>Souvlaki</p>
            </div>
        </section>
    `;

    document.getElementById('track-list').insertAdjacentHTML('beforeend', trackHTML);
}

document.querySelector('button').addEventListener('click', addTrackCard);
