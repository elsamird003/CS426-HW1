import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./elec.css"
const API_URL = "https://api.electricitymap.org/v3/carbon-intensity/latest?zone=US-CAR-SCEG";
const API_KEY = "EZZAQG5JMZ0XzN7O24xg"; 
import carbon from "../electricity_chart/images/co-why-is-carbon-dioxide-bad-4864246_V2-4ea7c0936b5a4cd3b8d4f2b41ec02f63.png"
 
const CarbonIntensityChart = () => {
  const [data, setData] = useState<{ time: string; intensity: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "auth-token": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${await response.text()}`);
        }

        const result = await response.json();
        console.log(result); // Debugging: Check API response

        // Process API response into chart-friendly data
        const formattedData = [
          {
            time: new Date().toLocaleTimeString(),
            intensity: result.carbonIntensity, // Adjust this based on the API response structure
          },
        ];

        setData((prevData) => [...prevData, ...formattedData]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();

    // Fetch new data every minute (optional)
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="emissions-container">
      <h1>Carbon Emissions</h1>
  
      <div className="emisson-text">
        <h1>why carbon  dioxide emissions bad for the environment ?</h1>
        <img src={carbon} alt="Old Growth Forest" className="forest-image" />
        <p>
          Excess carbon dioxide (CO2) in the atmosphere is detrimental to the environment because it's a major greenhouse gas, 
          trapping heat and contributing to global warming, leading to climate change, rising sea levels, extreme weather events, 
          and ocean acidification, which harms marine life and ecosystems.
        </p>
        <p>
          As CO2 levels rise, the planet's average temperature increases, resulting in a range of negative impacts.
        </p>
      </div>
  
      <div className="parent-container">
        <div className="chart-container">
          <h2>Live Carbon Intensity Data from South Carolina Electric and Gas Company</h2>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis label={{ value: "gCO2/kWh", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <CartesianGrid stroke="#ccc" />
              <Line type="monotone" dataKey="intensity" stroke="#ff5733" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

}
export default CarbonIntensityChart;
