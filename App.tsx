import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ManualInput } from './components/ManualInput';
import { AlertsPage } from './components/AlertsPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { SettingsPage } from './components/SettingsPage';

export type NavigationSection = 'dashboard' | 'alerts' | 'analytics' | 'settings';
export type InputMode = 'dashboard' | 'manual';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavigationSection>('dashboard');
  const [activeMode, setActiveMode] = useState<InputMode>('dashboard');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return activeMode === 'dashboard' ? <Dashboard /> : <ManualInput />;
      case 'alerts':
        return <AlertsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return activeMode === 'dashboard' ? <Dashboard /> : <ManualInput />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Header />
      <div className="flex">
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          activeMode={activeMode} 
          onModeChange={setActiveMode} 
        />
        <main className="flex-1 ml-[280px] p-8">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}