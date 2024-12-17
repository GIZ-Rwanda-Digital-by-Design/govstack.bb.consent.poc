import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const TableEmptyMessage: React.FC = () => {
  const { t } = useTranslation("translation");
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "35px",
      }}
    >
      <Typography variant="body2">{t("common.noResultsFound")}</Typography>
    </div>
  );
};
