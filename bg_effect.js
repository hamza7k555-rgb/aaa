window.addEventListener('scroll', function () {
    const blueWaveShadow = document.getElementById('landingbg');
    const mainThings = document.getElementById('mainthings');
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight; // 100vh in pixels

    let opacity = 1 - (scrollY / maxScroll) * 1;
    opacity = opacity < 0 ? 0 : opacity; // Ensure opacity doesn't go below 0

    mainThings.style.setProperty('opacity', opacity, 'important');
    blueWaveShadow.style.setProperty('opacity', opacity, 'important');
});