import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle, RotateCcw, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

interface PredictionResult {
  isFraud: boolean;
  probability: number;
  riskFactors: Array<{
    factor: string;
    impact: number;
    description: string;
  }>;
}

export function ManualInput() {
  const [formData, setFormData] = useState({
    amount: [50000],
    time: '',
    merchantCategory: '',
    deviceType: '',
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const merchantCategories = [
    { value: 'retail', label: 'Retail/Fashion', icon: '🛍️' },
    { value: 'food', label: 'Food & Dining', icon: '🍽️' },
    { value: 'electronics', label: 'Electronics', icon: '📱' },
    { value: 'luxury', label: 'Luxury Goods', icon: '💎' },
    { value: 'grocery', label: 'Grocery/Kirana', icon: '🛒' },
    { value: 'travel', label: 'Travel/Transport', icon: '✈️' },
    { value: 'gold', label: 'Gold/Jewellery', icon: '🏆' },
    { value: 'fuel', label: 'Petrol/Fuel', icon: '⛽' },
  ];

  const deviceTypes = [
    { value: 'mobile', label: 'Mobile' },
    { value: 'web', label: 'Web Browser' },
    { value: 'pos', label: 'Point of Sale' },
  ];

  const hours = Array.from({ length: 24 }, (_, i) => ({
    value: i.toString(),
    label: `${i.toString().padStart(2, '0')}:00`,
  }));

  const handlePredict = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock prediction logic
    const amount = formData.amount[0];
    const time = parseInt(formData.time) || 12;
    let fraudScore = 0;
    
    // Risk factors based on input
    const riskFactors = [];
    
    if (amount > 100000) {
      fraudScore += 30;
      riskFactors.push({
        factor: 'High Transaction Amount',
        impact: 25,
        description: 'Transaction amount exceeds typical spending pattern for Indian market'
      });
    }
    
    if (time < 6 || time > 22) {
      fraudScore += 20;
      riskFactors.push({
        factor: 'Unusual Transaction Time',
        impact: 15,
        description: 'Transaction occurred outside normal business hours'
      });
    }
    
    if (formData.merchantCategory === 'luxury') {
      fraudScore += 25;
      riskFactors.push({
        factor: 'High-Risk Merchant Category',
        impact: 20,
        description: 'Luxury goods are commonly targeted by fraudsters'
      });
    }
    
    if (formData.deviceType === 'mobile') {
      fraudScore += 15;
      riskFactors.push({
        factor: 'Mobile Device Transaction',
        impact: 10,
        description: 'Mobile transactions have higher fraud rates'
      });
    }

    // Add some random variation
    fraudScore += Math.random() * 20 - 10;
    fraudScore = Math.max(0, Math.min(100, fraudScore));
    
    if (riskFactors.length === 0) {
      riskFactors.push({
        factor: 'Normal Transaction Pattern',
        impact: -10,
        description: 'Transaction matches typical user behavior'
      });
    }

    const result: PredictionResult = {
      isFraud: fraudScore > 50,
      probability: Math.round(fraudScore),
      riskFactors
    };
    
    setPrediction(result);
    setIsLoading(false);
  };

  const handleReset = () => {
    setFormData({
      amount: [50000],
      time: '',
      merchantCategory: '',
      deviceType: '',
    });
    setPrediction(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Manual Fraud Detection</h2>
        <p className="text-gray-600">Enter transaction details to test the fraud detection model</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount */}
            <div className="space-y-3">
              <Label htmlFor="amount">Transaction Amount (₹)</Label>
              <div className="space-y-2">
                <Slider
                  value={formData.amount}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}
                  max={500000}
                  min={0}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">₹0</span>
                  <Input
                    type="number"
                    value={formData.amount[0]}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: [parseInt(e.target.value) || 0] }))}
                    className="w-24 text-center"
                    min={0}
                    max={500000}
                  />
                  <span className="text-sm text-gray-500">₹5,00,000</span>
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="time">Transaction Time (Hour)</Label>
              <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hour (0-23)" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((hour) => (
                    <SelectItem key={hour.value} value={hour.value}>
                      {hour.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Merchant Category */}
            <div className="space-y-2">
              <Label htmlFor="merchant">Merchant Category</Label>
              <Select value={formData.merchantCategory} onValueChange={(value) => setFormData(prev => ({ ...prev, merchantCategory: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select merchant category" />
                </SelectTrigger>
                <SelectContent>
                  {merchantCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <span className="flex items-center space-x-2">
                        <span>{category.icon}</span>
                        <span>{category.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Device Type */}
            <div className="space-y-2">
              <Label htmlFor="device">Device Type</Label>
              <Select value={formData.deviceType} onValueChange={(value) => setFormData(prev => ({ ...prev, deviceType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  {deviceTypes.map((device) => (
                    <SelectItem key={device.value} value={device.value}>
                      {device.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button 
                onClick={handlePredict}
                disabled={isLoading || !formData.merchantCategory || !formData.deviceType || !formData.time}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Predict Fraud Risk
                  </>
                )}
              </Button>
              
              <Button variant="outline" onClick={handleReset} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Form
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Prediction Result */}
        <div className="space-y-4">
          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className={`${
                prediction.isFraud 
                  ? 'bg-red-50 border-red-200 shadow-red-100' 
                  : 'bg-green-50 border-green-200 shadow-green-100'
              } shadow-lg`}>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {prediction.isFraud ? (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.6, repeat: 2 }}
                        className="p-4 bg-red-100 rounded-full"
                      >
                        <AlertTriangle className="h-12 w-12 text-red-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.6, repeat: 2 }}
                        className="p-4 bg-green-100 rounded-full"
                      >
                        <CheckCircle className="h-12 w-12 text-green-600" />
                      </motion.div>
                    )}
                  </div>
                  <CardTitle className={`text-2xl ${
                    prediction.isFraud ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {prediction.isFraud ? 'Fraud Detected!' : 'Safe Transaction'}
                  </CardTitle>
                  <div className="text-lg mt-2">
                    <span className="text-gray-600">Risk Score: </span>
                    <span className={`font-bold ${
                      prediction.isFraud ? 'text-red-700' : 'text-green-700'
                    }`}>
                      {prediction.probability}%
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Risk Gauge */}
                    <div className="flex justify-center">
                      <div className="relative w-32 h-16 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-t-full"></div>
                        <div className="absolute inset-2 bg-white rounded-t-full"></div>
                        <div 
                          className="absolute bottom-0 left-1/2 w-1 h-16 bg-gray-800 origin-bottom transform -translate-x-0.5"
                          style={{ 
                            transform: `translate(-50%, 0) rotate(${(prediction.probability / 100) * 180 - 90}deg)` 
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Risk Factors */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Risk Factors</h4>
                      <div className="space-y-2">
                        {prediction.riskFactors.map((factor, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              factor.impact > 0 ? 'bg-red-500' : 'bg-green-500'
                            }`}></div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{factor.factor}</div>
                              <div className="text-sm text-gray-600">{factor.description}</div>
                            </div>
                            <div className={`text-sm font-medium ${
                              factor.impact > 0 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {factor.impact > 0 ? '+' : ''}{factor.impact}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {!prediction && (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Zap className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-500">
                  Fill out the transaction details and click "Predict Fraud Risk" to see the results
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}