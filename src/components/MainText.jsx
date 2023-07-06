import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrail, a } from "@react-spring/web";
import styles from "./styles.module.css";

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const Trail = useTrail(items.length, {
    config: { mass: 5, tension: 1000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <div>
      {Trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

const MainText = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const onMoveToCheckList = () => {
    setOpen((state) => !state);
    navigate("/checklist");
  };

  return (
    <div className={styles.container} onClick={onMoveToCheckList}>
      <Trail open={open}>
        <span>PET BRIDGE</span>
        <span>따뜻하게 안아주세요</span>
        <span>손을 잡아주세요</span>
        <span>함께해주세요</span>
      </Trail>
    </div>
  );
};

export default MainText;
