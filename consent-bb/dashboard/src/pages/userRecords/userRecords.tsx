import { useEffect, useState } from "react";
import { List, Datagrid, TextField, Form, useRecordContext } from "react-admin";

import {
  Box,
  Typography,
  Tooltip,
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import DataAgreementModal from "../../components/modals/dataAgreementModal";
import { useFilterStore } from "../../store/store";
import FilterByPurposeDropdown from "../../components/dropdowns/filterByPurposeDropDown";
import FilterByLawfulBasisDropdown from "../../components/dropdowns/filterByLawfulBasisDropDown";
import { SearchByIdRecords } from "../../components/dropdowns/searchByIdRecordsAutoselect";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TableEmptyMessage } from "../../components/tableEmptyMessage";
import useLanguageChange from "../../utils/translateTableLanguage";
import { HttpService } from "../../service/HTTPService";

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
  width: "100%",
});

const Item = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "10px 30px 10px 30px",
  marginTop: "16px",
  justifyContent: "space-between",
  flexWrap: "wrap",
  color: "#0000",
  height: "auto",
  borderRadius: 3,
  border: "1px solid #E1E1E1",
  [theme.breakpoints.down("sm")]: {
    display: "grid",
  },
}));

const UserRecords = () => {
  const [openDataAgreementModal, setOpenDataAgreementModal] = useState(false);
  const [handleChangeTriggered, setHandleChangeTriggered] = useState(false);
  const [handleFilterDropDownTriggered, setHandleFilterDropDownTriggered] =
    useState(false);
  const [handleSearchTriggered, sethandleSearchTriggered] = useState(false);
  const [listFilterValue, setListFilterValue] = useState({
    filterType: "all",
    value: "all",
  });
  const { t } = useTranslation("translation");
  const key = useLanguageChange();

  const lawfullBasisOfProcessingDropdownvalues = [
    { value: "consent", label: t("dataAgreements.consent") },
    { value: "contract", label: t("dataAgreements.contract") },
    { value: "legal_obligation", label: t("dataAgreements.legalObligation") },
    { value: "vital_interest", label: t("dataAgreements.vitalInterest") },
    { value: "public_task", label: t("dataAgreements.publicTask") },
    {
      value: "legitimate_interest",
      label: t("dataAgreements.legitimateInterest"),
    },
  ];

  const [
    selectededDataAgreementFromDataAgreement,
    setSelectededDataAgreementFromDataAgreement,
  ] = useState<any>();

  const updateDisabledPurposeDropDown = (disabledPurposeDropDown: any) => {
    useFilterStore
      .getState()
      .updateDisabledPurposeDropDown(disabledPurposeDropDown);
  };

  const updateDisabledLawfulBasisDropDown = (
    disabledLawfulBasisDropDown: any
  ) => {
    useFilterStore
      .getState()
      .updateDisabledLawfulBasisDropDown(disabledLawfulBasisDropDown);
  };

  const location = useLocation();

  // Listen for route changes and reset the Zustand store when the route changes
  useEffect(() => {
    updateDisabledPurposeDropDown(true);
    updateDisabledLawfulBasisDropDown(true);
    setListFilterValue({
      filterType: "all",
      value: "all",
    });
  }, [location.pathname]);

  const handleChange = (e: any) => {
    setHandleChangeTriggered(!handleChangeTriggered);
    const { name } = e.target;

    if (name === "dataAgreementId") {
      updateDisabledPurposeDropDown(false);
      updateDisabledLawfulBasisDropDown(true);
    } else if (name === "lawfulBasis") {
      updateDisabledPurposeDropDown(true);
      updateDisabledLawfulBasisDropDown(false);
    } else if (name === "all") {
      setListFilterValue({
        filterType: "all",
        value: "all",
      });
      updateDisabledPurposeDropDown(true);
      updateDisabledLawfulBasisDropDown(true);
    } else {
      setListFilterValue({
        filterType: "all",
        value: "all",
      });
      updateDisabledPurposeDropDown(true);
      updateDisabledLawfulBasisDropDown(true);
    }
  };

  const IconsFIeld = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      record[props.source] && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Tooltip title={t("dataAgreements.viewDA")} placement="top">
          <RemoveRedEyeOutlinedIcon
              onClick={() => {
                HttpService.listDataAgreements(
                  0,
                  10,
                  "",
                  record.dataAgreementRevisionId,
                  ""
                ).then((response) => {
                  let dataAgreements = response.dataAgreements[0];

                  setSelectededDataAgreementFromDataAgreement(dataAgreements);
                  setOpenDataAgreementModal(true);
                });
              }}
              fontSize="small"
              
              style={{ cursor: "pointer", color:"#4D4D4F" }}
            />
          </Tooltip>
        </Box>
      )
    );
  };

  return (
    <Container>
      <Form>
        <BreadCrumb
          Link={t("sidebar.manageUsers")}
          Link2={t("sidebar.consentRecords")}
        />
        <HeaderContainer>
          <Typography variant="h6" fontWeight="bold">
            {t("sidebar.consentRecords")}
          </Typography>
        </HeaderContainer>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2">
            {t("consentRecords.pageDescription")}
          </Typography>
          <SearchByIdRecords
            changefilter={setListFilterValue}
            handleSearchTriggered={handleSearchTriggered}
            sethandleSearchTriggered={sethandleSearchTriggered}
          />
        </Box>
        <Item>
          <Typography color="grey" variant="body2">
            {t("consentRecords.filterQuery")}
          </Typography>
          <FormControl
            sx={{
              width: "70%",
            }}
          >
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="all"
              defaultValue="all"
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  value="all"
                  name="all"
                  onClick={handleChange}
                  control={<Radio color="default" size="small" />}
                  label=""
                  sx={{ color: "black" }}
                />
                <Typography sx={{ color: "black" }} variant="body2">
                  {t("common.viewAll")}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  value="dataAgreementId"
                  name="dataAgreementId"
                  control={<Radio color="default" size="small" />}
                  label=""
                  onClick={handleChange}
                />
                <FilterByPurposeDropdown
                  displayValue={t("consentRecords.filterByPurpose")}
                  changefilter={setListFilterValue}
                  setHandleFilterDropDownTriggered={
                    setHandleFilterDropDownTriggered
                  }
                  handleFilterDropDownTriggered={handleFilterDropDownTriggered}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {" "}
                <FormControlLabel
                  name={"lawfulBasis"}
                  value="lawfulBasis"
                  onClick={handleChange}
                  control={<Radio color="default" size="small" />}
                  label=""
                />
                <FilterByLawfulBasisDropdown
                  displayValue={t("consentRecords.filterByLawfulBasis")}
                  dropdownValues={lawfullBasisOfProcessingDropdownvalues}
                  changefilter={setListFilterValue}
                  setHandleFilterDropDownTriggered={
                    setHandleFilterDropDownTriggered
                  }
                  handleFilterDropDownTriggered={handleFilterDropDownTriggered}
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Item>
      </Form>
      <List
        actions={false}
        empty={<TableEmptyMessage />}
        sx={{ width: "100%", overflow: "hidden" }}
        filter={{ status: listFilterValue }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "18px",
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
              source="consentRecordId"
              label={t("consentRecords.consentRecordID")}
              sortable={false}
            />
            <TextField
              source="individualId"
              label={t("consentRecords.individualID")}
              sortable={false}
            />
            <TextField
              source="dataAgreement.purpose"
              label={t("consentRecords.purpose")}
              sortable={false}
            />
            <TextField
              source="dataAgreement.version"
              label={t("dataAgreements.version")}
              sortable={false}
            />
            <TextField
              source="dataAgreement.lawfulBasis"
              label={t("consentRecords.lawfulBasis")}
              sortable={false}
            />
            <TextField
              source="optIn"
              label={t("consentRecords.agreementEvent")}
              sortable={false}
            />
            <TextField
              source="timestamp"
              label={t("common.timestamp")}
              sortable={false}
            />
            <IconsFIeld source="consentRecordId" label={""} sortable={false} />
          </Datagrid>
        </Box>
      </List>
      {/* Modals */}

      {/* Read Data agreement */}
      <DataAgreementModal
        open={openDataAgreementModal}
        setOpen={setOpenDataAgreementModal}
        mode={"Read"}
        resourceName="userrecords"
        selectededDataAgreementFromDataAgreement={
          selectededDataAgreementFromDataAgreement
        }
      />
    </Container>
  );
};

export default UserRecords;
