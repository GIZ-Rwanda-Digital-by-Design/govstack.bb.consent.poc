import { useContext, useState } from "react";

import { Form } from "react-admin";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

import BreadCrumb from "../../components/Breadcrumbs";
import OrgCoverImageUpload from "../../components/OrganisationDetails/OrgCoverImageUpload";

import OrganisationDetailsContainer from "../../components/OrganisationDetails/OrgDetailsContainer";
import { OrganizationDetailsCRUDContext } from "../../contexts/organizationDetailsCrud";
import { useTranslation } from "react-i18next";

const Container = styled("div")(({ theme }) => ({
  margin: "58px 15px 0px 15px",
  paddingBottom: "50px",
  [theme.breakpoints.down("sm")]: {
    margin: "52px 0 10px 0",
  },
}));

const DetailsContainer = styled("div")({
  height: "auto",
  width: "100%",
  borderRadius: 2,
  backgroundColor: "#FFFFF",
  padding: 10,
});

const Item = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f7f6f6",
  padding: theme.spacing(1),
  justifyContent: "center",
  color: "#0000",
  height: 90,
  borderRadius: 7,
  border: "1px solid grey",
}));

const GettingStarted = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation("translation");

  const {
    organisationDetails,
    logoImageBase64,
    coverImageBase64,
    setOrganisationDetails,
    setCoverImageBase64,
    setLogoImageBase64,
  } = useContext(OrganizationDetailsCRUDContext);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <Form>
      <Container>
        <BreadCrumb Link={t("sidebar.gettingStarted")} />
        <OrgCoverImageUpload
          editMode={editMode}
          coverImageBase64={coverImageBase64}
          setCoverImageBase64={setCoverImageBase64}
        />
        <OrganisationDetailsContainer
          editMode={editMode}
          logoImageBase64={logoImageBase64}
          organisationDetails={organisationDetails}
          handleEdit={handleEdit}
          setOganisationDetails={setOrganisationDetails}
          setLogoImageBase64={setLogoImageBase64}
        />

        <DetailsContainer sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Item
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/dataagreement")}
              >
                <Typography variant="body1" color="grey">
                {t("gettingStarted.prepareDA")}
                </Typography>
              </Item>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Item
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/developerapi")}
              >
                <Typography variant="body1" color="grey">
                {t("sidebar.developerAPIs")}
                </Typography>
              </Item>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Item
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/manageadmin")}
              >
                <Typography variant="body1" color="grey">
                {t("gettingStarted.manageAdminUsers")}
                </Typography>
              </Item>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Item sx={{ cursor: "pointer" }}>
                <a
                  href="https://github.com/decentralised-dataexchange/bb-consent-docs/wiki/developer-documentation"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant="body1" color="grey">
                  {t("gettingStarted.developerDocumentation")}
                  </Typography>
                </a>
              </Item>
            </Grid>
          </Grid>
        </DetailsContainer>
      </Container>
    </Form>
  );
};

export default GettingStarted;
