import { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { UseUserStats } from '../hooks/Usegetstats';
import { DarkModeContext } from '../context/DarkmodeContext';
import { CircularProgress } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatisticsandAnalytics = () => {
  const { data: userstats, isLoading, error } = UseUserStats();
  const context = useContext(DarkModeContext);

  if (context === null) {
    throw new Error('DarkModeContext must be used within a DarkModeProvider');
  }

  const { darkMode } = context;

  if (isLoading) return <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-[#353b48]' : 'bg-white'}`}><CircularProgress /></div>;
  if (error) return <p>Error fetching data</p>;

  const labels = userstats.map((stat: any) => `${stat._id.year}/${stat._id.month}`); 
  const data = userstats.map((stat:any) => stat.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Papers Published',
        data,
        fill: false,
        borderColor: '#4B77BE',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Papers',
        },
      },
    },
  };

  return (
    <div className={`p-4 ${darkMode ? 'bg-[#1E1E1E] text-white' : 'bg-white text-black'} mt-20`}>
      <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
      <div className="w-full h-80"> 
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default StatisticsandAnalytics;
