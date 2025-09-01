import { TrendingUp, AlertCircle, CheckCircle, XCircle, Clock, Activity } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'red' | 'orange' | 'purple';
  tooltip?: string;
}

function MetricCard({ title, value, icon: Icon, color, tooltip }: MetricCardProps) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    green: 'text-green-600 bg-green-50 border-green-200',
    red: 'text-red-600 bg-red-50 border-red-200',
    orange: 'text-orange-600 bg-orange-50 border-orange-200',
    purple: 'text-purple-600 bg-purple-50 border-purple-200',
  };

  const content = (
    <Card className={`hover:shadow-md transition-shadow cursor-pointer ${colorClasses[color]} border`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <Icon className={`h-8 w-8 ${colorClasses[color].split(' ')[0]}`} />
        </div>
      </CardContent>
    </Card>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}

export function MetricsPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Live Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Precision@K"
          value="92.5%"
          icon={TrendingUp}
          color="blue"
          tooltip="Model precision at top K fraud predictions"
        />
        <MetricCard
          title="Alert Volume"
          value="0.5%"
          icon={AlertCircle}
          color="orange"
          tooltip="Percentage of transactions flagged as fraudulent"
        />
        <MetricCard
          title="True Positives"
          value="12"
          icon={CheckCircle}
          color="green"
          tooltip="Correctly identified fraud cases in the last hour"
        />
        <MetricCard
          title="False Positives"
          value="1"
          icon={XCircle}
          color="red"
          tooltip="Incorrectly flagged legitimate transactions in the last hour"
        />
        <MetricCard
          title="Model Latency"
          value="120ms"
          icon={Clock}
          color="purple"
          tooltip="Average model inference time"
        />
        <div className="space-y-2">
          <MetricCard
            title="Drift Status"
            value=""
            icon={Activity}
            color="green"
          />
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
            No drift detected
          </Badge>
        </div>
      </div>
    </div>
  );
}