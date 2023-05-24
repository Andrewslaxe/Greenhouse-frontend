import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'white',
      },
      title: {
        display: true,
        text: 'Hora',
        color: 'white',
      }
    },
    y: {
      title: {
        display: true,
        text: 'Temperatura (°C)',
        color: 'white',
      },
      grid: {
        display: false,
      },
      ticks: {
        color: 'white',
      },
    },
  },

}

export function Chart({ allDates, allData }) {
  const data = {
    labels: allDates,
    datasets: [
      {
        label: 'Temperatura',
        data: allData,
        borderColor: 'white',
        backgroundColor: '#26A69A',
        tension: 0.5,
        fill: true,
        pointBorderWidth: 10
      },
    ],
  }
  return (
    <>
      <Line classname='graph' options={options} data={data} />
    </>
  )
}