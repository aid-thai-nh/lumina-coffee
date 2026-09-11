import React from 'react';

interface FlagProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

const sizeClasses = {
  xs: 'w-4 h-3',
  sm: 'w-5 h-3.5',
  md: 'w-6 h-4',
  lg: 'w-7 h-5',
};

/**
 * SVG Flag of Vietnam (Cờ Đỏ Sao Vàng)
 * Proportions 3:2, accurate 5-point star geometry
 */
export const VietnamFlag: React.FC<FlagProps> = ({
  className = '',
  size = 'sm',
  rounded = true,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 20"
      className={`inline-block flex-shrink-0 shadow-xs border border-black/10 ${rounded ? 'rounded-[2px]' : ''} ${sizeClasses[size]} ${className}`}
      aria-label="Cờ Việt Nam"
      role="img"
    >
      {/* Red Background */}
      <rect width="30" height="20" fill="#da251d" />
      {/* 5-pointed Yellow Star */}
      <polygon
        fill="#ffff00"
        points="
          15,4 
          16.54,8.76 
          21.54,8.76 
          17.49,11.71 
          19.04,16.47 
          15,13.53 
          10.96,16.47 
          12.51,11.71 
          8.46,8.76 
          13.46,8.76
        "
      />
    </svg>
  );
};

/**
 * SVG Flag of United Kingdom (Union Jack)
 * Proportions 3:2 with St George, St Andrew, and St Patrick crosses
 */
export const UKFlag: React.FC<FlagProps> = ({
  className = '',
  size = 'sm',
  rounded = true,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 40"
      className={`inline-block flex-shrink-0 shadow-xs border border-black/10 ${rounded ? 'rounded-[2px]' : ''} ${sizeClasses[size]} ${className}`}
      aria-label="United Kingdom Flag"
      role="img"
    >
      <clipPath id="uk-clip">
        <rect width="60" height="40" rx={rounded ? 1.5 : 0} />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        {/* Blue background */}
        <rect width="60" height="40" fill="#012169" />
        
        {/* White saltire (St Andrew) */}
        <line x1="0" y1="0" x2="60" y2="40" stroke="#ffffff" strokeWidth="8" />
        <line x1="60" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="8" />
        
        {/* Red saltire (St Patrick) */}
        <line x1="0" y1="0" x2="30" y2="20" stroke="#c8102e" strokeWidth="2.7" strokeDasharray="30" strokeDashoffset="-3" />
        <line x1="60" y1="40" x2="30" y2="20" stroke="#c8102e" strokeWidth="2.7" strokeDasharray="30" strokeDashoffset="-3" />
        <line x1="60" y1="0" x2="30" y2="20" stroke="#c8102e" strokeWidth="2.7" strokeDasharray="30" strokeDashoffset="-3" />
        <line x1="0" y1="40" x2="30" y2="20" stroke="#c8102e" strokeWidth="2.7" strokeDasharray="30" strokeDashoffset="-3" />

        {/* White cross (St George broad outline) */}
        <rect x="25" y="0" width="10" height="40" fill="#ffffff" />
        <rect x="0" y="15" width="60" height="10" fill="#ffffff" />

        {/* Red cross (St George) */}
        <rect x="27" y="0" width="6" height="40" fill="#c8102e" />
        <rect x="0" y="17" width="60" height="6" fill="#c8102e" />
      </g>
    </svg>
  );
};

export interface FlagIconProps extends FlagProps {
  country: 'vi' | 'en';
}

export const FlagIcon: React.FC<FlagIconProps> = ({ country, ...props }) => {
  if (country === 'vi') {
    return <VietnamFlag {...props} />;
  }
  return <UKFlag {...props} />;
};
