import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { Form } from "react-admin";

import { Drawer, Typography, Box } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { Container, HeaderContainer, DetailsContainer } from "./modalStyle";
import { useTranslation } from "react-i18next";
import DataSourcesTableContainer from "../dataAgreements/DataSourcesTableContainer";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode: string;
  AttributeType: string;
  appendDataAttributes: any;
  fieldsDataAttributes: any;
  removeDataAttributes: any;
  methods: any;
  formController: any;
}

export default function DataSchemaModal(props: Props) {
  const {
    open,
    setOpen,
    mode,
    AttributeType,
    appendDataAttributes,
    fieldsDataAttributes,
    removeDataAttributes,
    formController,
    methods,
  } = props;
  const { t } = useTranslation("translation");

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
                <Typography color="#F3F3F6">
                  {AttributeType === "data_using_service" ? (
                    <>
                      {t("dataAgreements.configure")} :{" "}
                      {t("dataAgreements.DUSVerifier")}
                    </>
                  ) : (
                    <>
                      {t("dataAgreements.configure")} :{" "}
                      {t("dataAgreements.DSIssuer")}
                    </>
                  )}
                </Typography>
              </Box>
            </HeaderContainer>
            <DetailsContainer>
              <Box p={1.5}>
                <DataSourcesTableContainer
                  mode={mode}
                  methods={methods}
                  formController={formController}
                  appendDataAttributes={appendDataAttributes}
                  fieldsDataAttributes={fieldsDataAttributes}
                  removeDataAttributes={removeDataAttributes}
                />
              </Box>
            </DetailsContainer>
          </Form>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
