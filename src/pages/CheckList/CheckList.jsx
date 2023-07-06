import React, { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";

import checkListStyles from "./checkListStyles.module.css";

const cards = [
  "Q. 우리 집에서 키우는 다른 동물과 잘 어울릴 수 있을지 고민해보셨나요?",
  "Q. 입양으로 인한 경제적 부담을 짊어질 의사와 능력이 있으신가요?",
  "Q. 아플 땐 적절한 치료를 해주고, 중성화수술을 실천할 생각이신가요?",
  "Q. 항상 내 동물을 위해 공부할 각오가 되어 있나요?",
  "Q. 모든 가족과의 합의는 되어 있나요?",
  "Q. 결혼, 임신, 유학, 이사 등으로 가정환경이 바뀌어도 끝까지 책임지고 보살필 수 있나요?",
  "Q. 반려동물을 맞이할 환경적 준비, 마음의 각오는 되어 있으신가요?",
  "유기동물 입양 전, CHECKLIST !",
];

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

const CheckList = () => {
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);
      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
    }
  );
  
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={checkListStyles.deck} key={i} style={{ x, y }}>
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
            }}
          >
            {cards[i]}
          </animated.div>
        </animated.div>
      ))}
    </>
  );
}

export default CheckList;
