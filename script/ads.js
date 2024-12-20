let adPlayed = false; // Track if ad has already played

// Function to dynamically load episodes and handle ad
function loadEpisode(episodePath) {
    const videoPlayer = document.getElementById('video-player');
    const sourceElement = videoPlayer.querySelector('source');

    // Update video source
    sourceElement.src = episodePath;
    videoPlayer.load(); // Reload video player with the new source
    videoPlayer.play(); // Optionally start playing automatically

    adPlayed = false; // Reset ad status when loading a new episode
}

// Function to check and play ad at a specific time (e.g., 30 minutes)
function checkAd(videoPlayer) {
    const currentTime = videoPlayer.currentTime; // Get current video time in seconds

    if (!adPlayed && currentTime >= 30 * 60) { // Check if it's 30 minutes (1800 seconds)
        adPlayed = true; // Mark ad as played

        // Store current episode to resume after ad
        const currentEpisode = videoPlayer.querySelector('source').src;

        // Play the ad
        videoPlayer.querySelector('source').src = 'Iklan/Sparkle Trailer — _Monodrama_ _ Honkai_ Star Rail (1080p).mp4';
        videoPlayer.load(); // Reload player with the ad
        videoPlayer.play(); // Start playing the ad

        // When the ad finishes, resume the episode
        videoPlayer.onended = function() {
            videoPlayer.querySelector('source').src = currentEpisode; // Restore the episode
            videoPlayer.load(); // Reload player with the episode
            videoPlayer.play(); // Resume playing the episode
        };
    }
}

// Event listener to check for ad during video playback
function monitorVideo() {
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.ontimeupdate = function() {
        checkAd(videoPlayer);
    };
}
