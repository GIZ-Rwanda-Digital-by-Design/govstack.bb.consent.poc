import * as React from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { Form } from "react-admin";
import CSS from "csstype";

import { Drawer, Typography, Box } from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { Container, HeaderContainer, DetailsContainer } from "./modalStyle";

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
  backgroundColor: "transparent",
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
  borderBottomColor: "lightgray", //'#DFE0E1',
  marginRight: "10px",
  backgroundColor: "transparent",
};

const tableRestrictionInfoStyle = {
  border: "solid 1px #dee2e6",
  width: "100%",
  maxWidth: "100%",
  marginBottom: "1rem",
  backgroundColor: "transparent",
};

const tableRestrictionInfoColumn: CSS.Properties = {
  fontWeight: "normal",
  borderRight: "solid 1px #dee2e6",
  borderTop: "solid 1px #dee2e6",
  textAlign: "center",
};

const inputStyle = {
  color: "#495057",
  border: "none",
  outline: "none",
  padding: 0,
  fontSize: "14px",
  width: "100%",
  backgroundColor: "transparent",
  borderBottomColor: "lightgray", //'#DFE0E1',
};

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode: string;
}

interface RestrictionValueType {
  [key: string]: any;
  attributeName: string;
  attributeDescription: string;
  schemaID: string;
  credDefID: string;
}

