import { BarChart3, AlertTriangle, TrendingUp, Settings, Database, Edit3 } from 'lucide-react';
import { Button } from './ui/button';
import { NavigationSection, InputMode } from '../App';

interface SidebarProps {
  activeSection: NavigationSection;
  onSectionChange: (section: NavigationSection) => void;
  activeMode: InputMode;
  onModeChange: (mode: InputMode) => void;
}

export function Sidebar({ activeSection, onSectionChange, activeMode, onModeChange }: SidebarProps) {
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', key: 'dashboard' as NavigationSection },
    { icon: AlertTriangle, label: 'Alerts', key: 'alerts' as NavigationSection },
    { icon: TrendingUp, label: 'Analytics', key: 'analytics' as NavigationSection },
    { icon: Settings, label: 'Settings', key: 'settings' as NavigationSection },
  ];

  return (
    <aside className="fixed left-0 top-[70px] w-[280px] h-[calc(100vh-70px)] bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6">
        {/* Navigation Menu */}
        <nav className="space-y-2 mb-8">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onSectionChange(item.key)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === item.key
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Mode Toggle - Only show on dashboard */}
        {activeSection === 'dashboard' && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Mode</h3>
            <div className="bg-gray-100 p-1 rounded-lg">
              <Button
                variant={activeMode === 'dashboard' ? 'default' : 'ghost'}
                size="sm"
                className={`w-full justify-start transition-all ${
                  activeMode === 'dashboard' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => onModeChange('dashboard')}
              >
                <Database className="h-4 w-4 mr-2" />
                Dataset Demo
              </Button>
            </div>
            <div className="bg-gray-100 p-1 rounded-lg">
              <Button
                variant={activeMode === 'manual' ? 'default' : 'ghost'}
                size="sm"
                className={`w-full justify-start transition-all ${
                  activeMode === 'manual' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => onModeChange('manual')}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Manual Input
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}