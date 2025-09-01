import { useState } from 'react';
import { MetricsPanel } from './MetricsPanel';
import { AlertsTable } from './AlertsTable';
import { TransactionDetail } from './TransactionDetail';
import { ChartsSection } from './ChartsSection';
import { DriftAlert } from './DriftAlert';

export interface Transaction {
  id: string;
  amount: number;
  time: string;
  merchant: string;
  merchantCategory: string;
  deviceType: string;
  fraudScore: number;
  reasons: string[];
}

export function Dashboard() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDriftAlert, setShowDriftAlert] = useState(true);

  return (
    <div className="space-y-8">
      {/* Drift Alert */}
      {showDriftAlert && (
        <DriftAlert onDismiss={() => setShowDriftAlert(false)} />
      )}
      
      {/* Live Metrics Panel */}
      <MetricsPanel />
      
      {/* Fraud Alerts Table */}
      <AlertsTable onTransactionSelect={setSelectedTransaction} />
      
      {/* Charts and Visualizations */}
      <ChartsSection />
      
      {/* Transaction Detail Panel */}
      {selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}