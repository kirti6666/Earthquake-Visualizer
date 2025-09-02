import React, { useEffect, useRef } from "react";
import "./QuakeList.css";

function QuakeList({ quakes, onSelect, selectedQuake }) {
  const itemRefs = useRef({});

  // Scroll selected quake into view
  useEffect(() => {
    if (selectedQuake && itemRefs.current[selectedQuake.id]) {
      itemRefs.current[selectedQuake.id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedQuake]);

  const getColor = (mag) => {
    if (mag < 3) return "green";
    if (mag < 5) return "orange";
    return "red";
  };

  return (
    <div className="quake-list">
      <h2>Earthquakes</h2>
      {quakes.length === 0 && <p>No recent quakes.</p>}
      {quakes.map((q) => (
        <div
          key={q.id}
          ref={(el) => (itemRefs.current[q.id] = el)}
          className="quake-item"
          style={{
            borderLeft: `5px solid ${getColor(q.properties.mag)}`,
            backgroundColor: selectedQuake?.id === q.id ? "#e0f7ff" : "#fff",
          }}
          onClick={() => onSelect(q)}
        >
          <strong>{q.properties.place}</strong>
          <div>
            Mag: {q.properties.mag} |{" "}
            {new Date(q.properties.time).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuakeList;
