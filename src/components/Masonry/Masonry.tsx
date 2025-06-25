import React, { useState, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

interface MasonryItem {
  id: string | number;
  height: number;
  image: string;
  width?: number;
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

  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

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

  useEffect(() => {
    gridItems.forEach((item) => {
      const el = document.getElementById(`grid-item-${item.id}`);
      if (el) {
        gsap.to(el, {
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });
  }, [gridItems]);

  return (
    <>
      <div
        ref={ref}
        className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto text-left mt-24"
        style={{ height: Math.max(...heights) }}
      >
        {gridItems.map((item) => (
          <div
            key={item.id}
            id={`grid-item-${item.id}`}
            className="absolute p-[15px] opacity-0 cursor-pointer [will-change:transform,width,height,opacity]"
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative w-full h-full overflow-hidden rounded-[4px] shadow-lg">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition duration-200 ease-in-out hover:brightness-110"
              />
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}

function Modal({
  item,
  onClose,
}: {
  item: MasonryItem;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current && modalRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }

    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(modalRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-900 text-white p-6 rounded-lg w-[800px] h-[600px] overflow-hidden relative flex flex-col"
      >
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={handleClose}
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
          <p>{item.description}</p>
          {item.links && (
            <div className="flex justify-center mt-4 gap-3">
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
      </div>
    </div>
  );
}

export default Masonry;
