import { useState, useEffect } from "react";
import rawData from "@/data/data.json";
import { prepareData } from "@/utils/prepareData";
import CustomTooltip from "@/components/ToolTip";
import { ChartControls } from "@/components/ChartControls";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";
import { ALL_LINES } from "@/constants/Variations";
import { COLORS } from "@/constants/Colors";
import { useExportPng } from "@/hooks/useExportPng";

export type Option = { value: string; label: string };

export default function Chart() {
  const data = prepareData(rawData);
  const {ref, handleExport} = useExportPng();
  const [view, setView] = useState<"day" | "week">("day");
  const filteredData =
    view === "day"
      ? data
      : data.filter((_: any, index: number) => index % 6 === 0);

  const [selectedLines, setSelectedLines] = useState<Option[]>([
    { value: "All", label: "All variations selected" },
  ]);
  const [lineStyle, setLineStyle] = useState<string>("line");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const colors = COLORS(theme);

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "light" ? "#fff" : "#000027";
  }, [theme]);

  return (
    <div style={{ padding: "2%" }}>
      <ChartControls
        selectedLines={selectedLines}
        setSelectedLines={setSelectedLines}
        view={view}
        setView={setView}
        lineStyle={lineStyle}
        setLineStyle={setLineStyle}
        setTheme={setTheme}
        handleExport={handleExport}
      />
      <ResponsiveContainer width="96%" height={279}>
        <ComposedChart
          height={292}
          data={filteredData}
          ref={ref}
          margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
        >
          <CartesianGrid
            vertical={true}
            horizontal={false}
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            tick={{ fill: "#918F9A", fontSize: 12, fontWeight: 500 }}
            interval={0}
            tickFormatter={(date: string) => {
              const d = new Date(date);
              const day = String(d.getDate()).padStart(2, "0");
              return `${day}`;
            }}
          />
          <YAxis
            domain={[0, 30]}
            ticks={[0, 10, 20, 30]}
            tickFormatter={(value) => (value === 0 ? "0" : `${value}%`)}
            tickLine={false}
            tick={{ fill: "#918F9A", fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip content={(props) => <CustomTooltip {...props} />} />

          {ALL_LINES.map((line, idx) => {
            const isSelected =
              selectedLines.some((opt) => opt.value === line) ||
              selectedLines.some((opt) => opt.value === "All");

            if (!isSelected) return null;

            if (lineStyle === "area") {
              return (
                <Area
                  key={line}
                  type="monotone"
                  dataKey={line}
                  stroke={colors[idx]}
                  fill={colors[idx]}
                  fillOpacity={0.2}
                />
              );
            }

            return (
              <Line
                key={line}
                type={lineStyle === "smooth" ? "monotone" : "linear"}
                dataKey={line}
                stroke={colors[idx]}
                dot={false}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
