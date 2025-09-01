import { useState } from 'react';
import { ArrowUpDown, Search, Shield, Ban, Smartphone, Monitor, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Transaction } from './ui/Dashboard';

interface AlertsTableProps {
  onTransactionSelect: (transaction: Transaction) => void;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    amount: 187500.00,
    time: '14:23',
    merchant: 'Digital Electronics Bhopal',
    merchantCategory: 'Electronics',
    deviceType: 'Mobile',
    fraudScore: 85,
    reasons: ['High amount for merchant category', 'Unusual device location', 'Time-based anomaly']
  },
  {
    id: 'TXN-002',
    amount: 3450.00,
    time: '14:18',
    merchant: 'Chai Point Indore',
    merchantCategory: 'Food',
    deviceType: 'POS',
    fraudScore: 15,
    reasons: ['Normal transaction pattern']
  },
  {
    id: 'TXN-003',
    amount: 90000.00,
    time: '14:15',
    merchant: 'Reliance Trends Gwalior',
    merchantCategory: 'Retail',
    deviceType: 'Web',
    fraudScore: 92,
    reasons: ['Velocity check failed', 'High-risk merchant', 'Unusual spending pattern']
  },
  {
    id: 'TXN-004',
    amount: 5662.50,
    time: '14:12',
    merchant: 'More Supermarket Jabalpur',
    merchantCategory: 'Grocery',
    deviceType: 'POS',
    fraudScore: 8,
    reasons: ['Normal transaction pattern']
  },
  {
    id: 'TXN-005',
    amount: 240000.00,
    time: '14:08',
    merchant: 'Make My Trip Ujjain',
    merchantCategory: 'Travel',
    deviceType: 'Web',
    fraudScore: 78,
    reasons: ['High amount transaction', 'Cross-border payment']
  }
];

function getMerchantIcon(category: string) {
  switch (category) {
    case 'Electronics':
    case 'Retail':
      return Monitor;
    case 'Food':
    case 'Grocery':
      return CreditCard;
    case 'Travel':
      return Smartphone;
    default:
      return CreditCard;
  }
}

function getDeviceIcon(deviceType: string) {
  switch (deviceType) {
    case 'Mobile':
      return Smartphone;
    case 'Web':
      return Monitor;
    case 'POS':
      return CreditCard;
    default:
      return Monitor;
  }
}

function getFraudScoreColor(score: number) {
  if (score >= 70) return 'text-red-600 bg-red-50';
  if (score >= 40) return 'text-orange-600 bg-orange-50';
  return 'text-green-600 bg-green-50';
}

export function AlertsTable({ onTransactionSelect }: AlertsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredTransactions = mockTransactions.filter(
    transaction =>
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Fraud Alerts</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  <button className="flex items-center space-x-1 hover:text-gray-900">
                    <span>Transaction ID</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  <button className="flex items-center space-x-1 hover:text-gray-900">
                    <span>Amount</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Merchant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Device</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Fraud Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => {
                const MerchantIcon = getMerchantIcon(transaction.merchantCategory);
                const DeviceIcon = getDeviceIcon(transaction.deviceType);
                
                return (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onTransactionSelect(transaction)}
                  >
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-blue-600">{transaction.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${
                        transaction.fraudScore >= 70 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        ₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{transaction.time}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <MerchantIcon className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{transaction.merchant}</div>
                          <div className="text-sm text-gray-500">{transaction.merchantCategory}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <DeviceIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{transaction.deviceType}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getFraudScoreColor(transaction.fraudScore)}>
                            {transaction.fraudScore}%
                          </Badge>
                        </div>
                        <Progress 
                          value={transaction.fraudScore} 
                          className="w-20 h-2"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
                          <Shield className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          <Ban className="h-4 w-4 mr-1" />
                          Block
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}