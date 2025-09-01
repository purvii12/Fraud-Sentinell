import { useState } from 'react';
import { AlertTriangle, Search, Filter, Download, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface Alert {
  id: string;
  timestamp: string;
  transactionId: string;
  amount: number;
  merchant: string;
  fraudScore: number;
  status: 'pending' | 'approved' | 'blocked' | 'under_review';
  priority: 'high' | 'medium' | 'low';
  category: string;
  assignedTo?: string;
}

const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    timestamp: '2024-09-01 14:23:15',
    transactionId: 'TXN-001',
    amount: 2500.00,
    merchant: 'Luxury Electronics',
    fraudScore: 85,
    status: 'pending',
    priority: 'high',
    category: 'High Amount',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 'ALT-002',
    timestamp: '2024-09-01 14:15:32',
    transactionId: 'TXN-003',
    amount: 1200.00,
    merchant: 'Premium Fashion',
    fraudScore: 92,
    status: 'under_review',
    priority: 'high',
    category: 'Velocity Check'
  },
  {
    id: 'ALT-003',
    timestamp: '2024-09-01 14:08:45',
    transactionId: 'TXN-005',
    amount: 3200.00,
    merchant: 'Travel Agency',
    fraudScore: 78,
    status: 'approved',
    priority: 'medium',
    category: 'Cross-Border',
    assignedTo: 'Mike Chen'
  },
  {
    id: 'ALT-004',
    timestamp: '2024-09-01 13:45:12',
    transactionId: 'TXN-007',
    amount: 890.00,
    merchant: 'Online Marketplace',
    fraudScore: 67,
    status: 'blocked',
    priority: 'medium',
    category: 'Device Anomaly'
  },
  {
    id: 'ALT-005',
    timestamp: '2024-09-01 13:30:28',
    transactionId: 'TXN-009',
    amount: 450.00,
    merchant: 'Software Store',
    fraudScore: 55,
    status: 'pending',
    priority: 'low',
    category: 'Time Anomaly'
  }
];

function getStatusBadge(status: Alert['status']) {
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-800 border-green-300' },
    blocked: { label: 'Blocked', color: 'bg-red-100 text-red-800 border-red-300' },
    under_review: { label: 'Under Review', color: 'bg-blue-100 text-blue-800 border-blue-300' }
  };
  
  const config = statusConfig[status];
  return <Badge className={`${config.color} border`}>{config.label}</Badge>;
}

function getPriorityBadge(priority: Alert['priority']) {
  const priorityConfig = {
    high: { label: 'High', color: 'bg-red-100 text-red-800 border-red-300' },
    medium: { label: 'Medium', color: 'bg-orange-100 text-orange-800 border-orange-300' },
    low: { label: 'Low', color: 'bg-gray-100 text-gray-800 border-gray-300' }
  };
  
  const config = priorityConfig[priority];
  return <Badge className={`${config.color} border`}>{config.label}</Badge>;
}

export function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = alert.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || alert.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const alertStats = {
    total: mockAlerts.length,
    pending: mockAlerts.filter(a => a.status === 'pending').length,
    high_priority: mockAlerts.filter(a => a.priority === 'high').length,
    approved_today: mockAlerts.filter(a => a.status === 'approved').length,
    blocked_today: mockAlerts.filter(a => a.status === 'blocked').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fraud Alerts</h1>
          <p className="text-gray-600">Monitor and manage fraud detection alerts</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Total Alerts</p>
                <p className="text-xl font-bold text-gray-900">{alertStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold text-yellow-600">{alertStats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-xl font-bold text-red-600">{alertStats.high_priority}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Approved Today</p>
                <p className="text-xl font-bold text-green-600">{alertStats.approved_today}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Blocked Today</p>
                <p className="text-xl font-bold text-red-600">{alertStats.blocked_today}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search alerts, transactions, or merchants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Queue ({filteredAlerts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Alert ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Transaction</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Merchant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Fraud Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Assigned To</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-blue-600">{alert.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-mono text-sm">{alert.transactionId}</span>
                        <div className="text-xs text-gray-500">{alert.timestamp}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">
                        ${alert.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{alert.merchant}</div>
                        <div className="text-sm text-gray-500">{alert.category}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${
                            alert.fraudScore >= 80 ? 'text-red-600' : 
                            alert.fraudScore >= 60 ? 'text-orange-600' : 'text-yellow-600'
                          }`}>
                            {alert.fraudScore}%
                          </span>
                        </div>
                        <Progress value={alert.fraudScore} className="w-16 h-1" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getPriorityBadge(alert.priority)}
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(alert.status)}
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">
                        {alert.assignedTo || 'Unassigned'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}