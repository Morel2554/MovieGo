function loadEpisode(episodeSrc) {
    const videoPlayer = document.getElementById("video-player");

    // Update src of the video player directly
    videoPlayer.src = episodeSrc;
    videoPlayer.load();
    videoPlayer.play();  // Start playing after source update
}
