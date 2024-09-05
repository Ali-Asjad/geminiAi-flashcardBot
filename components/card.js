// import React from 'react';
// import { animated, to } from '@react-spring/web';

// function Card({ i, x, y, rot, scale, trans, data, bind }) {
//     const {title, description} = data[i];
//     return (
//         <animated.div key={i} style={{transform: to([x, y], (x, y) => `translate3d(${x}px, ${y}px,0)`)}}>
//         <animated.div {...bind(i)} style={{ transform: to([rot, scale], trans) }}>
//             <div className='card'>
//                 <h3>{title}</h3>
//                 <p>{description}</p>
//             </div>
//         </animated.div>
//         </animated.div>
//     )
// }

// export default Card

import React, { useState } from 'react';
import { Card as MUICard, CardContent, Typography, Box } from '@mui/material';

export default function Card({ cardData, onSwipe }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      setCurrentX(e.touches[0].clientX - startX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(currentX) > 100) {
      onSwipe(); // Trigger the swipe action if the swipe is significant
    }
    setCurrentX(0);
  };

  return (
    <MUICard
      variant="outlined"
      sx={{
        width: 300,
        textAlign: 'center',
        mb: 2,
        position: 'absolute',
        transform: `translateX(${currentX}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
        zIndex: 1,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <CardContent>
        <Typography variant="h5" onClick={handleFlip}>
          {showAnswer ? cardData.description : cardData.title}
        </Typography>
      </CardContent>
    </MUICard>
  );
}

