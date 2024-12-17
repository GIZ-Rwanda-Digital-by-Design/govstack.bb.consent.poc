import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import BreadCrumb from "../../components/Breadcrumbs";
import { Box } from "@mui/system";
import ConfigurePrivacyboard from "../../components/modals/configurePrivacyboard";
import { HttpService } from "../../service/HTTPService";
import { useTranslation } from "react-i18next";

const Container = styled("div")(({ theme }) => ({
  margin: "58px 15px 0px 15px",
  paddingBottom: "50px",
  [theme.breakpoints.down("sm")]: {
    margin: "52px 0 10px 0",
  },
}));

const HeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: "10px",
});

const Item = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "25px 30px 25px 30px",
  marginTop: "15px",
  justifyContent: "space-between",
  height: "auto",
  borderRadius: 3,
  border: "1px solid #E1E1E1",
});

const ItemGrid = styled("div")({
  display: "Grid",
  backgroundColor: "#fff",
  padding: "15px 30px 15px 30px",
  marginTop: "13px",
  height: "auto",
  borderRadius: 3,
  border: "1px solid #E1E1E1",
});

const Privacyboard = () => {
  const [openEditUserAccessModal, setOpenEditUserAccessModal] = useState(false);
  const [privacyBoardDetails, setPrivacyBoardDetails] = useState<any>();
  const [statusData, setStatusData] = useState<any>();
  const { t } = useTranslation("translation");

  useEffect(() => {
    HttpService.getPrivacyBoard().then((res) => {
      setPrivacyBoardDetails(res.data);
    });
    HttpService.getStatus().then((res) => {
      setStatusData(res.data);
    });
  }, []);

  return (
    <Container>
      <BreadCrumb Link={t("sidebar.privacyDashboard")} />
      <HeaderContainer>
        <Typography variant="h6" fontWeight="bold">
          {t("sidebar.privacyDashboard")}
        </Typography>
      </HeaderContainer>
      <Typography variant="body2" mt={1.25}>
        {t("privacyDashboard.pageDescription")}
      </Typography>

      <Item>
        <Typography color="black" variant="subtitle1" fontWeight="bold">
          {t("privacyDashboard.currentStatus")}
        </Typography>
        <Box sx={{ display: { xs: "grid", sm: "flex" }, alignItems: "center" }}>
          <Typography color="black" variant="subtitle1" fontWeight="bold">
            {privacyBoardDetails?.statusStr}
          </Typography>
          <span style={{ cursor: "not-allowed" }}>
            <Button
              variant="outlined"
              disabled={
                statusData?.applicationMode === "single-tenant" ? true : false
              }
              onClick={() => setOpenEditUserAccessModal(true)}
              sx={{
                marginLeft: { sx: 0, md: "20px" },
                height: 35,
                borderRadius: 1,
                border: "1px solid #DFDFDF",
                width: "auto",
                paddingLeft: "50px",
                paddingRight: "50px",
                color: "black",
              }}
            >
              {t("privacyDashboard.configure")}
            </Button>
          </span>
        </Box>
      </Item>
      <ItemGrid>
        <Typography color="black" variant="subtitle1" fontWeight="bold">
          {t("privacyDashboard.privacyDashboardSettings")}
        </Typography>
        <Grid container mt={1.5}>
          <Grid item lg={3} md={5} sm={5} xs={12}>
            <Typography color="black" variant="body2">
            {t("privacyDashboard.deployedVersion")}:
            </Typography>
          </Grid>
          <Grid item lg={5} md={7} sm={7} xs={12}>
            <Typography color="grey" variant="body2">
              {privacyBoardDetails?.version ? privacyBoardDetails?.version : ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={3} md={5} sm={5} xs={12}>
            <Typography color="black" variant="body2">
            {t("privacyDashboard.deployedDomainAddress")}:
            </Typography>
          </Grid>
          <Grid item lg={5} md={7} sm={7} xs={12}>
            <a
              style={{
                color: "blue",
                fontSize: "14px",
                textDecoration: "none",
              }}
              href={privacyBoardDetails?.hostname}
              target="_blank"
              rel="noopener noreferrer"
            >
              {privacyBoardDetails?.hostname
                ? privacyBoardDetails?.hostname
                : ""}
            </a>
          </Grid>
        </Grid>
      </ItemGrid>

      {/* Modals */}

      <ConfigurePrivacyboard
        open={openEditUserAccessModal}
        setOpen={setOpenEditUserAccessModal}
        headerText={"Privacy Dashboard Configuration"}
      />
    </Container>
  );
};

export default Privacyboard;
