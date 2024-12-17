import { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { HttpService } from "../../service/HTTPService";
import { useFilterStore } from "../../store/store";

interface Props {
  displayValue: string;
  selectWidth?: string;
  setSelectedFilterValue?: any;
  changefilter: any;
  setHandleFilterDropDownTriggered: any;
  handleFilterDropDownTriggered: any;
}

const FilterByPurposeDropdown = (props: Props) => {
  const {
    displayValue,
    selectWidth,
    changefilter,
    setHandleFilterDropDownTriggered,
    handleFilterDropDownTriggered,
  } = props;
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [dropdownValues, setDropdownValues] = useState<any>();
  const disabledDropdown = useFilterStore.getState().disabledPurposeDropDown;


  useEffect(() => {
    HttpService.listDataAgreements(0, 100, "complete", "", "").then((res) => {
      setDropdownValues(res?.dataAgreements?.filter((dataAgreement: any)=>{return dataAgreement}));
    });
  }, []);

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
      let selectedAgreement = dropdownValues?.filter(
        (value: any) =>
          value.purpose === (selectedValue?.[0] && selectedValue[0])
      );
      changefilter({
        filterType: "id",
        value: selectedAgreement?.[0] && selectedAgreement[0].id,
      });
    } 
    setHandleFilterDropDownTriggered(!handleFilterDropDownTriggered);
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
          <MenuItem key={dropdownValues.id} value={dropdownValues.purpose}>
            {dropdownValues.purpose}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterByPurposeDropdown;
