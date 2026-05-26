import React from 'react';

interface UserAvatarProps {
  url?: string;
  borderId?: string;
  className?: string; // Additional classes for sizing
}

export default function UserAvatar({ url, borderId, className = "w-10 h-10" }: UserAvatarProps) {
  let borderClass = 'border-2 border-slate-700 shadow-sm'; // default
  
  if (borderId === 'border_neon') {
    borderClass = 'shadow-[0_0_15px_rgba(34,211,238,0.8)] border-2 border-cyan-400';
  } else if (borderId === 'border_gold') {
    borderClass = 'shadow-[0_0_15px_rgba(250,204,21,0.8)] border-2 border-yellow-400';
  }

  const defaultAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";

  return (
    <div className={`rounded-full overflow-hidden shrink-0 bg-slate-800 flex items-center justify-center transition-all ${borderClass} ${className}`}>
      <img 
        src={url || defaultAvatar} 
        alt="User Avatar" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
