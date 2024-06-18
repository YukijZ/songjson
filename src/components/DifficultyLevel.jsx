import PropTypes from "prop-types";

const DifficultyLevel = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficulties = ["re:master", "master", "expert"];

  return (
    <select
      value={selectedDifficulty}
      onChange={(e) => onDifficultyChange(e.target.value)}
    >
      {difficulties.map((difficulty) => (
        <option key={difficulty} value={difficulty}>
          {difficulty.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

DifficultyLevel.propTypes = {
  selectedDifficulty: PropTypes.string.isRequired,
  onDifficultyChange: PropTypes.func.isRequired,
};

export default DifficultyLevel;
