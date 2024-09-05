// import React, { useState } from 'react'
// import { useSprings, animated, to as interpolate } from '@react-spring/web'
// import { useDrag } from '@use-gesture/react'
// import Card from './card';

// // const cardsData = [
// //   {
// //     image: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
// //     title: 'Strength',
// //     description: 'A card symbolizing courage and resilience.',
// //   },
// //   {
// //     image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
// //     title: 'The Tower',
// //     description: 'A card of sudden change and upheaval.',
// //   },
// //   // Add more cards with image, title, and description
// // ]

// const to = (i) => ({
//   x: 0,
//   y: i * -4,
//   scale: 1,
//   rot: -10 + Math.random() * 20,
//   delay: i * 100,
// })
// const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// const trans = (r, s) =>
//   `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

// function Deck({cardsData}) {
//   const [gone] = useState(() => new Set())
//   const [props, api] = useSprings(cardsData.length, i => ({
//     ...to(i),
//     from: from(i),
//   }))
  
//   const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
//     const trigger = velocity > 0.2
//     const dir = xDir < 0 ? -1 : 1
//     if (!down && trigger) gone.add(index)
//     api.start(i => {
//       if (index !== i) return
//       const isGone = gone.has(index)
//       const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
//       const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0)
//       const scale = down ? 1.1 : 1
//       return {
//         x,
//         rot,
//         scale,
//         delay: undefined,
//         config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
//       }
//     })
//     if (!down && gone.size === cardsData.length)
//       setTimeout(() => {
//         gone.clear()
//         api.start(i => to(i))
//       }, 600)
//   })

//   return props.map(({ x, y, rot, scale }, i) => (
//     <Card
//         key={i}
//         i={i}
//         x={x}
//         y={y}
//         rot={rot}
//         scale={scale}
//         trans={trans}
//         data={cardsData}
//         bind={bind}
//     />
//     ));
// }

// export default Deck
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Card from './card';

export default function Deck({ cardsData }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = () => {
    if (currentIndex < cardsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: 300,
        height: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {cardsData.slice(currentIndex).map((card, index) => (
        <Card
          key={currentIndex + index}
          cardData={card}
          onSwipe={handleSwipe}
          sx={{
            zIndex: cardsData.length - index,
            top: index * 2,
            left: index * 2,
          }}
        />
      ))}
    </Box>
  );
}

