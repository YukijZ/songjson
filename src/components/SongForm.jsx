import { useState } from "react";
import DifficultyLevel from "./DifficultyLevel";
import PropTypes from "prop-types";

function SongForm({ onAddSong, songToEdit = null, onUpdateSong }) {
  const [imageUrl, setImageUrl] = useState(
    songToEdit ? songToEdit.imageUrl : ""
  );
  const [title, setTitle] = useState(songToEdit ? songToEdit.title : "");
  const [composer, setComposer] = useState(
    songToEdit ? songToEdit.composer : ""
  );
  const [difficulty, setDifficulty] = useState(
    songToEdit ? songToEdit.difficulty : "master"
  );
  const [level, setLevel] = useState(songToEdit ? songToEdit.level : 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageUrl || !title || !composer) {
      alert("Please fill in all fields.");
      return;
    }

    const newSong = {
      imageUrl,
      title,
      composer,
      difficulty,
      level: parseInt(level, 10), // Ensure level is a number
    };

    if (songToEdit) {
      onUpdateSong({ ...newSong, id: songToEdit.id });
    } else {
      onAddSong(newSong);
    }

    // Clear the form
    setImageUrl("");
    setTitle("");
    setComposer("");
    setDifficulty("master");
    setLevel(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="composer">Composer:</label>
        <input
          type="text"
          id="composer"
          value={composer}
          onChange={(e) => setComposer(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty:</label>
        <DifficultyLevel
          selectedDifficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />
      </div>
      <div>
        <label htmlFor="level">Level:</label>
        <input
          type="number"
          id="level"
          min="1"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
      </div>
      <button type="submit">{songToEdit ? "Update Song" : "Add Song"}</button>
    </form>
  );
}
SongForm.propTypes = {
  onAddSong: PropTypes.func.isRequired,
  songToEdit: PropTypes.shape({
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    composer: PropTypes.string,
    difficulty: PropTypes.string,
    level: PropTypes.number,
  }),
  onUpdateSong: PropTypes.func,
};
export default SongForm;
