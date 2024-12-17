import CSS from "csstype";
import { useFormContext } from "react-hook-form";
import { ThirdPartyDataSharingFormControl } from "./ThirdPartySharing";
import { useTranslation } from "react-i18next";

const tableCellStyle: CSS.Properties = {
  fontWeight: "normal",
  fontSize: "14px",
  borderTop: "solid 1px #dee2e6",
  textAlign: "left",
  borderRight: "solid 1px #dee2e6",
  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
};

const inputDataConfigStyle = {
  color: "#495057",
  border: "none",
  outline: "none",
  fontSize: "14px",
  width: "100%",
  backgroundColor: "#FFFF",
  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
};

interface Props {
  mode: string;
}

const DataAgreementPolicy = (props: Props) => {
  const { mode } = props;
  const { register } = useFormContext();
  const { t } = useTranslation("translation");

  return (
    <table
      style={{
        border: "solid 1px #dee2e6",
        width: "100%",
        maxWidth: "100%",
        marginBottom: "1rem",
        marginTop: ".5rem",
      }}
    >
      <tbody>
        <tr>
          <th style={{ ...tableCellStyle, borderTop: 0 }} scope="row">
            {t("common.policyUrl")}
          </th>

          <td style={{ ...tableCellStyle, borderTop: 0 }}>
            <input
              autoComplete="off"
              type="text"
              disabled={mode === "Read"}
              style={{
                ...inputDataConfigStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              {...register("PolicyURL", {
                required: true,
                minLength: 1,
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "",
                },
              })}
            />
          </td>
        </tr>

        <tr>
          <th style={tableCellStyle} scope="row">
            {t("dataAgreements.jurisdiction")}
          </th>

          <td style={tableCellStyle}>
            <input
              autoComplete="off"
              type="text"
              disabled={mode === "Read"}
              style={{
                ...inputDataConfigStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              {...register("Jurisdiction", {
                required: true,
                minLength: 1,
                pattern: {
                  value: /.*\D.*/,
                  message: "",
                },
              })}
            />
          </td>
        </tr>

        <tr>
          <th style={tableCellStyle} scope="row">
            {t("dataAgreements.industryScope")}
          </th>

          <td style={tableCellStyle}>
            <input
              autoComplete="off"
              type="text"
              disabled={mode === "Read"}
              style={{
                ...inputDataConfigStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              {...register("IndustryScope", {
                required: true,
                minLength: 1,
                pattern: {
                  value: /.*\D.*/,
                  message: "",
                },
              })}
            />
          </td>
        </tr>

        <tr>
          <th style={tableCellStyle} scope="row">
            {t("dataAgreements.storageLocation")}
          </th>

          <td style={{ ...tableCellStyle, borderRight: 0 }}>
            <input
              autoComplete="off"
              type="text"
              style={{
                ...inputDataConfigStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              {...register("StorageLocation", {
                required: true,
                minLength: 1,
                pattern: {
                  value: /.*\D.*/,
                  message: "",
                },
              })}
            />
          </td>
        </tr>

        <tr>
          <th style={tableCellStyle} scope="row">
            {t("dataAgreements.retentionPeriod")}
          </th>

          <td style={tableCellStyle}>
            <input
              autoComplete="off"
              type="number"
              disabled={mode === "Read"}
              style={{
                ...inputDataConfigStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              {...register("dataRetentionPeriodDays", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </td>
        </tr>

        <tr>
          <th style={tableCellStyle} scope="row">
          {t("dataAgreements.geographicRestriction")}
          </th>

          <td style={{ ...tableCellStyle, borderRight: 0 }}>
            <input
              autoComplete="off"
              type="text"
              style={{
                ...inputDataConfigStyle,
                cursor: mode === "Read" ? "not-allowed" : "auto",
              }}
              {...register("Restriction", {
                required: true,
                minLength: 1,
                pattern: {
                  value: /.*\D.*/,
                  message: "",
                },
              })}
            />
          </td>
        </tr>

        <tr>
          <ThirdPartyDataSharingFormControl mode={mode} />
        </tr>
      </tbody>
    </table>
  );
};

export default DataAgreementPolicy;
