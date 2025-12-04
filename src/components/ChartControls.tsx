import type { Dispatch, SetStateAction } from "react";
import Select from "@/components/Select";
import type { Option } from "@/components/Chart";
import Vector from "@/assets/Vector2.svg";
import styles from "@/styles/ChartControls.module.scss"

export type ChartControlsProps = {
  selectedLines: Option[];
  setSelectedLines: Dispatch<SetStateAction<Option[]>>;

  view: "day" | "week";
  setView: Dispatch<SetStateAction<"day" | "week">>;

  lineStyle: string;
  setLineStyle: Dispatch<SetStateAction<string>>;

  setTheme: Dispatch<SetStateAction<"light" | "dark">>;

  handleExport: (fileName: string) => Promise<void>;
};

export function ChartControls({
  selectedLines,
  setSelectedLines,
  view,
  setView,
  lineStyle,
  setLineStyle,
  setTheme,
  handleExport,
}: ChartControlsProps) {
  return (
    <div className={styles.controls}>
      <div className={styles.controls__item}>
        <Select
          selectedLines={selectedLines}
          setSelectedLines={setSelectedLines}
        />
        <select
          value={view}
          onChange={(e) => setView(e.target.value as "day" | "week")}
          className={styles["controls__item--select"]}
          aria-label="Select day or week"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
        </select>
      </div>
      <div className={styles.controls__item}>
        <select
          className={styles["controls__item--select"]}
          value={lineStyle}
          onChange={(e) => setLineStyle(e.target.value)}
          aria-label="Select line style"
        >
          <option value="line">Line style: Line</option>
          <option value="smooth">Line style: Smooth</option>
          <option value="area">Line style: Area</option>
        </select>
        <button
          onClick={() =>
            setTheme((prev: string) => (prev === "light" ? "dark" : "light"))
          }
          className={styles["controls__item--button"]}
        >
          Toggle Theme
        </button>
        <button
          onClick={() => handleExport(`chart-${Date.now()}.png`)}
          className={styles["controls__item--button"]}
        >
          <img src={Vector} alt="Download to PNG" />
        </button>
      </div>
    </div>
  );
}
