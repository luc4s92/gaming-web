import { useRef, useState } from "react";

const BentoTilt = ({ children, className = "" }) => {
  const [transfornmStyle, setTransfornmStyle] = useState(" ");

  const itemRef = useRef();
  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransfornmStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransfornmStyle(" ");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transfornmStyle }}
    >
      {children}
    </div>
  );
};

export default BentoTilt;
