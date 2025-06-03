import React from "react";
// import ChartComponent from "../../../components/ChartComponent/ChartComponent"; // If global
import "./LanguageChartSection.css";

function LanguageChartSection({ chartData }) { // Expects chartData
  // This component will:
  // - Be a container for the language statistics chart.
  // - Render the ChartComponent, passing it the necessary data.
  return (
    <section className="language-chart-section">
      <h3>Language Distribution</h3>
      {/* <ChartComponent data={chartData} /> */}
      <p>LanguageChartSection: Container for the language chart.</p>
    </section>
  );
}

export default LanguageChartSection;
