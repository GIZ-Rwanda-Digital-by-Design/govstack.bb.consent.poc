import { useState } from "react";
import { TextInput } from "react-admin";

import { Box, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import OrgLogoImageUpload from "../../components/OrganisationDetails/OrgLogoImageUpload";
import { HttpService } from "../../service/HTTPService";
import { UpdateOrganisationReq } from "../../interfaces/UpdateOrganisation";
import { useTranslation } from "react-i18next";

const DetailsContainer = styled("div")({
  height: "auto",
  width: "100%",
  borderRadius: 2,
  backgroundColor: "#FFFFF",
  padding: 10,
});

const editStyleEnable: React.CSSProperties = {
  borderWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#DFE0E1",
  height: 23,
};

const buttonStyle = {
  height: 30,
  width: 100,
  borderRadius: 0,
  border: "1px solid #DFDFDF",
};

type Props = {
  editMode: boolean;
  logoImageBase64: string | undefined;
  organisationDetails: any;
  handleEdit: () => void;
  setOganisationDetails: React.Dispatch<React.SetStateAction<any>>;
  setLogoImageBase64: React.Dispatch<React.SetStateAction<any>>;
};

const OrganisationDetailsContainer = (props: Props) => {
  const {
    editMode,
    logoImageBase64,
    organisationDetails,
    handleEdit,
    setOganisationDetails,
    setLogoImageBase64,
  } = props;
  const [organisationName, setOrganisationName] = useState("");
  const [organisationLocation, setOrganisationLocation] = useState("");
  const [organisationPolicyURL, setOrganisationPolicyURL] = useState("");
  const [organisationOverView, setOrganisationOverView] = useState("");
  const { t } = useTranslation("translation");

  const handleSave = () => {
    const payload: UpdateOrganisationReq = {
      name: organisationName,
      location: organisationLocation,
      description: organisationOverView,
      policyUrl: organisationPolicyURL,
    };
    HttpService.updateOrganisationDetails(payload)
      .then((res) => {
        HttpService.getOrganisationDetails().then((organisation) => {
          handleEdit();
          setOganisationDetails(organisation);
        });
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <DetailsContainer sx={{ flexGrow: 1 }}>
      <Grid
        sx={{
          display: { xs: "grid", sm: "flex" },
          justifyContent: "space-between",
          paddingLeft: { xs: "0", sm: "50px" },
        }}
      >
        <Grid
          sx={{
            height: { xs: "auto", sm: "90px" },
            display: { xs: "grid", sm: "flex" },
            width: "auto",
          }}
        >
          <OrgLogoImageUpload
            editMode={editMode}
            logoImageBase64={logoImageBase64}
            setLogoImageBase64={setLogoImageBase64}
          />

          <Box
            sx={{
              marginLeft: { xs: "0", sm: "30px" },
              marginTop:
                editMode === true
                  ? { xs: "-150px", sm: "0px" }
                  : { xs: "9px", sm: "0px" },
            }}
          >
            {editMode ? (
              <>
                <TextInput
                  autoFocus
                  source="organisationname"
                  value={organisationName}
                  defaultValue={organisationDetails.name}
                  onChange={(e) => setOrganisationName(e.target.value)}
                  variant="standard"
                  label={false}
                  placeholder={t("gettingStarted.organisationName")}
                  fullWidth
                  style={{
                    ...editStyleEnable,
                    marginTop: "0.9px",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: 20, fontWeight: "bold", marginTop:"-4px" },
                  }}
                />
                <Typography
                  color="#9F9F9F"
                  variant="body2"
                  height="23px"
                  style={{ marginTop: "-0px" }}
                >
                  {t("gettingStarted.sector")}: {organisationDetails.sector}
                </Typography>
                <TextInput
                  source="location"
                  variant="standard"
                  label={false}
                  defaultValue={organisationDetails.location}
                  value={organisationLocation}
                  onChange={(e) => setOrganisationLocation(e.target.value)}
                  placeholder={t("gettingStarted.location")}
                  fullWidth
                  style={{ ...editStyleEnable, marginTop: "-1px" }}
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: 14 },
                  }}
                />
                <TextInput
                  source="policyurl"
                  variant="standard"
                  label={false}
                  value={organisationPolicyURL}
                  onChange={(e) => setOrganisationPolicyURL(e.target.value)}
                  placeholder={t("common.policyUrl")}
                  defaultValue={organisationDetails.policyUrl}
                  fullWidth
                  style={{ ...editStyleEnable, marginTop: "-4px" }}
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: 14 },
                  }}
                />
              </>
            ) : (
              <>
                <Typography variant="h6" fontWeight="bold" mt={"-4px"}>
                  {organisationDetails.name}
                </Typography>
                <Typography variant="body2" height="23px">
                {t("gettingStarted.sector")}: {organisationDetails.sector}
                </Typography>
                <Typography variant="body2" height="23px">
                  {organisationDetails.location}
                </Typography>
                <Typography variant="body2" height="23px">
                  {organisationDetails.policyUrl}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
        <Grid>
          {editMode ? (
            <Box
              sx={{
                textAlign: { xs: "left", sm: "right" },
                marginTop: { xs: "-40px", sm: "0px" },
              }}
            >
              <Button
                onClick={handleEdit}
                style={buttonStyle}
                variant="outlined"
                sx={{
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                  color: "black",
                }}
              >
                {t("common.cancel")}
              </Button>
              <Button
                onClick={handleSave}
                style={buttonStyle}
                variant="outlined"
                sx={{
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                  color: "black",
                }}
              >
                {t("common.save")}
              </Button>
            </Box>
          ) : (
            <Typography
              onClick={handleEdit}
              sx={{
                cursor: "pointer",
                textAlign: { xs: "left", sm: "right" },
                marginTop: { xs: "14px", sm: "0px" },
              }}
            >
              {t("common.edit")}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid
        sx={{
          marginTop: editMode === true ? { xs: 0.8, sm: 4 } : { xs: 2, sm: 4 },
        }}
      >
        <Typography variant="h6" fontWeight="bold">
        {t("common.overView")}
        </Typography>
        <Box sx={{ minHeight: 100, maxHeight: 160, overflow: "auto" }}>
          {editMode ? (
            <TextInput
              source="overview"
              variant="standard"
              value={organisationOverView}
              onChange={(e) => setOrganisationOverView(e.target.value)}
              multiline={true}
              defaultValue={organisationDetails.description}
              label={false}
              placeholder={t("gettingStarted.descriptionPlaceholder")}
              fullWidth
              style={{ marginTop: "-0.9px" }}
              InputProps={{
                disableUnderline: true,
                style: { fontSize: 14 },
              }}
            />
          ) : (
            <Typography
              variant="body2"
              align="left"
              style={{ wordWrap: "break-word" }}
            >
              {organisationDetails.description}
            </Typography>
          )}
        </Box>
      </Grid>
    </DetailsContainer>
  );
};

export default OrganisationDetailsContainer;
