import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='relative'
    >
      {children}
      {isHovered && (
        <div
          style={{
            whiteSpace:'nowrap',
            fontFamily:'Montserrat',
            fontSize:'8px',
            position: 'absolute',
            backgroundColor: 'rgb(0,0,0, 0.4)',
            color: 'white',
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop:'4px',
            paddingBottom:'4px',
            borderRadius: '4px',
            zIndex: 999,
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
