import React from "react";
import { BarChart as BChart, Bar, XAxis, YAxis, LabelList } from "recharts";

function BarChart({ results }) {
  const formatYAxis = (tick) => `${tick}%`;

  return (
    <BChart width={1000} height={300} data={results} className="mx-auto mb-8">
      <XAxis dataKey="option" fontSize={12} />
      <YAxis domain={[0, 100]} tickFormatter={formatYAxis} />
      <Bar dataKey="percentage" fill="#6541F5" barSize={100}>
        <LabelList dataKey={(entry) => `${entry.percentage}%`} position="top" />
      </Bar>
    </BChart>
  );
}

export default BarChart;
