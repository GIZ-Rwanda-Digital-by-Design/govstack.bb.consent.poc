import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useFilterStore } from "../../store/store";

const dropDownStyle = {
  border: "1px solid lightgray",
  outline: "none",
  fontSize: "14px",
  backgroundColor: "#FFFF",
  height: "28px",
  borderRadius: "5px",
  cursor: "pointer",
  padding: 0,
  margin: 0,
};

interface Props {
  record: any;
  selectedValue: any;
  setSelectedValue: any;
  key: any;
  setSelectedDropdownDataAgreementValue: any;
}

const VersionDropdown = (props: Props) => {
  const {
    record,
    selectedValue,
    setSelectedValue,
    setSelectedDropdownDataAgreementValue,
  } = props;
  const filter = useFilterStore.getState().filterDataAgreement;

  const [dataAgreementFromRevision, setDataAgreementFromRevision] =
    useState<any>();

  useEffect(() => {
    let dataAgreementFromRevision: any = record.revisions?.map(
      (revision: any) => {
        return JSON.parse(revision.objectData);
      }
    );

    if (record.active === false && filter === "all") {
      dataAgreementFromRevision = [
        record,
        ...(dataAgreementFromRevision !== undefined
          ? dataAgreementFromRevision
          : []),
      ];
      setDataAgreementFromRevision(dataAgreementFromRevision);
    } else {
      setDataAgreementFromRevision(dataAgreementFromRevision);
    }
  }, [record]);

  const setDefaultSelectedValueNew =
    dataAgreementFromRevision && dataAgreementFromRevision.length > 0
      ? dataAgreementFromRevision[0].version
      : "";

  const handleChange = (event: any) => {
    setSelectedValue((selectedValue: any) => {
      return { ...selectedValue, [record.id]: event.target.value };
    });

    const selectedRevision = dataAgreementFromRevision?.find(
      (dataAgreement: any) => dataAgreement.version === event.target.value
    );

    setSelectedDropdownDataAgreementValue((prevSelectedRevision: any) => ({
      ...prevSelectedRevision,
      [record.id]: selectedRevision
        ? {
            purpose: selectedRevision.purpose,
            version: selectedRevision.version,
            methodOfUse: selectedRevision.methodOfUse,
            lifecycle: selectedRevision.lifecycle,
            lawfulBasis: selectedRevision.lawfulBasis,
          }
        : null,
    }));

    record.selectedRevision = selectedRevision;
  };

  const newSelectedValue =
    selectedValue[record.id] || setDefaultSelectedValueNew;

  return (
    <>
      <Select
        onChange={(e) => handleChange(e)}
        variant="outlined"
        value={newSelectedValue}
        fullWidth
        style={{
          ...dropDownStyle,
          width: "120px"
        }}
        renderValue={(value) => (
          <span
            style={{
              color:
                record.active === false && newSelectedValue === record.version
                  ? "red"
                  : "black",
            }}
          >
            {value}
          </span>
        )}
      >
        {dataAgreementFromRevision?.map((versions: any, index: number) => (
          <MenuItem
            key={index}
            value={versions.version}
            style={{ color: versions.active === false ? "red" : "black" }}
          >
            {versions.version}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default VersionDropdown;
