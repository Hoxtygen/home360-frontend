import * as d3 from "d3";
import { ListingViewStatMonthlyGroupingItem } from "features/listings/types";

interface DrawChartOptions {
  svgRef: React.RefObject<SVGSVGElement>;
  data: ListingViewStatMonthlyGroupingItem[];
  title: string;
  margin?: { top: number; bottom: number; right: number; left: number };
  // eslint-disable-next-line unused-imports/no-unused-vars
  formatter?: (value: number) => string;
}

export const drawListingViewsChart = ({
  svgRef,
  data,
  title,
  formatter = (value) => value.toString(),
}: DrawChartOptions) => {
  if (!svgRef.current) return;

  const svg = d3.select(svgRef.current);
  const container = svgRef.current.parentElement;
  const margin = { top: 50, right: 30, bottom: 50, left: 60 };

  if (!container) return;

  // Get container dimensions
  const { width: containerWidth } = container.getBoundingClientRect();
  const width = containerWidth;
  const height = 400;

  // Set up the viewBox for responsiveness
  svg
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  // Clear existing content
  svg.selectAll("*").remove();

  // Scales
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([margin.left, width - margin.right])
    .padding(0.2);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.views) || 0])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // Append axes
  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg.append("g").attr("transform", `translate(${margin.left}, 0)`).call(yAxis);

  // Tooltip
  const tooltip = d3
    .select(svgRef.current.parentElement) // Append to parent container
    .append("div")
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "1px solid #ccc")
    .style("border-radius", "4px")
    .style("padding", "8px")
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .style("opacity", 0);

  // Bars
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.name) || 0)
    .attr("y", (d) => yScale(d.views))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - margin.bottom - yScale(d.views))
    .attr("fill", "steelblue")
    .on("mouseover", (event, d) => {
      tooltip
        .style("opacity", 1)
        .html(`<strong>${d.name}</strong><br/>Value: ${formatter(d.views)}`)
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 30}px`);
    })
    .on("mousemove", (event) => {
      tooltip
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 30}px`);
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });

  // Title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text(title);
};
