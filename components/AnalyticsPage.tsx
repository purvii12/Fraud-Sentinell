import { useState } from 'react';
import { TrendingUp, Calendar, Download, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

// Mock data for analytics
const fraudTrends = [
  { date: '2024-08-25', fraudDetected: 12, totalTransactions: 2400, falsePositives: 2 },
  { date: '2024-08-26', fraudDetected: 15, totalTransactions: 2600, falsePositives: 3 },
  { date: '2024-08-27', fraudDetected: 8, totalTransactions: 2200, falsePositives: 1 },
  { date: '2024-08-28', fraudDetected: 18, totalTransactions: 2800, falsePositives: 4 },
  { date: '2024-08-29', fraudDetected: 22, totalTransactions: 3100, falsePositives: 5 },
  { date: '2024-08-30', fraudDetected: 11, totalTransactions: 2500, falsePositives: 2 },
  { date: '2024-08-31', fraudDetected: 16, totalTransactions: 2700, falsePositives: 3 },
  { date: '2024-09-01', fraudDetected: 14, totalTransactions: 2400, falsePositives: 1 },
];

const modelPerformance = [
  { metric: 'Precision', value: 92.5, target: 90 },
  { metric: 'Recall', value: 87.3, target: 85 },
  { metric: 'F1-Score', value: 89.8, target: 87 },
  { metric: 'Accuracy', value: 94.1, target: 92 },
];

const fraudByCategory = [
  { category: 'High Amount', count: 45, percentage: 32.1, color: '#ef4444' },
  { category: 'Velocity Check', count: 38, percentage: 27.1, color: '#f97316' },
  { category: 'Cross-Border', count: 28, percentage: 20.0, color: '#eab308' },
  { category: 'Device Anomaly', count: 18, percentage: 12.9, color: '#22c55e' },
  { category: 'Time Anomaly', count: 11, percentage: 7.9, color: '#3b82f6' },
];

const hourlyActivity = [
  { hour: '00', normal: 45, fraud: 2 },
  { hour: '01', normal: 32, fraud: 1 },
  { hour: '02', normal: 28, fraud: 0 },
  { hour: '03', normal: 25, fraud: 1 },
  { hour: '04', normal: 31, fraud: 0 },
  { hour: '05', normal: 48, fraud: 1 },
  { hour: '06', normal: 72, fraud: 2 },
  { hour: '07', normal: 95, fraud: 3 },
  { hour: '08', normal: 128, fraud: 4 },
  { hour: '09', normal: 156, fraud: 6 },
  { hour: '10', normal: 184, fraud: 8 },
  { hour: '11', normal: 195, fraud: 9 },
  { hour: '12', normal: 201, fraud: 12 },
  { hour: '13', normal: 198, fraud: 11 },
  { hour: '14', normal: 189, fraud: 14 },
  { hour: '15', normal: 172, fraud: 10 },
  { hour: '16', normal: 165, fraud: 8 },
  { hour: '17', normal: 143, fraud: 7 },
  { hour: '18', normal: 121, fraud: 5 },
  { hour: '19', normal: 98, fraud: 4 },
  { hour: '20', normal: 85, fraud: 3 },
  { hour: '21', normal: 74, fraud: 2 },
  { hour: '22', normal: 62, fraud: 2 },
  { hour: '23', normal: 51, fraud: 1 },
];

const merchantRisk = [
  { merchant: 'Electronics Stores (MP)', riskScore: 78, transactions: 1240 },
  { merchant: 'Gold/Jewellery Shops', riskScore: 85, transactions: 890 },
  { merchant: 'Travel Agencies (MP)', riskScore: 72, transactions: 650 },
  { merchant: 'Online Marketplaces', riskScore: 68, transactions: 2100 },
  { merchant: 'Fashion Retailers (Indore)', riskScore: 74, transactions: 1560 },
];

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fraud Analytics</h1>
          <p className="text-gray-600">Comprehensive fraud detection insights and trends</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Model Performance</TabsTrigger>
          <TabsTrigger value="patterns">Fraud Patterns</TabsTrigger>
          <TabsTrigger value="merchants">Merchant Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Total Transactions</p>
                    <p className="text-xl font-bold text-gray-900">18,700</p>
                    <p className="text-xs text-green-600">+12% from last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-600">Fraud Detected</p>
                    <p className="text-xl font-bold text-red-600">116</p>
                    <p className="text-xs text-red-600">+8% from last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Detection Rate</p>
                    <p className="text-xl font-bold text-green-600">0.62%</p>
                    <p className="text-xs text-green-600">Within normal range</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <PieChartIcon className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">False Positive Rate</p>
                    <p className="text-xl font-bold text-orange-600">1.8%</p>
                    <p className="text-xs text-orange-600">-0.3% from last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fraud Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Fraud Detection Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fraudTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="fraudDetected"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#fee2e2"
                    name="Fraud Detected"
                  />
                  <Area
                    type="monotone"
                    dataKey="falsePositives"
                    stackId="2"
                    stroke="#f59e0b"
                    fill="#fef3c7"
                    name="False Positives"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Hourly Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction Activity by Hour</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={hourlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="hour" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="normal" fill="#22c55e" name="Normal Transactions" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="fraud" fill="#ef4444" name="Fraud Detected" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Model Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Model Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={modelPerformance} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis type="number" domain={[0, 100]} stroke="#6b7280" fontSize={12} />
                  <YAxis type="category" dataKey="metric" width={80} stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Current Performance" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          {/* Fraud by Category */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fraud by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={fraudByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percentage }) => `${percentage.toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {fraudByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {fraudByCategory.map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{item.category}</span>
                      </div>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fraudByCategory.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{category.category}</span>
                        <span className="text-sm text-gray-600">{category.count} cases</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${category.percentage}%`,
                            backgroundColor: category.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="merchants" className="space-y-6">
          {/* Merchant Risk Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Merchant Risk Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {merchantRisk.map((merchant) => (
                  <div key={merchant.merchant} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{merchant.merchant}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({merchant.transactions.toLocaleString()} transactions)
                        </span>
                      </div>
                      <span className={`font-medium ${
                        merchant.riskScore >= 80 ? 'text-red-600' : 
                        merchant.riskScore >= 70 ? 'text-orange-600' : 'text-yellow-600'
                      }`}>
                        {merchant.riskScore}% risk
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          merchant.riskScore >= 80 ? 'bg-red-500' : 
                          merchant.riskScore >= 70 ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${merchant.riskScore}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}