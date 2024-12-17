import { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useFilterStore } from "../../store/store";

interface Props {
  displayValue: string;
  selectWidth?: string;
  changefilter: any;
  dropdownValues: any;
  setHandleFilterDropDownTriggered: any;
  handleFilterDropDownTriggered: any;
}

const FilterByLawfulBasisDropdown = (props: Props) => {
  const {
    displayValue,
    selectWidth,
    changefilter,
    dropdownValues,
    setHandleFilterDropDownTriggered,
    handleFilterDropDownTriggered,
  } = props;
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const disabledDropdown =
    useFilterStore.getState().disabledLawfulBasisDropDown;

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const {
      target: { value },
    } = event;
    setSelectedValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(()=>{
    if(disabledDropdown === true){
      setSelectedValue([])
    }
  },[disabledDropdown])

  useEffect(() => {
    if (disabledDropdown === false) {
      let selectedBasis = dropdownValues?.filter(
        (value: any) => value.label === (selectedValue?.[0] && selectedValue[0])
      );
      changefilter({
        filterType: "lawfulBasis",
        value: selectedBasis?.[0] && selectedBasis[0].value,
      });
      setHandleFilterDropDownTriggered(!handleFilterDropDownTriggered);
    }
  }, [selectedValue]);

  return (
    <FormControl
      sx={{ width: selectWidth ? { xs: "250px", sm: selectWidth } : "250px" }}
    >
      <Select
        displayEmpty
        value={selectedValue}
        disabled={disabledDropdown ? true : false}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em style={{fontSize:"14px"}}>{displayValue}</em>;
          }

          return selected.join(", ");
        }}
        inputProps={{ "aria-label": "Without label" }}
      >
        {dropdownValues?.map((dropdownValues: any) => (
          <MenuItem key={dropdownValues.value} value={dropdownValues.label}>
            {dropdownValues.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterByLawfulBasisDropdown;
