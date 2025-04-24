document.addEventListener("DOMContentLoaded", () => {
  const playlistNameInput = document.getElementById('playlist-name');
  const createBtn = document.getElementById('create-btn');
  const playlistList = document.getElementById('playlist-list');
  const playlistView = document.getElementById('playlist-view');
  const playlistDetailView = document.getElementById('playlist-detail-view');
  const backBtn = document.getElementById('back-btn');
  const detailPlaylistName = document.getElementById('detail-playlist-name');
  const songList = document.getElementById('song-list');
  const songNameInput = document.getElementById('song-name');
  const songArtistInput = document.getElementById('song-artist');
  const addSongBtn = document.getElementById('add-song-btn');

  let playlists = JSON.parse(localStorage.getItem('playlists')) || [];
  let currentPlaylist = null;

  function showPlaylists() {
      playlistList.innerHTML = '';
      if (playlists.length === 0) {
          playlistList.innerHTML = '<p>Inga spellistor ännu</p>';
          return;
      }
      playlists.forEach(playlist => {
          const div = document.createElement('div');
          div.className = 'playlist';
          const nameSpan = document.createElement('span');
          nameSpan.textContent = `${playlist.name} (${playlist.songs.length} låtar)`;
          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'delete-btn';
          deleteBtn.textContent = 'Ta bort';
          deleteBtn.onclick = (e) => {
              e.stopPropagation();
              deletePlaylist(playlist.id);
          };
          div.appendChild(nameSpan);
          div.appendChild(deleteBtn);
          div.addEventListener('click', () => showPlaylistDetail(playlist.id));
          playlistList.appendChild(div);
      });
  }

  function showPlaylistDetail(id) {
      currentPlaylist = playlists.find(p => p.id === id);
      detailPlaylistName.textContent = currentPlaylist.name;
      songList.innerHTML = '';
      if (currentPlaylist.songs.length === 0) {
          songList.innerHTML = '<p>Inga låtar i denna spellista</p>';
      } else {
          currentPlaylist.songs.forEach((song, index) => {
              const songDiv = document.createElement('div');
              songDiv.className = 'song';
              songDiv.innerHTML = `
                  <span>${song.name} - ${song.artist}</span>
                  <button class="delete-btn" data-index="${index}">Ta bort</button>
              `;
              songDiv.querySelector('button').addEventListener('click', (e) => {
                  e.stopPropagation();
                  deleteSong(index);
              });
              songList.appendChild(songDiv);
          });
      }
      playlistView.classList.add('hidden');
      playlistDetailView.classList.remove('hidden');
  }

  backBtn.addEventListener('click', () => {
      playlistDetailView.classList.add('hidden');
      playlistView.classList.remove('hidden');
      currentPlaylist = null;
  });

  function deletePlaylist(id) {
      if (confirm('Är du säker på att du vill ta bort denna spellista?')) {
          playlists = playlists.filter(p => p.id !== id);
          savePlaylists();
          showPlaylists();
          if (currentPlaylist && currentPlaylist.id === id) {
              playlistDetailView.classList.add('hidden');
              playlistView.classList.remove('hidden');
              currentPlaylist = null;
          }
      }
  }

  addSongBtn.addEventListener('click', () => {
      const name = songNameInput.value.trim();
      const artist = songArtistInput.value.trim();
      if (name && artist) {
          currentPlaylist.songs.push({ name, artist });
          savePlaylists();
          showPlaylistDetail(currentPlaylist.id);
          songNameInput.value = '';
          songArtistInput.value = '';
      } else {
          alert('Du måste ange både låtnamn och artist!');
      }
  });

  function deleteSong(index) {
      currentPlaylist.songs.splice(index, 1);
      savePlaylists();
      showPlaylistDetail(currentPlaylist.id);
  }

  createBtn.addEventListener('click', () => {
      const name = playlistNameInput.value.trim();
      if (name) {
          const newPlaylist = {
              id: Date.now(),
              name,
              songs: []
          };
          playlists.push(newPlaylist);
          savePlaylists();
          playlistNameInput.value = '';
          showPlaylists();
      } else {
          alert('Ange ett namn för spellistan!');
      }
  });

  function savePlaylists() {
      localStorage.setItem('playlists', JSON.stringify(playlists));
  }

  showPlaylists();
});
