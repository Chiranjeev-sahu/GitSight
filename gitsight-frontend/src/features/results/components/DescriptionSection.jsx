import "./DescriptionSection.css";

function DescriptionSection({ summary }) { 
  
  return (
    <section className="description-section">
      <h3>Project Purpose Summary</h3>
      <p>{summary || "Summary not available."}</p>
    </section>
  );
}

export default DescriptionSection;
