import { useContext, useState } from "react";

import {
  Grid,
  Typography,
  Box,
  Tooltip,
  Alert,
  Button,
  Snackbar,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { styled } from "@mui/material/styles";
import GeneralModal from "../../components/modals/generalModal";
import CloseIcon from "@mui/icons-material/Close";
import BreadCrumb from "../../components/Breadcrumbs";
import { OrganizationDetailsCRUDContext } from "../../contexts/organizationDetailsCrud";
import { LocalStorageService } from "../../service/localStorageService";
import {
  Datagrid,
  List,
  TextField,
  useRecordContext,
  useRefresh,
} from "react-admin";
import CreateApiKeyModal from "../../components/modals/createApiKeyModal";
import { capitalizeFirstLetter } from "../../utils/capitaliseFIrstLetter";
import { formatISODateToLocalString } from "../../utils/formatISODateToLocalString";
import { configStore } from "../../store/configStore";
import { useTranslation } from "react-i18next";
import { TableEmptyMessage } from "../../components/tableEmptyMessage";
import useLanguageChange from "../../utils/translateTableLanguage";

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

const DetailsContainer = styled("div")({
  height: "auto",
  width: "100%",
  borderRadius: 2,
});

const Item = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  padding: 10,
  paddingLeft: 20,
  height: "auto",
  borderRadius: 2,
  border: "1px solid #CECECE",
}));

