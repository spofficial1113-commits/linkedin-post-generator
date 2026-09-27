import React from 'react';
import { X, Bell, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'Trending at Moscone Center',
      desc: '#FutureOfAI Summit posts reached over 890,000 impressions on LinkedIn.',
      time: '12m ago',
      icon: TrendingUp,
      color: 'text-[#4d41df] bg-[#e3dfff]/60',
      unread: true
    },
    {
      id: 2,
      title: 'Dr. Elias Vance Keynote Concluded',
      desc: 'High-impact takeaway quotes from Hall A keynote are now available in your studio suggestions.',
      time: '35m ago',
      icon: Sparkles,
      color: 'text-[#8455ef] bg-[#e9ddff]/60',
      unread: true
    },
    {
      id: 3,
      title: 'Acme Technologies Host Sync',
      desc: 'Official summit hashtags (#AI, #Innovation, #FutureOfWork) auto-verified by the organizers.',
      time: '1h ago',
      icon: CheckCircle2,
      color: 'text-[#006b2d] bg-[#f7fff3]',
      unread: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#e3e2e7] relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#efedf3]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#e3dfff] text-[#4d41df] rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#1a1b1f]">Summit Live Telemetry</h3>
              <p className="text-xs text-[#777587]">Live feed from EventPulse broadcast engine</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#777587] hover:text-[#1a1b1f] hover:bg-[#efedf3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mt-4 max-h-80 overflow-y-auto pr-1">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className={`p-3.5 rounded-2xl border transition-all ${
                  item.unread ? 'bg-[#f4f3f8]/70 border-[#e3e2e7]' : 'bg-white border-[#f4f3f8]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl shrink-0 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#1a1b1f]">{item.title}</h4>
                      <span className="text-[10px] text-[#777587]">{item.time}</span>
                    </div>
                    <p className="text-xs text-[#464555] mt-1 leading-normal">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-3 border-t border-[#efedf3] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-[#4d41df] hover:underline"
          >
            Dismiss All
          </button>
        </div>
      </div>
    </div>
  );
};
