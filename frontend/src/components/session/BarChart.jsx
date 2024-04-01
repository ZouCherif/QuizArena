import React from "react";
import { BarChart as BChart, Bar, XAxis, YAxis, LabelList } from "recharts";

function BarChart() {
  const data = [
    { name: "January", uv: 20 },
    { name: "February", uv: 10 },
    { name: "March", uv: 5 },
    { name: "April", uv: 65 },
  ];

  const formatYAxis = (tick) => `${tick}%`;

  return (
    <BChart width={600} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis domain={[0, 100]} tickFormatter={formatYAxis} />
      <Bar dataKey="uv" fill="#6541F5">
        <LabelList dataKey={(entry) => `${entry.uv}%`} position="top" />
      </Bar>
    </BChart>
  );
}

export default BarChart;
