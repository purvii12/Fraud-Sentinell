import { User, Shield } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

export function Header() {
  return (
    <header className="h-[70px] bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-8 relative z-10">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Fraud Sentinel</h1>
            <p className="text-xs text-gray-600">मध्य प्रदेश पुलिस विभाग</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 text-center">
        <h2 className="text-lg text-gray-700">Real-Time Fraud Detection Dashboard</h2>
        <p className="text-sm text-gray-500">Madhya Pradesh State Police</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">Officer Dashboard</p>
          <p className="text-xs text-gray-600">MP Police Cyber Cell</p>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}