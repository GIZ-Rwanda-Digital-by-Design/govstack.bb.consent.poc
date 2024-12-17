import { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  Form,
  useRefresh,
  useRecordContext,
} from "react-admin";

import {
  Box,
  Typography,
  Button,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import GlobalDataPolicyConfigModal from "../../components/modals/globalDataPolicyConfig";
import GeneralModal from "../../components/modals/generalModal";
import DataAgreementModal from "../../components/modals/dataAgreementModal";
import DeleteModal from "../../components/modals/generalModal";
import { useFilterStore } from "../../store/store";
import {
  getMethodOfUse,
  getLawfulBasisOfProcessing,
  getPublishValues,
} from "../../interfaces/DataAgreement";
import VersionDropdown from "../../components/dataAgreements/versionDropdown";
import { useTranslation } from "react-i18next";
import { TableEmptyMessage } from "../../components/tableEmptyMessage";
import '../../index.css'
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

const buttonStyle = {
  height: 35,
  borderRadius: 1,
  border: "1px solid #DFDFDF",
  width: "auto",
  paddingLeft: "50px",
  paddingRight: "50px",
};

const DataAgreement = () => {
  const [openGlobalDataPolicyModal, setOpenGlobalDataPolicyModal] =
    useState(false);
  const [openDeleteDataAgreementModal, setOpenDeleteDataAgreementModal] =
    useState(false);
  const [openPublishDataAgreementModal, setOpenPublishDataAgreementModal] =
    useState(false);
  const [openDataAgreementModal, setOpenDataAgreementModal] = useState(false);
  const [dataAgreementMode, setDataAgreementMode] = useState("");
  const [
    selectededDataAgreementFromDataAgreement,
    setSelectededDataAgreementFromDataAgreement,
  ] = useState<any>();
  const [handleChangeTriggered, setHandleChangeTriggered] = useState(false);
  // Store the selected versions and table values
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>({});
  const [
    selectedDropdownDataAgreementValue,
    setSelectedDropdownDataAgreementValue,
  ] = useState<any>({});
  const { t } = useTranslation("translation");
  const key = useLanguageChange();

  const [listFilterValue, setListFilterValue] = useState("all");
  const refresh = useRefresh();
  const onRefetch = () => {
    refresh();
  };

  const changefilterDataAgreement = (filterDataAgreement: string) => {
    useFilterStore.getState().updateFilterDataAgreement(filterDataAgreement);
  };

  const handleChange = (value: any) => {
    if (value === "complete") {
      changefilterDataAgreement("complete");
      setListFilterValue("complete");
    } else if (value === "all") {
      changefilterDataAgreement("all");
      setListFilterValue("all");
    }
    setHandleChangeTriggered(!handleChangeTriggered);
  };

  useEffect(() => {
    setSelectedDropdownValue({});
  }, [handleChangeTriggered]);

  const getTextColor = (record: any) => {
    if (record.active === false) {
      if (selectedDropdownValue[record.id] === record.version) {
        return "#FF0C10"; // Red color
      } else if (selectedDropdownValue[record.id] === undefined) {
        return "#FF0C10";
      } else if (selectedDropdownValue[record.id] !== record.version) {
        return "black";
      }
      return "#FF0C10";
    }

    return "black";
  };

  const getIconColor = (record: any) => {
    if (record.active === false) {
      if (selectedDropdownValue[record.id] === record.version) {
        return "#FF0C10"; // Red color
      } else if (selectedDropdownValue[record.id] === undefined) {
        return "#FF0C10";
      } else if (selectedDropdownValue[record.id] !== record.version) {
        return "#B9B9B9";
      }
      return "#FF0C10";
    }

    return "#B9B9B9";
  };

  const PurposeField = (props: any) => {
    const record = useRecordContext(props);
    const textColor = getTextColor(record);

    if (!record || !props.source) {
      return null;
    }
    return (
      <Typography
        variant="body2"
        sx={{
          color: textColor,
        }}
      >
        {selectedDropdownValue[record.id] === undefined ||
        selectedDropdownDataAgreementValue[record.id] === undefined ||
        selectedDropdownDataAgreementValue[record.id]?.version ===
          record.version
          ? record[props.source]
          : selectedDropdownDataAgreementValue[record.id]?.purpose}
      </Typography>
    );
  };

  const DataExchangeField = (props: any) => {
    const record = useRecordContext(props);
    const textColor = getTextColor(record);
    if (!record || !props.source) {
      return null;
    }
    return (
      <Typography
        variant="body2"
        sx={{
          color: textColor,
        }}
      >
        {selectedDropdownValue[record.id] === undefined ||
        selectedDropdownDataAgreementValue[record.id] === undefined ||
        selectedDropdownDataAgreementValue[record.id]?.version ===
          record.version
          ? getMethodOfUse(record[props.source])
          : getMethodOfUse(
              selectedDropdownDataAgreementValue[record.id]?.methodOfUse
            )}
      </Typography>
    );
  };

  const PublishStatusField = (props: any) => {
    const record = useRecordContext(props);
    const textColor = getTextColor(record);

    if (!record || !props.source) {
      return null;
    }
    return (
      <Typography
        variant="body2"
        sx={{
          color: textColor,
        }}
      >
        {selectedDropdownValue[record.id] === undefined ||
        selectedDropdownDataAgreementValue[record.id] === undefined ||
        selectedDropdownDataAgreementValue[record.id]?.version ===
          record.version
          ? getPublishValues(record[props.source])
          : getPublishValues(
              selectedDropdownDataAgreementValue[record.id]?.lifecycle
            )}
      </Typography>
    );
  };

  const LawfulBasisField = (props: any) => {
    const record = useRecordContext(props);
    const textColor = getTextColor(record);

    if (!record || !props.source) {
      return null;
    }
    return (
      <Typography
        variant="body2"
        sx={{
          color: textColor,
        }}
      >
        {selectedDropdownValue[record.id] === undefined ||
        selectedDropdownDataAgreementValue[record.id] === undefined ||
        selectedDropdownDataAgreementValue[record.id]?.version ===
          record.version
          ? getLawfulBasisOfProcessing(record[props.source])
          : getLawfulBasisOfProcessing(
              selectedDropdownDataAgreementValue[record.id]?.lawfulBasis
            )}
      </Typography>
    );
  };

  const IconsFIeld = (props: any) => {
    const record = useRecordContext(props);
    const textColor = getIconColor(record);

    if (!record || !props.source) {
      return null;
    }

    return (
      record[props.source] && (
        <Box display={"flex"} justifyContent={"space-around"}>
          <Tooltip
            title={
              record.active === true
                ? t("dataAgreements.PublishedDAAlready")
                : t("dataAgreements.publishDA")
            }
            placement="top"
          >
            <UploadOutlinedIcon
              onClick={() => {
                record.active === false &&
                  (record?.selectedRevision === undefined ||
                    (record?.selectedRevision &&
                      record?.selectedRevision.version === record.version)) &&
                  setOpenPublishDataAgreementModal(true);
                setSelectededDataAgreementFromDataAgreement(record);
              }}
              fontSize="small"
              style={{
                cursor:
                  record.active === true ||
                  (record?.selectedRevision &&
                    record?.selectedRevision.version !== record.version)
                    ? "not-allowed"
                    : "pointer",
                color: textColor,
              }}
            />
          </Tooltip>
          <Tooltip title={t("dataAgreements.viewDA")} placement="top">
            <RemoveRedEyeOutlinedIcon
              onClick={() => {
                setOpenDataAgreementModal(true);
                setDataAgreementMode("Read");
                setSelectededDataAgreementFromDataAgreement(record);
              }}
              fontSize="small"
              style={{
                cursor: "pointer",
                color: textColor,
              }}
            />
          </Tooltip>
          <Tooltip title={t("dataAgreements.editDA")} placement="top">
            <EditOutlinedIcon
              onClick={() => {
                (record?.selectedRevision === undefined ||
                  (record?.selectedRevision &&
                    record?.selectedRevision.version === record.version)) &&
                  setOpenDataAgreementModal(true);
                setDataAgreementMode("Update");
                setSelectededDataAgreementFromDataAgreement(record);
              }}
              fontSize="small"
              style={{
                cursor:
                  record?.selectedRevision &&
                  record?.selectedRevision.version !== record.version
                    ? "not-allowed"
                    : "pointer",
                color: textColor,
              }}
            />
          </Tooltip>
          <Tooltip title={t("dataAgreements.deleteDA")} placement="top">
            <DeleteOutlineOutlinedIcon
              onClick={() => {
                (record?.selectedRevision === undefined ||
                  (record?.selectedRevision &&
                    record?.selectedRevision.version === record.version)) &&
                  setOpenDeleteDataAgreementModal(true),
                  setSelectededDataAgreementFromDataAgreement(record);
              }}
              fontSize="small"
              style={{
                cursor:
                  record?.selectedRevision &&
                  record?.selectedRevision.version !== record.version
                    ? "not-allowed"
                    : "pointer",
                color: textColor,
              }}
            />
          </Tooltip>
        </Box>
      )
    );
  };

  const VersionField = (props: any) => {
    const record = useRecordContext(props);

    if (!record || !props.source) {
      return null;
    }

    return (
      <VersionDropdown
        record={record}
        setSelectedValue={setSelectedDropdownValue}
        selectedValue={selectedDropdownValue}
        key={record.id}
        setSelectedDropdownDataAgreementValue={
          setSelectedDropdownDataAgreementValue
        }
      />
    );
  };

  return (
    <Container>
      <Form>
        <BreadCrumb Link={t("sidebar.dataAgreements")} />
        <HeaderContainer>
          <Box
            style={{
              maxWidth: "300px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {t("sidebar.dataAgreements")}
            </Typography>
            <Tooltip title={t("dataAgreements.createDA")} placement="top">
              <AddCircleOutlineOutlinedIcon
                onClick={() => {
                  setOpenDataAgreementModal(true);
                  setDataAgreementMode("Create");
                  setSelectededDataAgreementFromDataAgreement({});
                }}
                style={{ cursor: "pointer", marginLeft: "5px" }}
              />
            </Tooltip>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="all"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel
                  value="all"
                  onChange={() => handleChange("all")}
                  control={<Radio name="all" color="default" size="small" />}
                  label={
                    <Typography variant="body2">{t("common.all")}</Typography>
                  }
                />
                <FormControlLabel
                  value="complete"
                  onChange={() => handleChange("complete")}
                  control={
                    <Radio name="complete" color="default" size="small" />
                  }
                  label={
                    <Typography variant="body2">
                      {t("dataAgreements.published")}
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
            <Box>
              <Button
                style={buttonStyle}
                variant="outlined"
                sx={{
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                  color: "black",
                }}
                onClick={() => setOpenGlobalDataPolicyModal(true)}
              >
                {t("dataAgreements.globalDataPolicy")}
              </Button>
            </Box>
          </Box>
        </HeaderContainer>
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          {t("dataAgreements.pageDescription")}
        </Typography>
      </Form>
      <List
        actions={false}
        sx={{ width: "100%", overflow: "hidden" }}
        empty={<TableEmptyMessage />}
        filter={{ status: listFilterValue }}
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
              width: "100%",
            }}
            key={key}
          >
            <PurposeField
              source="purpose"
              label={t("dataAgreements.usagePurpose")}
              sortable={false}
            />
            <VersionField
              source="id"
              label={t("dataAgreements.version")}
              sortable={false}
              cellClassName="custom-version-column"
            />
            <DataExchangeField
              source="methodOfUse"
              label={t("dataAgreements.dataExchange")}
              sortable={false}
            />
            <PublishStatusField source="lifecycle" label={t("common.status")} />
            <LawfulBasisField
              source="lawfulBasis"
              label={t("dataAgreements.lawfulBasisOfProcessing")}
              sortable={false}
            />
            <IconsFIeld source="purpose" label={""} sortable={false} />
          </Datagrid>
        </Box>
      </List>
      {/* Modals */}

      {/* Create, Update & Read Data agreement */}
      <DataAgreementModal
        open={openDataAgreementModal}
        setOpen={setOpenDataAgreementModal}
        mode={dataAgreementMode}
        successCallback={onRefetch}
        selectededDataAgreementFromDataAgreement={
          selectededDataAgreementFromDataAgreement
        }
        setSelectedDropdownValue={setSelectedDropdownValue}
      />

      <GlobalDataPolicyConfigModal
        open={openGlobalDataPolicyModal}
        setOpen={setOpenGlobalDataPolicyModal}
      />

      {/* DeleteDataAgreementModal */}
      <DeleteModal
        open={openDeleteDataAgreementModal}
        setOpen={setOpenDeleteDataAgreementModal}
        headerText={`${t("dataAgreements.deleteDA")}:`}
        confirmText="DELETE"
        confirmButtonText={`${t("common.delete")}`}
        resourceName="dataagreements"
        onRefetch={onRefetch}
        selectededDataAgreementFromDataAgreement={
          selectededDataAgreementFromDataAgreement
        }
        modalDescriptionText={
          <Typography variant="body1">
            {t("dataAgreements.deleteDADescription1")}
            <b>DELETE</b>
            {t("dataAgreements.deleteDADescription2")}
          </Typography>
        }
        setSelectedDropdownValue={setSelectedDropdownValue}
      />

      {/* PublishDataAgreementModal */}
      <GeneralModal
        setSelectedDropdownValue={setSelectedDropdownValue}
        open={openPublishDataAgreementModal}
        setOpen={setOpenPublishDataAgreementModal}
        headerText={`${t("dataAgreements.publishDA")}:`}
        confirmText="PUBLISH"
        confirmButtonText={`${t("dataAgreements.publish")}`}
        onRefetch={onRefetch}
        resourceName="dataagreements"
        selectededDataAgreementFromDataAgreement={
          selectededDataAgreementFromDataAgreement
        }
        modalDescriptionText={
          <Typography variant="body1">
            {t("dataAgreements.publishDADescription1")}
            <b>PUBLISH</b>
            {t("dataAgreements.publishDADescription2")}
          </Typography>
        }
      />
    </Container>
  );
};

export default DataAgreement;
