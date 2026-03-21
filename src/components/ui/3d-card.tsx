"use client";

import React, { createContext, useState, useContext, useRef, useEffect } from "react";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const cx = e.clientX;
    const cy = e.clientY;

    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (cx - left - width / 2) / 25;
      const y = (cy - top - height / 2) / 25;
      containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={`card-container ${containerClassName || ""}`}
        style={{ perspective: "1000px", display: "flex", justifyContent: "center" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`card-container-inner ${className || ""}`}
          style={{
            transition: isMouseEntered ? "" : "all 0.4s ease",
            transformStyle: "preserve-3d",
            width: "100%"
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`card-body ${className || ""}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateZ = 0,
  ...rest
}: {
  as?: any;
  children: React.ReactNode;
  className?: string;
  translateZ?: number | string;
  [key: string]: any;
} & React.HTMLAttributes<HTMLElement>) => {
  const ref = useRef<any>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateZ(${translateZ}px)`;
    } else {
      ref.current.style.transform = `translateZ(0px)`;
    }
  }, [isMouseEntered, translateZ]);

  return (
    <Tag
      ref={ref}
      className={`card-item ${className || ""}`}
      style={{
        transition: "all 0.4s ease",
        display: "inline-block" // To allow transform to take effect cleanly on inline elements like span/a
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
