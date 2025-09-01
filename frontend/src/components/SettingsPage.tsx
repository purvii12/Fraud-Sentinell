import { useState } from 'react';
import { Settings, Bell, Shield, Database, User, Save, RefreshCw, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';

interface ModelSettings {
  fraudThreshold: number[];
  alertThreshold: number[];
  autoBlock: boolean;
  modelVersion: string;
  retrainFrequency: string;
  maxTransactionAmount: number[];
}

interface NotificationSettings {
  emailAlerts: boolean;
  smsAlerts: boolean;
  slackIntegration: boolean;
  highRiskNotifications: boolean;
  dailyReports: boolean;
  weeklyReports: boolean;
}

interface UserSettings {
  defaultView: string;
  timezone: string;
  dateFormat: string;
  language: string;
  sessionTimeout: string;
}

export function SettingsPage() {
  const [modelSettings, setModelSettings] = useState<ModelSettings>({
    fraudThreshold: [70],
    alertThreshold: [50],
    autoBlock: false,
    modelVersion: 'v2.1.3',
    retrainFrequency: 'weekly',
    maxTransactionAmount: [1000000]
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailAlerts: true,
    smsAlerts: false,
    slackIntegration: true,
    highRiskNotifications: true,
    dailyReports: true,
    weeklyReports: false
  });

  const [userSettings, setUserSettings] = useState<UserSettings>({
    defaultView: 'dashboard',
    timezone: 'UTC-8',
    dateFormat: 'MM/DD/YYYY',
    language: 'english',
    sessionTimeout: '30'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleModelRetrain = async () => {
    // Simulate model retraining
    console.log('Initiating model retrain...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure fraud detection system parameters</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleModelRetrain}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retrain Model
          </Button>
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="model" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="model" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Model Settings</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="user" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>User Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>System</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="model" className="space-y-6">
          {/* Fraud Detection Thresholds */}
          <Card>
            <CardHeader>
              <CardTitle>Detection Thresholds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="fraud-threshold">Fraud Detection Threshold</Label>
                <div className="space-y-2">
                  <Slider
                    value={modelSettings.fraudThreshold}
                    onValueChange={(value) => setModelSettings(prev => ({ ...prev, fraudThreshold: value }))}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Conservative (0%)</span>
                    <span className="font-medium text-gray-900">{modelSettings.fraudThreshold[0]}%</span>
                    <span>Aggressive (100%)</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Transactions above this threshold will be flagged as potential fraud
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="alert-threshold">Alert Threshold</Label>
                <div className="space-y-2">
                  <Slider
                    value={modelSettings.alertThreshold}
                    onValueChange={(value) => setModelSettings(prev => ({ ...prev, alertThreshold: value }))}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Low (0%)</span>
                    <span className="font-medium text-gray-900">{modelSettings.alertThreshold[0]}%</span>
                    <span>High (100%)</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Transactions above this threshold will generate alerts for review
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="max-amount">Maximum Transaction Amount ($)</Label>
                <div className="space-y-2">
                  <Slider
                    value={modelSettings.maxTransactionAmount}
                    onValueChange={(value) => setModelSettings(prev => ({ ...prev, maxTransactionAmount: value }))}
                    max={50000}
                    min={1000}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>$1,000</span>
                    <span className="font-medium text-gray-900">${modelSettings.maxTransactionAmount[0].toLocaleString()}</span>
                    <span>$50,000</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Transactions above this amount require additional scrutiny
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Model Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-block Suspicious Transactions</Label>
                  <p className="text-sm text-gray-600">
                    Automatically block transactions that exceed the fraud threshold
                  </p>
                </div>
                <Switch
                  checked={modelSettings.autoBlock}
                  onCheckedChange={(checked) => setModelSettings(prev => ({ ...prev, autoBlock: checked }))}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label htmlFor="model-version">Current Model Version</Label>
                <Select value={modelSettings.modelVersion} onValueChange={(value) => setModelSettings(prev => ({ ...prev, modelVersion: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v2.1.3">v2.1.3 (Current)</SelectItem>
                    <SelectItem value="v2.1.2">v2.1.2</SelectItem>
                    <SelectItem value="v2.1.1">v2.1.1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="retrain-frequency">Model Retrain Frequency</Label>
                <Select value={modelSettings.retrainFrequency} onValueChange={(value) => setModelSettings(prev => ({ ...prev, retrainFrequency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="manual">Manual Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Alerts</Label>
                  <p className="text-sm text-gray-600">Receive fraud alerts via email</p>
                </div>
                <Switch
                  checked={notificationSettings.emailAlerts}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailAlerts: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Alerts</Label>
                  <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                </div>
                <Switch
                  checked={notificationSettings.smsAlerts}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsAlerts: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Slack Integration</Label>
                  <p className="text-sm text-gray-600">Send alerts to Slack channels</p>
                </div>
                <Switch
                  checked={notificationSettings.slackIntegration}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, slackIntegration: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>High-Risk Notifications</Label>
                  <p className="text-sm text-gray-600">Immediate alerts for high-risk transactions</p>
                </div>
                <Switch
                  checked={notificationSettings.highRiskNotifications}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, highRiskNotifications: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Daily Reports</Label>
                  <p className="text-sm text-gray-600">Receive daily fraud detection summaries</p>
                </div>
                <Switch
                  checked={notificationSettings.dailyReports}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, dailyReports: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-gray-600">Receive weekly analytics reports</p>
                </div>
                <Switch
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, weeklyReports: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="default-view">Default View</Label>
                <Select value={userSettings.defaultView} onValueChange={(value) => setUserSettings(prev => ({ ...prev, defaultView: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="alerts">Alerts</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={userSettings.timezone} onValueChange={(value) => setUserSettings(prev => ({ ...prev, timezone: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="UTC+0">UTC</SelectItem>
                    <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="date-format">Date Format</Label>
                <Select value={userSettings.dateFormat} onValueChange={(value) => setUserSettings(prev => ({ ...prev, dateFormat: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="language">Language</Label>
                <Select value={userSettings.language} onValueChange={(value) => setUserSettings(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Español</SelectItem>
                    <SelectItem value="french">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  type="number"
                  value={userSettings.sessionTimeout}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                  min="15"
                  max="480"
                />
                <p className="text-sm text-gray-600">
                  Automatically log out after this period of inactivity
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>System Version</Label>
                  <p className="text-sm text-gray-600">Fraud Sentinel v3.2.1</p>
                </div>
                <div>
                  <Label>Last Updated</Label>
                  <p className="text-sm text-gray-600">2024-08-28 14:32 UTC</p>
                </div>
                <div>
                  <Label>Database Status</Label>
                  <p className="text-sm text-green-600">✓ Connected</p>
                </div>
                <div>
                  <Label>Model Status</Label>
                  <p className="text-sm text-green-600">✓ Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">CPU Usage</span>
                  <span className="text-sm text-gray-600">23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Memory Usage</span>
                  <span className="text-sm text-gray-600">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Disk Usage</span>
                  <span className="text-sm text-gray-600">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backup & Recovery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Last Backup</Label>
                  <p className="text-sm text-gray-600">2024-09-01 02:00 UTC</p>
                </div>
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Create Backup
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Backup Frequency</Label>
                  <p className="text-sm text-gray-600">Daily at 02:00 UTC</p>
                </div>
                <Button variant="outline">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}