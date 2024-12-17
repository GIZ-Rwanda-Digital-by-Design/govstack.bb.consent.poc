import { Select, MenuItem } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import CSS from "csstype";
import { useTranslation } from "react-i18next";

interface ThirdPartyDataSharingFormControlProps {
  mode: string;
}

interface ThirdPartyDataProps {
  mode: string;
  onChange: (e: React.SyntheticEvent) => void;
  value: any;
  thirdPartyDataSharingOptions: any
}

const tableCellStyle: CSS.Properties = {
  fontWeight: "normal",
  fontSize: "14px",
  borderTop: "solid 1px #dee2e6",
  textAlign: "left",
  borderRight: "solid 1px #dee2e6",
  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
};

const dropDownStyle = {
  border: "none",
  outline: "none",
  fontSize: "14px",
  width: "100%",
  height: "35px",
  color: "#495057",
  backgroundColor: "#FFFF",
};

const disabledDropDownStyle = {
  border: "none",
  outline: "none",
  fontSize: "14px",
  backgroundColor: "#F7F6F6",
  height: "35px",
  color: "#495057",
  cursor: "not-allowed",
};

export const ThirdPartyDataSharing = (props: ThirdPartyDataProps) => {
  return (
    <>
      <Select
        variant="outlined"
        fullWidth
        name="Shared3PP"
        disabled={props.mode === 'Read'}
        onChange={(e: any) => {
          props.onChange(e);
        }}
        value={props.value}
        style={props.mode === "Read" ? disabledDropDownStyle : dropDownStyle}
      >
        {props.thirdPartyDataSharingOptions.map((modes: any) => (
          <MenuItem key={modes.label} value={modes.value}>
            {modes.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export const ThirdPartyDataSharingFormControl = (
  props: ThirdPartyDataSharingFormControlProps
) => {
  const { control } = useFormContext();
  const { t } = useTranslation("translation");
  const thirdPartyDataSharingOptions = [
    {
      value: false,
      label: t("common.false"),
    },
    {
      value: true,
      label: t("common.true"),
    },
  ];
  return (
    <>
      <th style={tableCellStyle}>{t("dataAgreements.3pp")}</th>

      <td style={{ ...tableCellStyle, borderRight: 0 }}>
        <Controller
          name="Shared3PP"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, value } }) => (
            <ThirdPartyDataSharing
              onChange={onChange}
              value={value}
              mode={props.mode}
              thirdPartyDataSharingOptions = {thirdPartyDataSharingOptions}
            />
          )}
        />
      </td>
    </>
  );
};
