import "./commandPalette.styles.css";

export const CommandPalette = () => {
  return (
    <div className="command-palette">
      <div className="command-palette__input">
        <input type="text" placeholder="Search commands..." />
      </div>
      <div className="command-palette__results">
        {/* Results will be populated here */}
      </div>
    </div>
  );
};
