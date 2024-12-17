import CSS from "csstype";

import { Box } from "@mui/material";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useTranslation } from "react-i18next";

const titleAttrRestrictionStyle = {
  fontWeight: "normal",
  margin: "10px 10px 5px 10px",
  borderBottom: "solid 1px #dee2e6",
  lineHeight: "1.5rem",
};

const tableAttrAdditionalInfoStyle = {
  border: 0,
  width: "100%",
  maxWidth: "100%",
  marginBottom: "0rem",
  backgroundColor: "#FFFF",
};

const tableAttrAdditionalInfoColumn: CSS.Properties = {
  fontWeight: "normal",
  border: "0px",
};

const inputStyleAttr = {
  width: "85%",
  color: "#495057",
  border: "1",
  borderWidth: 0,
  padding: 0,
  paddingBottom: 1,
  borderRadius: 0,
  fontSize: "14px",
  borderBottomWidth: 1.2,
  backgroundColor: "#FFFF",
  borderBottomColor: "red", //'#DFE0E1',
  marginRight: "10px",
  fontFamily: "Inter,Helvetica,Arial,sans-serif",
};

export interface Props {
  mode: string;
  index: number;
  formController: any;
  fieldsDataAttributes: any;
  removeDataAttributes: any;
  addDataAttributeField: any;
  methods: any;
}

export const DataSourcesTable = (props: Props) => {
  const { index, removeDataAttributes, formController } = props;
  const { register } = formController;
  const { t } = useTranslation("translation");

  return (
    <Box
      style={{
        marginBottom: "25px",
        border: "1px solid #DFE0E1",
        borderRadius: 5,
      }}
    >
      <Box style={titleAttrRestrictionStyle}>
        <table style={tableAttrAdditionalInfoStyle}>
          <tbody>
            <tr style={{ display: "flex", alignItems: "center" }}>
              <input
                {...register(`dataSources.${props.index}.name`, {
                  // required: true,
                  // minLength: 3,
                  pattern: {
                    value: /.*\D.*/,
                    message: "",
                  },
                })}
                placeholder={t("dataAgreements.dataSourceName")}
                disabled={props.mode === "Read"}
                style={{
                  ...inputStyleAttr,
                  border: "none",
                  outline: "none",
                  width: "100%",
                  cursor: props.mode === "Read" ? "not-allowed" : "auto",
                }}
                type="text"
                autoComplete="off"
              />

              <th>
                <DeleteOutlineOutlinedIcon
                  style={{
                    cursor: props.mode === "Read" ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    props.mode === "Read"
                      ? () => {}
                      : removeDataAttributes(index);
                  }}
                />
              </th>
            </tr>
          </tbody>
        </table>
      </Box>

      <Box style={{ ...titleAttrRestrictionStyle }}>
        <table style={tableAttrAdditionalInfoStyle}>
          <tbody>
            <tr style={{ display: "flex" }}>
              <td style={{ ...tableAttrAdditionalInfoColumn, flexGrow: 1 }}>
                <input
                  {...register(`dataSources.${index}.sector`, {
                    pattern: {
                      value: /.*\D.*/,
                      message: "",
                    },
                  })}
                  placeholder={t("dataAgreements.dataSourceSector")}
                  disabled={props.mode === "Read"}
                  style={{
                    ...inputStyleAttr,
                    border: "none",
                    outline: "none",
                    width: "100%",
                    cursor: props.mode === "Read" ? "not-allowed" : "auto",
                  }}
                  type="text"
                  autoComplete="off"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Box>

      <Box style={{ ...titleAttrRestrictionStyle }}>
        <table style={tableAttrAdditionalInfoStyle}>
          <tbody>
            <tr style={{ display: "flex" }}>
              <td style={{ ...tableAttrAdditionalInfoColumn, flexGrow: 1 }}>
                <input
                  {...register(`dataSources.${index}.location`, {
                    pattern: {
                      value: /.*\D.*/,
                      message: "",
                    },
                  })}
                  placeholder={t("dataAgreements.dataSourceLocation")}
                  disabled={props.mode === "Read"}
                  style={{
                    ...inputStyleAttr,
                    border: "none",
                    outline: "none",
                    width: "100%",
                    cursor: props.mode === "Read" ? "not-allowed" : "auto",
                  }}
                  type="text"
                  autoComplete="off"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Box>

      <Box style={{ ...titleAttrRestrictionStyle, borderBottom: 0 }}>
        <table style={tableAttrAdditionalInfoStyle}>
          <tbody>
            <tr style={{ display: "flex" }}>
              <td style={{ ...tableAttrAdditionalInfoColumn, flexGrow: 1 }}>
                <input
                  {...register(`dataSources.${index}.privacyDashboardUrl`, {
                    required: false,
                    pattern: {
                      value: /^(ftp|http|https):\/\/[^ "]+$/,
                      message: "",
                    },
                  })}
                  placeholder={`${t("dataAgreements.privacyDashboardURL")}`}
                  disabled={props.mode === "Read"}
                  style={{
                    ...inputStyleAttr,
                    border: "none",
                    outline: "none",
                    width: "100%",
                    cursor: props.mode === "Read" ? "not-allowed" : "auto",
                  }}
                  type="text"
                  autoComplete="off"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
};
