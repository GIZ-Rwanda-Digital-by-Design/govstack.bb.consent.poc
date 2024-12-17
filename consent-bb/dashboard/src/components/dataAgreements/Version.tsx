import { Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const inputStyle = {
  width: "100%",
  border: "1",
  outline: "none",
  fontSize: "14px",
  color: "#495057",
  borderWidth: 0,
  borderRadius: 0,
  backgroundColor: "#FFFF",
  borderBottom: "2px solid #DFE0E1",
};

export const Version = () => {
  const { register } = useFormContext();
  const { t } = useTranslation("translation");

  return (
    <>
      <Typography mt={1.3} mb={1.3} variant="subtitle1">
        {t("dataAgreements.version")}
      </Typography>
      <input
        style={{
          ...inputStyle,
          cursor:"not-allowed"
        }}
        type="text"
        {...register('Version', { required: true, value: '0.0.0' })}
        autoComplete="off"
        disabled
      />
    </>
  );
};
