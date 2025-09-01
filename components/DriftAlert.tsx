import { motion } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from './ui/button';

interface DriftAlertProps {
  onDismiss: () => void;
}

export function DriftAlert({ onDismiss }: DriftAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center justify-between"
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            <AlertTriangle className="h-5 w-5 text-orange-600" />
          </motion.div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-orange-800">
            Distribution Shift Detected!
          </h3>
          <p className="text-sm text-orange-700">
            Threshold auto-adjusted. Model performance may be affected.
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDismiss}
        className="text-orange-600 hover:text-orange-800 hover:bg-orange-100"
      >
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}