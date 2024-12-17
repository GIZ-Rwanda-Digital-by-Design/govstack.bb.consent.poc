import { useEffect, useRef, useState } from "react";

import { Box, Typography, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import GeneralModal from "../../components/modals/generalModal";
import EditUserAccessModal from "../../components/modals/editUserAccessModal";
import { HttpService } from "../../service/HTTPService";
import SnackbarComponent from "../../components/notification";
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
  marginTop: "15px",
});

const Item = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "25px 30px 25px 30px",
  marginTop: "13px",
  justifyContent: "space-between",
  height: "auto",
  borderRadius: 3,
  border: "1px solid #E1E1E1",
});

const uploadButtonStyle = {
  cursor: "pointer",
  border: "1px solid #DFDFDF",
  height: 35,
  borderRadius: 1,
  width: "auto",
  paddingLeft: "50px",
  paddingRight: "50px",
};

const UserAccess = () => {
  const [openEditUserAccessModal, setOpenEditUserAccessModal] = useState(false);
  const [openDeleteUserAccessModal, setOpenDeleteUserAccessModal] =
    useState(false);
  const [configured, setConfigured] = useState(false);
  const [idpDetails, setIdpDetails] = useState<any>(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation("translation");

  useEffect(() => {
    HttpService.listAllIdps().then((response) => {
      if (response.idps.length !== 0) {
        setConfigured(true);
        setIdpDetails(response.idps[0]);
      } else {
        setConfigured(false);
        setIdpDetails(null);
      }
    });
  }, [openDeleteUserAccessModal, openEditUserAccessModal]);
  const fileInputRef = useRef<any>(null);

  const handleCSVFile = (e: any) => {
    let file = e.target.files[0];
    let csv = /text.csv/;

    if (file.type.match(csv)) {
      const formData = new FormData();
      formData.append("individuals", file);

      HttpService.addIndividualUsingByCsv(formData)
        .then((res) => {
          setErrorMessage("");
          setSuccessMessage(t("userAccess.onboardingSuccessMsg"));
          setOpenSnackBar(true);
          fileInputRef.current.value = "";
          e.target.value = null;
        })
        .catch((error) => {
          setSuccessMessage("");
          setErrorMessage(t("userAccess.onboardingErrorMsg"));
          setOpenSnackBar(true);
          fileInputRef.current.value = "";
          e.target.value = null;
        });
    }
  };

  return (
    <Container>
      <BreadCrumb
        Link={t("sidebar.manageUsers")}
        Link2={t("sidebar.configuration")}
      />
      <SnackbarComponent
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        topStyle={100}
        successMessage={successMessage}
        message={errorMessage}
      />
      <HeaderContainer>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {t("userAccess.userAccess")}
          </Typography>
          <Tooltip title={t("userAccess.createUserAccess")} placement="top">
            <AddCircleOutlineOutlinedIcon
              style={{
                cursor: configured ? "not-allowed" : "pointer",
                marginLeft: "7px",
              }}
              onClick={() => {
                configured === false && setOpenEditUserAccessModal(true);
              }}
            />
          </Tooltip>
        </Box>
      </HeaderContainer>
      <Typography variant="body2" mt={1.35}>
        {t("userAccess.pageDescription")}
      </Typography>

      <Item>
        {configured ? (
          <>
            <Box style={{ display: "flex" }}>
              <Typography color="black" variant="body2">
                {t("userAccess.authMechanism")}:
              </Typography>
              <Typography color="black" variant="body2" ml={1}>
                {t("userAccess.openIDConnect")}
              </Typography>
            </Box>
            <Box>
              <Tooltip title={t("userAccess.editUserAccess")} placement="top">
                <EditOutlinedIcon
                  onClick={() => {
                    setOpenEditUserAccessModal(true);
                  }}
                  fontSize="medium"
                  color="disabled"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Tooltip title={t("userAccess.deleteUserAccess")} placement="top">
                <DeleteOutlineOutlinedIcon
                  onClick={() => setOpenDeleteUserAccessModal(true)}
                  fontSize="medium"
                  color="disabled"
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                />
              </Tooltip>
            </Box>
          </>
        ) : (
          <Box style={{ display: "flex" }}>
            <Typography color="black" variant="body2">
              {t("userAccess.authMechanism")}:
            </Typography>
            <Typography color="grey" variant="body2" ml={1}>
              {t("userAccess.notConfigured")}
            </Typography>
          </Box>
        )}
      </Item>
      <Item>
        <Typography color="black" variant="body2">
          {t("userAccess.uploadCSVDescription")}
        </Typography>
        <Box>
          <form>
            <label className="uptext" htmlFor="uploadCSV">
              <Box
                style={uploadButtonStyle}
                sx={{
                  textAlign: "center",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">
                  {t("userAccess.upload")}
                </Typography>
              </Box>
            </label>
            <input
              ref={fileInputRef}
              accept=".csv"
              id="uploadCSV"
              name="uploadCSV"
              hidden={true}
              type="file"
              multiple={true}
              onChange={(e) => handleCSVFile(e)}
            />
          </form>
        </Box>
      </Item>
      {/* Modals */}

      {/* DeletePersonalModal */}
      <GeneralModal
        open={openDeleteUserAccessModal}
        setOpen={setOpenDeleteUserAccessModal}
        headerText={t("userAccess.deleteUserAccess")}
        confirmText="DELETE"
        confirmButtonText={`${t("common.delete")}`}
        resourceName={"configuration"}
        userAccessId={idpDetails?.id}
        modalDescriptionText={
          <Typography variant="body1">
            {t("userAccess.deleteDescription1")} <b>DELETE</b>
            {t("userAccess.deleteDescription2")}
          </Typography>
        }
      />

      <EditUserAccessModal
        open={openEditUserAccessModal}
        setOpen={setOpenEditUserAccessModal}
        headerText={t("userAccess.accessConfiguration")}
        idpDetails={idpDetails}
      />
    </Container>
  );
};

export default UserAccess;
