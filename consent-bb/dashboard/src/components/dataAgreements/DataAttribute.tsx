import CSS from "csstype";

import { Box } from "@mui/material";

import { DataAttributeInterface } from "../../interfaces/DataAttribute";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
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
  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
};

// DataAttributeData
export interface DataAttributeData {
  attributeName: string;
  attributeDescription: string;
  attributeId: string;
  index: number;
  isExisting: boolean;
  existingPurposeIDs: any;
}

// Props
export interface Props {
  mode: string;
  index: number;
  existingDataAttributes: DataAttributeInterface[];
  remove: any;
  formController: any;
}

export const DataAttribute = (props: Props) => {
  const { index, remove, formController } = props;
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
                  {...register(`dataAttributes.${props.index}.attributeName`, {
                    required: true,
                    minLength: 3,
                    pattern: {
                      value: /.*\D.*/,
                      message: "",
                    },
                  })}
                  placeholder={t("dataAgreements.dataAttributesName")}
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
              {/* Required For Future Purpose */}
              {/* <th style={{ marginRight: "14px", marginLeft: "17px" }}>
                <BlockOutlinedIcon
                  style={{
                    cursor: "not-allowed",
                  }}
                  cursor={"pointer"}
                />
              </th> */}
              <th>
                <DeleteOutlineOutlinedIcon
                  style={{
                    cursor: props.mode === "Read" ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    props.mode !== "Read" && remove(index);
                  }}
                />
              </th>
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
                  {...register(`dataAttributes.${index}.attributeDescription`, {
                    required: true,
                    minLength: 3,
                    pattern: {
                      value: /.*\D.*/,
                      message: "",
                    },
                  })}
                  placeholder={t("dataAgreements.dataAttributesDescription")}
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
