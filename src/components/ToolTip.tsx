import { memo } from "react";
import type { TooltipContentProps } from "recharts";
import styles from "@/styles/ToolTip.module.scss";
import Calendar from "@/assets/generalcalendar.svg";
import Original from "@/assets/Original.svg";
import A from "@/assets/A.svg";
import B from "@/assets/B.svg";
import C from "@/assets/C.svg";
import Best from "@/assets/generalbest.svg";

const CustomTooltip = ({
  active,
  payload,
}: TooltipContentProps<any,any>) => {
    if (!active || !payload || payload.length === 0) return;

  const isVisible = active && payload && payload.length;
  const dateObj = new Date(payload[0].payload.date);
  const day = String(dateObj.getDate());
  const month = String(dateObj.getMonth() + 1);
  const year = String(dateObj.getFullYear());

  const formattedDate = `${day}/${month}/${year}`;

  const variations = [
    { label: "Original", img: Original },
    { label: "Variation A", img: A },
    { label: "Variation B", img: B },
    { label: "Variation C", img: C },
  ];

  return (
    <div
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <div className={styles.wrap}>
          <div className={styles.date} aria-label="Selected date">
            <img
              src={Calendar}
              alt="date"
              className={styles.date__img}
              aria-hidden="true"
            />
            <p className={styles.date__description}>{formattedDate}</p>
          </div>
          <hr className={styles.line} />
          {payload
            ?.slice()
            .sort((a, b) => b.value - a.value)
            .map((p, index) => (
              <div className={styles.variation} key={p.name}>
                <div>
                  <img
                    src={variations.find((v) => v.label === p.name)?.img}
                    alt={p.name}
                    aria-hidden="true"
                  />
                  <span>{p.name}:</span>
                  {index === 0 && (
                    <img
                      src={Best}
                      alt="best"
                      className={styles.crown}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span>{p.value}%</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default memo(CustomTooltip);