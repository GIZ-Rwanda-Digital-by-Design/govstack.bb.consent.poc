import { Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";
interface Props {
  filterValues: any;
  control: any;
  nameOfSelect: string;
}

const dropDownStyle = {
  color: "#495057",
  border: "none",
  outline: "none",
  fontSize: "14px",
  width: "100%",
  backgroundColor: "transparent",
};

const WebhookSelect = (props: Props) => {
  const { filterValues, control, nameOfSelect } = props;

  return (
    <Controller
      name={nameOfSelect}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          onChange={(e: any) => {
            onChange(e);
          }}
          variant="outlined"
          fullWidth
          name={nameOfSelect}
          defaultValue={value}
          style={{
            ...dropDownStyle,
            height: "32px",
          }}
        >
          {filterValues.map((Type: any) => (
            <MenuItem key={Type.label} value={Type.value}>
              {Type.label}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};

export default WebhookSelect;
