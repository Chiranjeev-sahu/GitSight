import './FileStructureDisplay.css';

const FileStructureDisplay = ({ fileTreeString}) => {
  const structure =fileTreeString;

  const processFileStructure = (structure) => {
    if (!structure) {
      return <div className="no-structure">File structure not available.</div>;
    }

    const lines = structure.split('\n');

    return lines
      .map((line, index) => {
        if (!line.trim()) return null;

        const nameMatch = line.match(/^(.*?[├└│\s]*[─┌┐┘└├┤┬┴┼\s]*)([a-zA-Z0-9._-].*)$/);

        if (!nameMatch) {
          return (
            <div key={index} className="file-tree-line">
              {line}
            </div>
          );
        }

        const prefix = nameMatch[1]; 
        const nameAndRest = nameMatch[2]; 

        const isFolder =
          nameAndRest.endsWith('/') ||
          nameAndRest.includes('/') ||
          !nameAndRest.includes('.');

        const cleanName = nameAndRest.replace(/\/$/, '');

        return (
          <div
            key={index}
            className={`file-tree-line ${isFolder ? 'folder' : 'file'}`}
          >
            <span className="tree-prefix">{prefix}</span>

            <span className="file-icon">{isFolder ? '📁' : '📄'}</span>

            <span className="file-name">{cleanName}</span>
          </div>
        );
      })
      .filter(Boolean);
  };

  return (
    <>
    <h3>File Structure</h3>
    <div className="file-categorization-section">
      <div className="file-tree">{processFileStructure(structure)}</div>
    </div>
    </>
  );
};
export default FileStructureDisplay;