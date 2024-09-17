import { Calendar } from 'iconsax-react';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '4 Feb', newSales: 40, returnSales: 20 },
  { date: '5', newSales: 60, returnSales: 40 },
  { date: '6', newSales: 45, returnSales: 0 },
  { date: '7', newSales: 80, returnSales: 20 },
  { date: '8', newSales: 35, returnSales: 0 },
  { date: '9', newSales: 40, returnSales: 0 },
  { date: '10', newSales: 70, returnSales: 40 },
  { date: '11', newSales: 45, returnSales: 0 },
  { date: '12', newSales: 50, returnSales: 0 },
  { date: '13', newSales: 40, returnSales: 10 },
  { date: '14', newSales: 60, returnSales: 0 },
  { date: '15', newSales: 75, returnSales: 0 },
  { date: '16', newSales: 30, returnSales: 0 },
  { date: '17', newSales: 50, returnSales: 20 },
  { date: '18', newSales: 40, returnSales: 0 },
  { date: '19', newSales: 60, returnSales: 20 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow rounded">
        <p className="font-semibold">{`${label}, 2022`}</p>
        <p>{`New: ${payload[0].value} Sales`}</p>
        <p>{`Return: ${payload[1].value} Sales`}</p>
      </div>
    );
  }
  return null;
};

const SalesReportChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sales reports</h2>
        <div className="text-sm py-1 px-3 text-gray-500 border rounded-md border-gray-300 flex items-center gap-x-1">
          <Calendar size={16} /><span>Jan 7 - Feb 6</span>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis hide={true} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="newSales" fill="#000000" barSize={8} radius={[10, 10, 0, 0]} />
            <Bar dataKey="returnSales" fill="#E5E5E5" barSize={8} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-start items-center mt-4">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-black rounded-full mr-2"></div>
          <span className="text-sm">New Sales</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
          <span className="text-sm">Return Sales</span>
        </div>
      </div>
    </div>
  );
};

export default SalesReportChart;