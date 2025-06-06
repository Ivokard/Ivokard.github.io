import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTransition, a, useSpring } from "@react-spring/web";

interface MasonryItem {
  id: string | number;
  height: number;
  image: string;
  width?: number; // Optional, can be used for aspect ratio
  title?: string;
  description?: string;
  links?: { icon: React.ReactNode; url: string }[];
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MasonryProps {
  data: MasonryItem[];
}

function Masonry({ data }: MasonryProps) {
  const [columns, setColumns] = useState<number>(2);
  const [selectedItem, setSelectedItem] = useState<MasonryItem | null>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia("(min-width: 1500px)").matches) setColumns(2);
      else if (window.matchMedia("(min-width: 1000px)").matches) setColumns(2);
      else if (window.matchMedia("(min-width: 600px)").matches) setColumns(2);
      else setColumns(1);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) setWidth(ref.current.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [heights, gridItems] = useMemo<[number[], GridItem[]]>(() => {
    const heights = new Array(columns).fill(0);
    const gridItems = data.map((child) => {
      const column = heights.indexOf(Math.min(...heights));

      const x = (width / columns) * column;
      const y = (heights[column] += child.height / 2) - child.height / 2;
      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: child.height / 2,
      };
    });
    return [heights, gridItems];
  }, [columns, data, width]);

  const transitions = useTransition(gridItems, {
    keys: (item) => item.id,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  const modalTransition = useTransition(selectedItem, {
    from: { opacity: 0, transform: "scale(0.95)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.95)" },
    config: { tension: 300, friction: 30 },
  });

  return (
    <>
      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto text-left mt-24"
        style={{ height: Math.max(...heights) }}
      >
        {transitions((style, item) => (
          <a.div
            key={item.id}
            style={style}
            className="absolute p-[15px] [will-change:transform,width,height,opacity] cursor-pointer"
            onClick={() => setSelectedItem(item)} 
          >
            <div className="relative w-full h-full overflow-hidden rounded-[4px] shadow-lg">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition duration-200 ease-in-out hover:brightness-110 hover:scale"
              />
            </div>
          </a.div>
        ))}
      </div>

      {modalTransition(
        (style, item) =>
          item && (
            <div
              className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setSelectedItem(null)}
            >
              <a.div
                style={style}
                className="bg-black p-6 rounded-lg w-[800px] h-[600px] overflow-hidden relative flex flex-col z-50 text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-white text-2xl"
                  onClick={() => {
                    requestAnimationFrame(() => setSelectedItem(null));
                  }}
                >
                  ✕
                </button>
                <div className="flex-1 overflow-auto space-y-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[300px] object-cover rounded"
                  />
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-shadow-stone-400">{item.description}</p>
                  {item.links && item.links?.length > 0 && (
                    <div className="flex justify-center mt-4">
                      {item.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-black p-3 rounded-full hover:bg-gray-300 transition"
                        >
                          {link.icon}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </a.div>
            </div>
          )
      )}
    </>
  );
}

export default Masonry;
