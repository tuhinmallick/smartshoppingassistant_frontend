import { useState, useEffect } from "react";
import { fetchPriceHistoryChart } from "../api/authAPI";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceHistory = ({ productId, storage, color, ram }) => {
  const [showChart, setShowChart] = useState(false);
  const [timeframe, setTimeframe] = useState("3m");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadPriceHistory = async () => {
      if (!productId || !storage) return;

      console.log("Fetching data with timeframe:", timeframe); // Log the selected timeframe

      try {
        const historyData = await fetchPriceHistoryChart(productId, {
          storage,
          color,
          ram,
          timeframe,
        });

        console.log("Fetched history data:", historyData); // Log the fetched data
        setChartData(historyData || []);
      } catch (err) {
        console.error("Error fetching price history:", err.message);
        setChartData([]);
      }
    };

    loadPriceHistory();
  }, [productId, storage, color, ram, timeframe]);

  const data = {
    labels: chartData.map((entry) => entry.label),
    datasets: [
      {
        label: "Price (€)",
        data: chartData.map((entry) => entry.value),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (€)",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="text-center mb-6">
      <button
        onClick={() => setShowChart(!showChart)}
        className="text-white bg-black px-4 py-2 rounded shadow hover:bg-gray-800 transition-all duration-300"
      >
        {showChart ? "Hide Price History" : "Show Price History"}
      </button>

      {showChart && (
        <>
          <div className="my-4">
            <select
              onChange={(e) => setTimeframe(e.target.value)} // Updates the 'timeframe' state when a selection is made
              value={timeframe}
              className="p-2 border rounded"
            >
              <option value="1m">1 Month</option>
            </select>
          </div>

          <div className="mt-6">
            {chartData.length > 0 ? (
              <Line data={data} options={options} />
            ) : (
              <p>No price history available for the selected timeframe.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PriceHistory;
