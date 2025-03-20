import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./chart.css";
const CarbonChart = () => {
  const [data, setData] = useState([
    { month: "Jan", footprint: 200 },
    { month: "Feb", footprint: 180 },
    { month: "Mar", footprint: 160 },
    { month: "Apr", footprint: 150 },
    { month: "May", footprint: 140 },
    { month: "Jun", footprint: 130 },
  ]);

  const updateData = () => {
    setData([
      { month: "Jan", footprint: 210 },
      { month: "Feb", footprint: 190 },
      { month: "Mar", footprint: 170 },
      { month: "Apr", footprint: 160 },
      { month: "May", footprint: 150 },
      { month: "Jun", footprint: 140 },
    ]);
  };

  return (
    <div className="chart-container">
      <h2>Carbon Footprint Over Time</h2>
      <button onClick={updateData}>Update Data</button>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="footprint" stroke="#646cff" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CarbonChart;
