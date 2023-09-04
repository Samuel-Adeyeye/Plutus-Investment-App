import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		name: 'Jan',
		Expenses: 4000,
		Income: 2400
	},
	{
		name: 'Feb',
		Expenses: 3000,
		Income: 1398
	},
	{
		name: 'Mar',
		Expenses: 2000,
		Income: 9800
	},
	{
		name: 'Apr',
		Expenses: 2780,
		Income: 3908
	},
	{
		name: 'May',
		Expenses: 1890,
		Income: 4800
	},
	{
		name: 'Jun',
		Expenses: 2390,
		Income: 3800
	},
	{
		name: 'July',
		Expenses: 3490,
		Income: 4300
	},
	{
		name: 'Aug',
		Expenses: 2000,
		Income: 9800
	},
	{
		name: 'Sep',
		Expenses: 2780,
		Income: 3908
	},
	{
		name: 'Oct',
		Expenses: 1890,
		Income: 4800
	},
	{
		name: 'Nov',
		Expenses: 2390,
		Income: 3800
	},
	{
		name: 'Dec',
		Expenses: 3490,
		Income: 4300
	}
]

 function TransactionChart() {
   return (
     <div className="h-[30rem] bg-gray-800 p-6 rounded-sm border border-gray-200 flex flex-col flex-1">
       <strong className="text-white font-medium">Statistics</strong>
       <div className="w-full mt-3 flex-1 text-xs">
     <ResponsiveContainer width="100%" height="100%">
       <BarChart width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
         }}>
         <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
         <XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Expenses" fill="#ffffff" />
						<Bar dataKey="Income" fill="#b5f2e5" />
       </BarChart>
         </ResponsiveContainer>
         </div>
   </div>
   )
 }

 export default TransactionChart
