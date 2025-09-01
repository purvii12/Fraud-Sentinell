import { X, Shield, Ban, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Transaction } from './Dashboard';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface TransactionDetailProps {
  transaction: Transaction;
  onClose: () => void;
}

// Mock SHAP values for demonstration
const shapData = [
  { feature: 'Transaction Amount', value: 0.25, impact: 'High amount increases fraud risk' },
  { feature: 'Time of Day', value: 0.15, impact: 'Transaction time is suspicious' },
  { feature: 'Merchant Category', value: 0.12, impact: 'High-risk merchant category' },
  { feature: 'Device Location', value: 0.18, impact: 'Unusual device location' },
  { feature: 'User History', value: -0.08, impact: 'User has good transaction history' },
  { feature: 'Velocity Check', value: 0.22, impact: 'Multiple transactions in short time' },
];

export function TransactionDetail({ transaction, onClose }: TransactionDetailProps) {
  const riskLevel = transaction.fraudScore >= 70 ? 'high' : transaction.fraudScore >= 40 ? 'medium' : 'low';
  
  const riskConfig = {
    high: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    medium: { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
    low: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="w-[500px] h-full bg-white shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Transaction Details</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Transaction Summary */}
          <Card className={`${riskConfig[riskLevel].bg} ${riskConfig[riskLevel].border} border`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{transaction.id}</CardTitle>
                <Badge className={`${riskConfig[riskLevel].color} bg-transparent border-current`}>
                  {riskLevel.toUpperCase()} RISK
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${riskConfig[riskLevel].color}`}>
                        {transaction.fraudScore}%
                      </div>
                      <div className="text-sm text-gray-600">Fraud Score</div>
                    </div>
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={riskLevel === 'high' ? '#dc2626' : riskLevel === 'medium' ? '#ea580c' : '#16a34a'}
                          strokeWidth="2"
                          strokeDasharray={`${transaction.fraudScore}, 100`}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Time:</span>
                    <div className="font-medium">{transaction.time}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Device:</span>
                    <div className="font-medium">{transaction.deviceType}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Merchant:</span>
                    <div className="font-medium">{transaction.merchant}</div>
                    <div className="text-sm text-gray-500">{transaction.merchantCategory}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SHAP Explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>Model Explanation (SHAP)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={shapData} layout="horizontal">
                    <XAxis type="number" domain={[-0.3, 0.3]} hide />
                    <YAxis type="category" dataKey="feature" width={120} fontSize={12} />
                    <Bar dataKey="value" radius={2}>
                      {shapData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.value > 0 ? '#ef4444' : '#22c55e'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="space-y-3">
                  {shapData.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      {item.value > 0 ? (
                        <TrendingUp className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900">{item.feature}</div>
                        <div className="text-sm text-gray-600">{item.impact}</div>
                      </div>
                      <div className={`text-sm font-medium ${item.value > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {item.value > 0 ? '+' : ''}{(item.value * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <Shield className="h-4 w-4 mr-2" />
              Approve Transaction
            </Button>
            <Button 
              variant="destructive" 
              className="w-full"
              size="lg"
            >
              <Ban className="h-4 w-4 mr-2" />
              Block Transaction
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              size="lg"
            >
              Request Manual Review
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}