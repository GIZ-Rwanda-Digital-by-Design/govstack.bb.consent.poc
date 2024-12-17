import React from "react";
import {
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  Chip,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  displayValue: string;
  selectWidth?: string;
  dropdownValues: {
    value: string;
    label: string;
  }[];
  setSelectedFilterValue?: any;
  selectedChips: any;
  setSelectedChips: any;
}

const Dropdown = (props: Props) => {
  const {
    displayValue,
    selectWidth,
    dropdownValues,
    selectedChips,
    setSelectedChips,
  } = props;

  const handleChange = (event: SelectChangeEvent<typeof selectedChips>) => {
    const {
      target: { value },
    } = event;
    const selectedValue = typeof value === "string" ? value.split(",") : value;

    setSelectedChips(selectedValue);
  };

  const handleDeleteChip = (chipToDelete: string) => () => {
    const updatedChips = selectedChips.filter(
      (chip: string) => chip !== chipToDelete
    );
    setSelectedChips(updatedChips);
  };

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <FormControl
      sx={{
        width: selectWidth ? { xs: "250px", sm: selectWidth } : "250px",
      }}
    >
      <Select
        displayEmpty
        multiple
        value={selectedChips}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em style={{ fontSize: "14px" }}>{displayValue}</em>;
          }
          return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {selected.map((value: string) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={handleDeleteChip(value)}
                  onMouseDown={stopPropagation}
                  style={{ margin: "2px" }}
                />
              ))}
            </div>
          );
        }}
        inputProps={{ "aria-label": "Without label" }}
      >
        {dropdownValues.map((dropdownValue) => (
          <MenuItem key={dropdownValue.value} value={dropdownValue.value}>
            {dropdownValue.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
