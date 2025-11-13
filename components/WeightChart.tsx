"use client";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend,
  TimeSeriesScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useStore, type Entry } from '@/lib/store';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, Legend, TimeSeriesScale);

export default function WeightChart(){
  const { entries } = useStore();
  const weightEntries = entries.filter((e): e is Extract<Entry, { type: 'weight' }> => e.type === 'weight');
  const dataPoints = weightEntries
    .sort((a,b)=>a.date.localeCompare(b.date))
    .map(e=>({ x: new Date(e.date).getTime(), y: e.weight }));

  const data = {
    datasets: [
      {
        label: 'Weight (kg)',
        data: dataPoints,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79,70,229,.2)',
        fill: true,
        tension: .3,
        pointRadius: 2,
      }
    ]
  };

  const options: any = {
    responsive: true,
    scales: {
      x: { type: 'timeseries', ticks: { color: '#8792a2' }, grid: { color: 'rgba(255,255,255,.06)' } },
      y: { ticks: { color: '#8792a2' }, grid: { color: 'rgba(255,255,255,.06)' } }
    },
    plugins: { legend: { labels: { color: '#e6edf6' } } }
  };

  return <div style={{height:320}}><Line data={data} options={options} /></div>;
}
