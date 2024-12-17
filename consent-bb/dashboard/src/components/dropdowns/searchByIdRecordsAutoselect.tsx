import { TextField } from "@mui/material";
import { useFilterStore } from "../../store/store";
import { useTranslation } from "react-i18next";
const debounce = require("lodash.debounce");

const inputStyleAttr = {
  color: "#495057",
  borderRadius: 5,
  fontSize: "14px",
  borderBottomWidth: 1.2,
  backgroundColor: "white",
};

export const SearchByIdRecords = (props: any) => {
  const { handleSearchTriggered, sethandleSearchTriggered, changefilter } =
    props;
  const { t } = useTranslation("translation");

  const updateDisabledPurposeDropDown = (disabledPurposeDropDown: any) => {
    useFilterStore
      .getState()
      .updateDisabledPurposeDropDown(disabledPurposeDropDown);
  };

  const updateDisabledLawfulBasisDropDown = (
    disabledLawfulBasisDropDown: any
  ) => {
    useFilterStore
      .getState()
      .updateDisabledLawfulBasisDropDown(disabledLawfulBasisDropDown);
  };

  const updateQuery = (e: any) => {
    changefilter({
      filterType: "id",
      value: e?.target?.value,
    });
    updateDisabledPurposeDropDown(true);
    updateDisabledLawfulBasisDropDown(true);
    sethandleSearchTriggered(!handleSearchTriggered);
  };

  const debouncedOnChange = debounce(updateQuery, 100);

  return (
    <TextField
      style={{
        ...inputStyleAttr,
      }}
      sx={{ width: { xs: "100%", sm: "40%" } }}
      placeholder={t("consentRecords.searchPlaceholder")}
      onChange={debouncedOnChange}
    />
  );
};
