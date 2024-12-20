// Function to dynamically load episodes
function loadEpisode(episodePath) {
    const videoPlayer = document.getElementById('video-player');
    const sourceElement = videoPlayer.querySelector('source');

    // Update video source
    sourceElement.src = episodePath;
    videoPlayer.load(); // Reload video player with the new source
    videoPlayer.play(); // Optionally start playing automatically
}