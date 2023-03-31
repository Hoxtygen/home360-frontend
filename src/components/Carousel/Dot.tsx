import { mockData } from "src/constants";

interface DotProps {
  activeIndex: number;
  handleClick(index: number): void;
}

export default function Dot({ activeIndex, handleClick }: DotProps) {
  const data = mockData.slice(0, 10);

  return (
    <div className="all-dots p-3">
      {data.map((data, index) => (
        <span
          className={`${activeIndex === index ? "dot active-dot" : "dot"}`}
          key={data.id}
        ></span>
      ))}
    </div>
  );
}
