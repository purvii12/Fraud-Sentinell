import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const fraudScoreDistribution = [
  { range: '0-10', count: 1250, percentage: 62.5 },
  { range: '11-20', count: 320, percentage: 16.0 },
  { range: '21-30', count: 180, percentage: 9.0 },
  { range: '31-40', count: 120, percentage: 6.0 },
  { range: '41-50', count: 80, percentage: 4.0 },
  { range: '51-60', count: 30, percentage: 1.5 },
  { range: '61-70', count: 15, percentage: 0.75 },
  { range: '71-80', count: 8, percentage: 0.4 },
  { range: '81-90', count: 4, percentage: 0.2 },
  { range: '91-100', count: 3, percentage: 0.15 },
];

const transactionTypes = [
  { name: 'Safe Transactions', value: 1845, color: '#22c55e' },
  { name: 'Fraud Detected', value: 155, color: '#ef4444' },
];

const alertTimeline = [
  { time: '10:00', alerts: 2, false_positives: 0 },
  { time: '11:00', alerts: 4, false_positives: 1 },
  { time: '12:00', alerts: 6, false_positives: 0 },
  { time: '13:00', alerts: 8, false_positives: 2 },
  { time: '14:00', alerts: 12, false_positives: 1 },
  { time: '15:00', alerts: 15, false_positives: 3 },
  { time: '16:00', alerts: 10, false_positives: 1 },
  { time: '17:00', alerts: 7, false_positives: 0 },
];

export function ChartsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Analytics & Visualizations</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Fraud Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fraudScoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="range" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => [
                    name === 'count' ? `${value} transactions` : `${value}%`,
                    name === 'count' ? 'Count' : 'Percentage'
                  ]}
                />
                <Legend />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  name="Transaction Count"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transaction Types Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Classification</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transactionTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {transactionTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value} transactions`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-center space-x-6">
              {transactionTypes.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Fraud Alert Timeline (Today)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={alertTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [
                  `${value} alerts`,
                  name === 'alerts' ? 'Total Alerts' : 'False Positives'
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="alerts" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                name="Total Alerts"
              />
              <Line 
                type="monotone" 
                dataKey="false_positives" 
                stroke="#f59e0b" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                name="False Positives"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}