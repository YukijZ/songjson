import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import SongForm from "./SongForm";

function SongItem({ song, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdateSong = (updatedSong) => {
    onEdit(updatedSong);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <SongForm
          songToEdit={song}
          onUpdateSong={handleUpdateSong}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <img src={song.imageUrl} alt={song.title} />
          <h3>{song.title}</h3>
          <p>Composer: {song.composer}</p>
          <p>
            Difficulty: {song.difficulty} (Level {song.level})
          </p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => onDelete(song.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

// Prop validation using PropTypes
SongItem.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    composer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SongItem;
