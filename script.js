const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPause');
const volumeSlider = document.getElementById('volume');
const playlistItems = document.getElementById('playlistItems');

let currentTrackIndex = 0;
let playlist = [];

// Function to add a track to the playlist
function addTrackToPlaylist(file) {
    const track = {
        file,
        title: file.name,
    };
    playlist.push(track);

    // Create a playlist item and add it to the UI
    const listItem = document.createElement('li');
    listItem.textContent = track.title;
    listItem.addEventListener('click', () => playTrack(track));
    playlistItems.appendChild(listItem);
}

// Function to play a track
function playTrack(track) {
    currentTrackIndex = playlist.indexOf(track);
    const selectedTrack = playlist[currentTrackIndex];

    audioPlayer.src = URL.createObjectURL(selectedTrack.file);
    audioPlayer.play();
    playPauseButton.textContent = 'Pause';

    // Highlight the selected track in the playlist
    const playlistItems = document.querySelectorAll('li');
    playlistItems.forEach((item, index) => {
        if (index === currentTrackIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Event listener for play/pause button
playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseButton.textContent = 'Play';
    }
});

// Event listener for volume control
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

// Add tracks to the playlist (you can add more tracks)
addTrackToPlaylist(/* File object for your music file */);

// Play the first track by default
if (playlist.length > 0) {
    playTrack(playlist[0]);
}