const DeveloperAPIs = () => {
  const [openEditPersonalDataModal, setOpenEditPersonalDataModal] =
    useState(false);
  const { organisationDetails } = useContext(OrganizationDetailsCRUDContext);
  const [showAPI, setShowAPI] = useState(false);
  const [apiKeyValue, setApiKeyValue] = useState<any>();
  const { id } = LocalStorageService.getUser();
  let stagingURL = configStore.baseUrl;
  const [openDeleteApiKey, setOpenDeleteApiKey] = useState(false);
  const [developerApiDeleteID, setDeveloperApiDeleteID] = useState<any>();
  const { t } = useTranslation("translation");
  const key = useLanguageChange();

  const refresh = useRefresh();
  const onRefetch = () => {
    refresh();
  };

  const unsecuredCopyToClipboard = (text: string) => { const textArea = document.createElement("textarea"); textArea.value = text; document.body.appendChild(textArea); textArea.focus(); textArea.select(); try { document.execCommand('copy') } catch (err) { console.error('Unable to copy to clipboard', err) } document.body.removeChild(textArea) };

  const handleCopy = () => {
    if (showAPI) {
      unsecuredCopyToClipboard(apiKeyValue);
    }
  };

  const DeleteButtonField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      record[props.source] && (
        <Box
          onClick={() => {
            setOpenDeleteApiKey(true);
            setDeveloperApiDeleteID(record.id);
          }}
          sx={{
            cursor: "pointer",
          }}
        >
          <DeleteOutlineOutlinedIcon color="disabled" />
        </Box>
      )
    );
  };

  const ExpiryField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      record[props.source] && (
        <Typography variant="body2">
          {formatISODateToLocalString(record[props.source])}
        </Typography>
      )
    );
  };

  const ScopeField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    let scopes = record[props.source];
    return (
      <Box style={{ display: "flex" }}>
        {scopes.map((scope: any, i: number) => {
          if (i + 1 === scopes.length) {
            return (
              <Typography variant="body2">
                {capitalizeFirstLetter(scope)}{" "}
              </Typography>
            );
          } else {
            return (
              <Typography variant="body2" style={{ marginRight: 7 }}>
                {capitalizeFirstLetter(scope)},{" "}
              </Typography>
            );
          }
        })}
      </Box>
    );
  };

  return (
    <Container>
      <BreadCrumb
        Link={t("sidebar.account")}
        Link2={t("sidebar.developerAPIs")}
      />
      <Snackbar
        open={showAPI}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        style={{ top: 100 }}
      >
        <Alert
          icon={<></>}
          sx={{
            width: "100%",
            background: "#E5E4E4",
            color: "black",
            display: "flex",
            alignItems: "center",
          }}
          onClose={() => setShowAPI(false)}
          action={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                color="inherit"
                size="small"
                style={{ fontWeight: "bold" }}
                onClick={handleCopy}
              >
                {t("developerAPIs.copy")}
              </Button>
              <Button
                color="inherit"
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => setShowAPI(false)}
              >
                <CloseIcon />
              </Button>
            </Box>
          }
        >
          {t("developerAPIs.apiKeyCopyMessage")}
        </Alert>
      </Snackbar>

      <HeaderContainer>
        <Typography variant="h6" fontWeight="bold">
          {t("developerAPIs.headerText")}
        </Typography>
      </HeaderContainer>
      <DetailsContainer sx={{ flexGrow: 1 }}>
        <Typography variant="body2" mt={1.25} mb={1}>
          {t("developerAPIs.pageDescription")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Item>
              <Typography
                color="black"
                variant="subtitle1"
                fontWeight="bold"
                mb={0.5}
              >
                {t("developerAPIs.organizationID")}
              </Typography>
              <Typography color="grey" variant="body2">
                {organisationDetails.id}
              </Typography>
            </Item>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Item>
              <Typography
                color="black"
                variant="subtitle1"
                fontWeight="bold"
                mb={0.5}
              >
                {t("developerAPIs.yourUserID")}
              </Typography>
              <Typography color="grey" variant="body2">
                {id}
              </Typography>
            </Item>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Item>
              <Typography
                color="black"
                variant="subtitle1"
                fontWeight="bold"
                mb={0.5}
              >
                {t("developerAPIs.configuredBaseURL")}
              </Typography>
              <Typography color="grey" variant="body2">
                {stagingURL}
              </Typography>
            </Item>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box style={{ display: "flex", alignItems: "center" }} mt={1}>
              <Typography color="black" variant="subtitle1" fontWeight="bold">
                {t("developerAPIs.apiKey")}
              </Typography>
              <Tooltip title={t("developerAPIs.createApiKey")} placement="top">
                <AddCircleOutlineOutlinedIcon
                  onClick={() => {
                    setOpenEditPersonalDataModal(true);
                    setShowAPI(false);
                  }}
                  style={{
                    cursor: "pointer",
                    marginLeft: "7px",
                  }}
                />
              </Tooltip>
            </Box>
            <List
              actions={false}
              sx={{ width: "100%", overflow: "hidden" }}
              empty={<TableEmptyMessage />}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Datagrid
                  bulkActionButtons={false}
                  sx={{
                    overflow: "auto",
                    width: "100%",
                  }}
                  key={key}
                >
                  <TextField
                    source="name"
                    label={t("common.name")}
                    sortable={false}
                  />
                  <ScopeField
                    source="scopes"
                    label={t("developerAPIs.scope")}
                    sortable={false}
                  />
                  <ExpiryField
                    source="expiryTimestamp"
                    label={t("developerAPIs.expiry")}
                    sortable={false}
                  />

                  <DeleteButtonField
                    source="id"
                    label={""}
                    textAlign={"center"}
                    sortable={false}
                  />
                </Datagrid>
              </Box>
            </List>
          </Grid>
        </Grid>
      </DetailsContainer>

      {/* Modals */}
      <GeneralModal
        open={openDeleteApiKey}
        setOpen={setOpenDeleteApiKey}
        headerText={t("developerAPIs.deleteAPIKey")}
        confirmText="DELETE"
        confirmButtonText={`${t("common.delete")}`}
        resourceName={"developerapi"}
        developerApiDeleteID={developerApiDeleteID}
        onRefetch={onRefetch}
        modalDescriptionText={
          <Typography variant="body1">
            {t("developerAPIs.deleteDescription1")}
            <b>DELETE</b>
            {t("developerAPIs.deleteDescription2")}
          </Typography>
        }
      />
      <CreateApiKeyModal
        open={openEditPersonalDataModal}
        setOpen={setOpenEditPersonalDataModal}
        headerText={t("developerAPIs.createApiKey")}
        onRefetch={onRefetch}
        setApiKeyValue={setApiKeyValue}
        setShowAPI={setShowAPI}
      />
    </Container>
  );
};

export default DeveloperAPIs;
