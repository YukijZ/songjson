import { useState, useEffect } from "react";
import SongForm from "./components/SongForm";
import SongList from "./components/SongList";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch initial data from songs.json when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("/songs.json");
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., display an error message to the user)
      }
    };

    fetchData();
  }, []);

  const handleAddSong = async (newSong) => {
    try {
      const response = await fetch("/songs.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSong),
      });

      if (!response.ok) {
        throw new Error("Failed to add song.");
      }

      const data = await response.json();
      setSongs([...songs, { ...newSong, id: data.id }]); // Use the ID from the server
    } catch (error) {
      console.error("Error adding song:", error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  const handleEditSong = async (updatedSong) => {
    try {
      const response = await fetch(`/songs.json/${updatedSong.id}`, {
        method: "PUT", // or PATCH, depending on your backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSong),
      });

      if (!response.ok) {
        throw new Error("Failed to update song.");
      }

      setSongs(
        songs.map((song) => (song.id === updatedSong.id ? updatedSong : song))
      );
    } catch (error) {
      console.error("Error editing song:", error);
      // Handle error
    }
  };

  const handleDeleteSong = async (songId) => {
    try {
      const response = await fetch(`/songs.json/${songId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete song.");
      }

      setSongs(songs.filter((song) => song.id !== songId));
    } catch (error) {
      console.error("Error deleting song:", error);
      // Handle error
    }
  };

  return (
    <div className="App">
      <h1>Song Data Manager</h1>

      <SongForm onAddSong={handleAddSong} />

      <h2>Song List</h2>
      <SongList
        songs={songs}
        onEditSong={handleEditSong}
        onDeleteSong={handleDeleteSong}
      />
    </div>
  );
}

export default App;