export default function RestrictionModal(props: Props) {
  const { open, setOpen, mode } = props;
  const [restrcitionValues, setRestrcitionValues] = useState<
    RestrictionValueType[]
  >([
    {
      attributeName: "",
      attributeDescription: "",
      schemaID: "",
      credDefID: "",
    },
  ]);

  let addRestrcitionValues = () => {
    setRestrcitionValues([
      ...restrcitionValues,
      {
        attributeName: "",
        attributeDescription: "",
        schemaID: "",
        credDefID: "",
      },
    ]);
  };

  let removeRestrcitionValues = (i: number) => {
    let newRestrcitionValues = [...restrcitionValues];
    newRestrcitionValues.splice(i, 1);
    setRestrcitionValues(newRestrcitionValues);
  };

  let handleChangeRestrcitionValues = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newRestrcitionValues = [...restrcitionValues];
    newRestrcitionValues[i][e.target.name] = e.target.value;
    setRestrcitionValues(newRestrcitionValues);
  };


  return (
    <React.Fragment>
      <Drawer anchor="right" open={open}>
        <Container sx={{ width: "495px" }}>
          <Form>
            <HeaderContainer>
              <Box pl={2} style={{ display: "flex", alignItems: "center" }}>
                <ChevronLeftIcon
                  onClick={() => setOpen(false)}
                  sx={{ marginRight: 1, cursor: "pointer", color: "#F3F3F6" }}
                />
                <Typography color="#F3F3F6">Restrictions</Typography>
              </Box>
            </HeaderContainer>
            <DetailsContainer>
              <Box p={1.5}>
                {restrcitionValues.map((rv, index) => (
                  <Box
                    style={{
                      marginBottom: "25px",
                      border: "1px solid #DFE0E1",
                      borderRadius: 5,
                    }}
                    key={index}
                  >
                    <Box style={titleAttrRestrictionStyle}>
                      <table style={tableAttrAdditionalInfoStyle}>
                        <tbody>
                          <tr style={{ display: "flex" }}>
                            <td
                              style={{
                                ...tableAttrAdditionalInfoColumn,
                                flexGrow: 1,
                              }}
                            >
                              <input
                                className="personal-data-table-attribute-name"
                                placeholder="Attribute name"
                                disabled={mode === "Read"}
                                style={{
                                  ...inputStyleAttr,
                                  border: "none",
                                  outline: "none",
                                  width: "100%",
                                  cursor:
                                    mode === "Read" ? "not-allowed" : "auto",
                                }}
                                type="text"
                                autoComplete="off"
                                name={"attributeName"}
                                value={rv.attributeName}
                                onChange={(e) => {
                                  handleChangeRestrcitionValues(index, e)
                                }}
                              />
                            </td>
                            <th
                              style={{
                                marginRight: "14px",
                                marginLeft: "17px",
                              }}
                            ></th>

                            <th>
                              <DeleteOutlineOutlinedIcon
                                style={{
                                  cursor:
                                    mode === "Read" ? "not-allowed" : "pointer",
                                  float: "right",
                                  zIndex: 10,
                                }}
                                onClick={
                                  mode === "Read"
                                    ? () => {}
                                    : () => removeRestrcitionValues(index)
                                }
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
                            <td
                              style={{
                                ...tableAttrAdditionalInfoColumn,
                                flexGrow: 1,
                              }}
                            >
                              <input
                                placeholder="Attribute description"
                                disabled={mode === "Read"}
                                style={{
                                  ...inputStyleAttr,
                                  border: "none",
                                  outline: "none",
                                  width: "100%",
                                  cursor:
                                    mode === "Read" ? "not-allowed" : "auto",
                                }}
                                type="text"
                                autoComplete="off"
                                name={"attributeDescription"}
                                value={rv.attributeDescription}
                                onChange={(e) => {
                                  handleChangeRestrcitionValues(index, e)
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Box>
                    <Typography variant="subtitle1" ml={1.5} mt={1.5}>
                      Restrcitions
                    </Typography>

                    <Box style={{ padding: "0px", margin: "5px 10px" }}>
                      <table style={tableRestrictionInfoStyle}>
                        <tbody>
                          <tr>
                            <th
                              style={{
                                ...tableRestrictionInfoColumn,
                                borderRight: "none",
                                borderTop: "none",
                              }}
                            >
                              {" "}
                              <input
                                name={"schemaId-check"}
                                type="checkbox"
                                style={{
                                  cursor:
                                    mode === "Read" ? "not-allowed" : "pointer",
                                }}
                                checked={true}
                                disabled={mode !== "Read" ? false : true}
                              />
                            </th>

                            <th
                              style={{
                                ...tableRestrictionInfoColumn,
                                borderTop: "none",
                              }}
                              scope="row"
                            >
                              Schema ID
                            </th>

                            <td
                              style={{
                                ...tableRestrictionInfoColumn,
                                borderRight: "none",
                                borderTop: "none",
                              }}
                            >
                              <input
                                // className="w-100 pt-0"
                                disabled={mode !== "Read" ? false : true}
                                // type="text"
                                // autoComplete="off"
                                style={{
                                  ...inputStyle,
                                  borderBottom: 0,
                                  cursor:
                                    mode !== "Read" ? "auto" : "not-allowed",
                                }}
                                name={"schemaID"}
                                value={rv.schemaID}
                                onChange={(e) => {
                                  handleChangeRestrcitionValues(index, e);
                                }}
                              />
                            </td>
                          </tr>

                          <tr>
                            <th style={tableRestrictionInfoColumn}>
                              <input
                                type="checkbox"
                                style={{
                                  cursor:
                                    mode === "Read" ? "not-allowed" : "pointer",
                                }}
                                checked={true}
                                disabled={mode !== "Read" ? false : true}
                              />
                            </th>

                            <th style={tableRestrictionInfoColumn} scope="row">
                              Cred. Def. ID
                            </th>

                            <td
                              style={{
                                ...tableRestrictionInfoColumn,
                                borderRight: "none",
                              }}
                              data-title="cred-def-id"
                            >
                              <input
                                // className="w-100 pt-0"
                                disabled={mode === "Read" ? true : false}
                                // type="text"
                                // autoComplete="off"
                                style={{
                                  ...inputStyle,
                                  borderBottom: 0,
                                  cursor:
                                    mode !== "Read" ? "auto" : "not-allowed",
                                }}
                                name={"credDefID"}
                                value={rv.credDefID}
                                onChange={(e) => {
                                  handleChangeRestrcitionValues(index, e);
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Box>
                  </Box>
                ))}
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    marginTop: "-10px",
                    justifyContent: "right",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                  >
                    Add more
                  </Typography>
                  <AddCircleOutlineOutlinedIcon
                    onClick={mode === "Read" ? () => {} : addRestrcitionValues}
                    style={{
                      cursor: mode === "Read" ? "not-allowed" : "pointer",
                      marginLeft: "5px",
                    }}
                  />
                </Box>
              </Box>
            </DetailsContainer>
          </Form>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
