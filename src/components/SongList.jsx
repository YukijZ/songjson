import PropTypes from "prop-types";
import SongItem from "./SongItem";

function SongList({ songs, onEditSong, onDeleteSong }) {
  return (
    <ul>
      {songs.map((song) => (
        <SongItem
          key={song.id}
          song={song}
          onEdit={onEditSong}
          onDelete={onDeleteSong}
        />
      ))}
    </ul>
  );
}

SongList.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      composer: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEditSong: PropTypes.func.isRequired,
  onDeleteSong: PropTypes.func.isRequired,
};

export default SongList;
