import { useEffect, useState } from "react";
import { List, Datagrid, TextField, Form, useRefresh } from "react-admin";

import {
  Box,
  Typography,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import BreadCrumb from "../../components/Breadcrumbs";
import EditPersonalDataModal from "../../components/modals/editPersonalDataModal";
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

const PersonalData = () => {
  const [openEditPersonalDataModal, setOpenEditPersonalDataModal] =
    useState(false);
  const [listFilterValue, setListFilterValue] = useState("all");
  const { t } = useTranslation("translation");
  const key = useLanguageChange();

  const refresh = useRefresh();

  const onRefetch = () => {
    refresh();
  };

  const handleChange = (value: any) => {
    if (value === "data_source") {
      setListFilterValue("data_source");
    } else if (value === "data_using_service") {
      setListFilterValue("data_using_service");
    } else if (value === "all") {
      setListFilterValue("all");
    }
  };

  return (
    <Container>
      <Form>
        <BreadCrumb Link={t("sidebar.personalData")} />
        <HeaderContainer>
          <Typography variant="h6" fontWeight="bold">
            {t("sidebar.personalData")}
          </Typography>
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
                control={<Radio name={"all"} color="default" size="small" />}
                label={
                  <Typography variant="body2">{t("common.all")}</Typography>
                }
              />
              <FormControlLabel
                value="data_source"
                onChange={() => handleChange("data_source")}
                control={
                  <Radio name={"data_source"} color="default" size="small" />
                }
                label={
                  <Typography variant="body2">
                    {t("dataAgreements.dataSource")}
                  </Typography>
                }
              />
              <FormControlLabel
                value="data_using_service"
                onChange={() => handleChange("data_using_service")}
                control={
                  <Radio
                    name={"data_using_service"}
                    color="default"
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    {t("dataAgreements.dataUsingService")}
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </HeaderContainer>
        <Typography variant="body2" mt={1.25}>
          {t("personalData.pageDescription")}
        </Typography>
      </Form>
      <List
        actions={false}
        sx={{ width: "100%", overflow: "hidden" }}
        filter={{ status: listFilterValue }}
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
            rowClick="edit"
            key={key}
          >
            <TextField
              source="name"
              label={t("personalData.dataAttributeName")}
              sortable={false}
            />
            <TextField
              source="description"
              label={t("common.description")}
              sortable={false}
            />
            <TextField
              source="dataAgreement.purpose"
              label={t("personalData.dataAgreement")}
              sortable={false}
            />
            {/* Edit icon temporarily hidden */}
            {/* <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Tooltip title="Edit Personal Data" placement="top">
                <EditOutlinedIcon
                  onClick={() => {
                    setOpenEditPersonalDataModal(true);
                  }}
                  fontSize="small"
                  color="disabled"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
            </Box> */}
          </Datagrid>
        </Box>
      </List>

      {/* Modals */}

      <EditPersonalDataModal
        open={openEditPersonalDataModal}
        setOpen={setOpenEditPersonalDataModal}
        headerText={"Edit Personal Data: "}
        onRefetch={onRefetch}
      />
    </Container>
  );
};

export default PersonalData;
