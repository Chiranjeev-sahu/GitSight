import "./DescriptionSection.css";

function DescriptionSection({ summary }) { 
  
  return (
    <>
      <h3>Project Purpose Summary</h3>
    <section className="description-section">
      <p>{summary || "Summary not available."}</p>
    </section>
    </>
  );
}

export default DescriptionSection;
