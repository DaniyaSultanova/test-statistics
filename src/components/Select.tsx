import Select from "react-select";
import Arrow from "@/assets/Vector.svg";
import { ALL_OPTIONS } from "@/constants/Variations";
import type { Option } from "@/components/Chart";

type CustomSelectProps = {
  selectedLines: Option[];
  setSelectedLines: React.Dispatch<React.SetStateAction<Option[]>>;
};

const CustomSelect = ({
  selectedLines,
  setSelectedLines,
}: CustomSelectProps) => {
  const selectStyles = {
    control: (base: any) => ({
      ...base,
      border: "1px solid #C7C5D0",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: 400,
      minHeight: "28px",
      height: "28px",
      boxShadow: "none",
      cursor: "pointer",
      backgroundColor: "white",
      padding: "0",
    }),

    multiValueLabel: (base: any) => ({
      ...base,
      fontSize: 12,
    }),

    valueContainer: (base: any) => ({
      ...base,
      padding: "0",
      minWidth: 160,
    }),

    clearIndicator: (base: any) => ({
      ...base,
      padding: 0,
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    option: (base: any, state: { isFocused: any }) => ({
      ...base,
      fontSize: "12px",
      backgroundColor: state.isFocused ? "#F0F0F5" : "white",
    }),
  };

  const DropdownArrow = () => (
    <img src={Arrow} style={{ width: 14, height: 14, marginRight: 8 }} />
  );

  return (
    <Select
      styles={selectStyles}
      components={{
        DropdownIndicator: DropdownArrow,
      }}
      isSearchable={false}
      isMulti
      value={selectedLines}
      options={ALL_OPTIONS}
      onChange={(selected) => {
        if (!selected || selected.length === 0) {
          setSelectedLines([]);
          return;
        }

        const selectedArray = Array.from(selected);
        if (
          (selectedArray.length === 1 && selectedArray[0].value === "All") ||
          selectedArray[selectedArray.length - 1].value === "All"
        ) {
          setSelectedLines([
            { value: "All", label: "All variations selected" },
          ]);
          return;
        }

        const filtered = selectedArray.filter((opt) => opt.value !== "All");
        setSelectedLines(filtered);
      }}
    />
  );
};

export default CustomSelect;
