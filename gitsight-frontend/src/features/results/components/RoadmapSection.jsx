import React, { useMemo } from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import './RoadmapSection.css';

const RoadmapStepNode = ({ data }) => {
  return (
    <div className="roadmap-node">
      <div className="step-number">{data.stepNumber}</div>
      <div className="step-content">
        <div className="step-title">{data.title}</div>
        <div className="step-description">{data.description}</div>
      </div>
    </div>
  );
};

const nodeTypes = {
  roadmapStep: RoadmapStepNode,
};

function RoadmapSection({ roadmap }) {
  const parsedSteps = useMemo(() => {
    if (!roadmap) return [];

    const stepsRaw = roadmap.split(/\n(?=\d+\.\s*`)/);
    
    return stepsRaw.map(stepString => {
      const parts = stepString.split('--->');
      if (parts.length >= 2) {
        const titlePart = parts[0].trim();
        const descriptionPart = parts.slice(1).join('--->').trim();
        return {
          id: titlePart,
          title: titlePart,
          description: descriptionPart
        };
      }
      return { id: stepString, title: stepString, description: '' };
    }).filter(step => step.title);
  }, [roadmap]);

  const { nodes, edges } = useMemo(() => {
    if (parsedSteps.length === 0) {
      return { nodes: [], edges: [] };
    }

    // Create nodes
    const flowNodes = parsedSteps.map((step, index) => ({
      id: `step-${index}`,
      type: 'roadmapStep',
      position: { x: (index % 3) * 300, y: Math.floor(index / 3) * 200 },
      data: {
        stepNumber: index + 1,
        title: step.title,
        description: step.description
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    }));

    const flowEdges = [];
    for (let i = 0; i < flowNodes.length - 1; i++) {
      flowEdges.push({
        id: `edge-${i}`,
        source: `step-${i}`,
        target: `step-${i + 1}`,
        type: 'smoothstep',
        animated: true,
        style: {
          stroke: '#2ea043',
          strokeWidth: 2,
        },
        markerEnd: {
          type: 'arrowclosed',
          color: '#2ea043',
        },
      });
    }

    return { nodes: flowNodes, edges: flowEdges };
  }, [parsedSteps]);

  if (!roadmap) {
    return (
      <div className="card">
        <h3 className="card-title">Suggested Reading Roadmap</h3>
        <p>Roadmap suggestion not available.</p>
      </div>
    );
  }

  if (parsedSteps.length === 0) {
    return (
      <div className="card">
        <h3 className="card-title">Suggested Reading Roadmap</h3>
        <p>Could not parse roadmap steps. Raw data:</p>
        <pre style={{ whiteSpace: "pre-wrap" }}>{roadmap}</pre>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="card-title">Suggested Reading Roadmap</h3>
      <div className="roadmap-flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={1.5}
          attributionPosition="bottom-left"
        >
          <Controls />
          <Background color="#30363d" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default RoadmapSection;
