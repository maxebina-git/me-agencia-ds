import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

interface PhoneMockupProps {
  children: React.ReactNode;
  username?: string;
  caption?: string;
  likes?: number;
}

export function PhoneMockup({ 
  children, 
  username = 'maxebina', 
  caption = 'Transforme seu negócio com tecnologia e automação 🚀',
  likes = 247
}: PhoneMockupProps) {
  return (
    <div className="phone-mockup">
      <div className="phone-frame">
        <div className="phone-notch" />
        
        <div className="phone-screen">
          <div className="status-bar">
            <span className="status-time">9:41</span>
            <div className="status-icons">
              <div className="signal-bars" />
              <div className="wifi-icon" />
              <div className="battery-icon" />
            </div>
          </div>

          <div className="ig-header">
            <div className="ig-user-info">
              <div className="ig-avatar" />
              <span className="ig-username">{username}</span>
            </div>
            <MoreHorizontal className="w-5 h-5 text-white" />
          </div>

          <div className="ig-post-area">
            {children}
          </div>

          <div className="ig-actions">
            <div className="ig-actions-left">
              <Heart className="w-6 h-6 text-white" />
              <MessageCircle className="w-6 h-6 text-white" />
              <Send className="w-6 h-6 text-white" />
            </div>
            <Bookmark className="w-6 h-6 text-white" />
          </div>

          <div className="ig-likes">
            <span className="font-semibold">{likes.toLocaleString('pt-BR')} curtidas</span>
          </div>

          <div className="ig-caption">
            <span className="font-semibold">{username}</span>{' '}
            <span className="text-white/80">{caption}</span>
          </div>

          <div className="ig-comments-link">
            Ver todos os 42 comentários
          </div>

          <div className="ig-time">
            HÁ 2 HORAS
          </div>
        </div>
      </div>
    </div>
  );
}
