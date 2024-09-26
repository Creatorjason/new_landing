import React from 'react'
import Image from 'next/image';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SalesReportChart from '@/components/dashboard/charts/SalesReportChart'

const data = [
  { name: 'J', value: 550 },
  { name: 'F', value: 300 },
  { name: 'M', value: 350 },
  { name: 'A', value: 320 },
  { name: 'M', value: 400 },
  { name: 'J', value: 451 },
  { name: 'J', value: 440 },
  { name: 'A', value: 480 },
  { name: 'S', value: 470 },
  { name: 'O', value: 500 },
  { name: 'N', value: 520 },
  { name: 'D', value: 540 },
];

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white dark:bg-[#1C2626] p-4 rounded-lg shadow">
    <div className="flex flex-col justify-center gap-y-4 min-h-20 px-2">
      <div className="dark:bg-[#141F1F] self-start p-3 bg-[#141F1F] rounded-full">
        <Image src={icon} alt='' width={35} height={35} />
      </div>
      <div>
        <p className="text-sm text-[#666666] dark:text-gray-400">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const VersesContent = () => {
  return (
    <>
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
        <StatCard icon="/others/money-bag.svg" title="Total Orders" value="0" />
        <StatCard icon="/others/briefcase.svg" title="Total Sales" value="0" />
        <StatCard icon="/others/money-bag.svg" title="Receivables" value="₦0.00" />
        <StatCard icon="/others/briefcase.svg" title="Total Profit" value="₦0.00" />
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-[#1C2626] p-4 md:p-6 rounded-lg shadow">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Total Orders</h2>
        <div className='p-4 border'>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button className="px-4 py-2 bg-gray-200 dark:bg-[#141F1F] rounded-full text-sm font-medium">12M<span className='hidden md:inline-block'>onths</span></button>
            <button className="px-4 py-2 text-sm font-medium">6M<span className='hidden md:inline-block'>onths</span></button>
            <button className="px-4 py-2 text-sm font-medium">3D<span className='hidden md:inline-block'>ays</span></button>
            <button className="px-4 py-2 text-sm font-medium">7D<span className='hidden md:inline-block'>ays</span></button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke='#F4F4F5' />
                <XAxis dataKey="name" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#7DF9FF" fill="#7DF9FF30" fillOpacity={1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sales Report Chart code */}
      <div className="my-4 mt-8">
        <SalesReportChart />
      </div>
    </>
  )
}

export default VersesContent