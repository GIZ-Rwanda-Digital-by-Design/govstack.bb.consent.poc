import { useState } from "react";
import {
  List,
  Datagrid,
  Form,
  useRefresh,
  useRecordContext,
} from "react-admin";

import { Box, Typography, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

import BreadCrumb from "../../components/Breadcrumbs";
import GeneralModal from "../../components/modals/generalModal";
import EditWebhooks from "../../components/modals/editwebhooksmodal";
import RecentDeliveries from "../../components/webhooks/recentDeliveries";
import { HttpService } from "../../service/HTTPService";
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

const Webhooks = () => {
  const [openEditWebhooks, setOpenEditWebhooks] = useState(false);
  const [openDeleteWebhooks, setOpenDeleteWebhooks] = useState(false);
  const [showRecentDeliveries, setShowRecentDeliveries] = useState(false);
  const [recentDeliveryValues, setRecentDeliveryValues] = useState([]);
  const [webhookDetailsForUpdate, setWebhookDetailsForUpdate] = useState<any>();
  const [modeOfPopup, setModeOfPopup] = useState("");
  const { t } = useTranslation("translation");
  const key = useLanguageChange();

  const [lastSelectedRecentDeliveryID, setLastSelectedRecentDeliveryID] =
    useState();
  const refresh = useRefresh();

  const onRefetch = () => {
    refresh();
  };

  const recentDeliveries = (recordid: any) => {
    if (recordid) {
      if (recordid === lastSelectedRecentDeliveryID) {
        setShowRecentDeliveries(!showRecentDeliveries);
      } else {
        setLastSelectedRecentDeliveryID(recordid);

        HttpService.getWebhooksRecentDeliveries(recordid).then((res) => {
          setRecentDeliveryValues(res.data.webhookDeliveries);
          setShowRecentDeliveries(true);
        });
      }
    }
  };

  const ColoredField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return record[props.source] === true ? (
      <DoneIcon sx={{ color: "green" }} />
    ) : (
      <CloseIcon sx={{ color: "red" }} />
    );
  };

  const PayloadURLFIeld = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      <Typography
        variant="body2"
        sx={{ cursor: "pointer" }}
        onClick={() => {
          recentDeliveries(record.id);
        }}
      >
        {record[props.source]}
      </Typography>
    );
  };

  const IconsField = (props: any) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
      return null;
    }
    return (
      record[props.source] && (
        <Box
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Tooltip title={t("webhooks.editWebhooks")} placement="top">
            <EditOutlinedIcon
              onClick={() => {
                setOpenEditWebhooks(true);
                setModeOfPopup("Update");
                setWebhookDetailsForUpdate(record);
              }}
              fontSize="small"
              color="disabled"
              style={{ cursor: "pointer", marginRight: 10 }}
            />
          </Tooltip>
          <Tooltip title={t("webhooks.deleteWebhooks")} placement="top">
            <DeleteOutlineOutlinedIcon
              onClick={() => {
                setOpenDeleteWebhooks(true);
                setWebhookDetailsForUpdate(record);
              }}
              fontSize="small"
              color="disabled"
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        </Box>
      )
    );
  };

  return (
    <Container>
      <Form>
        <BreadCrumb Link={t("sidebar.account")} Link2={t("sidebar.webhooks")} />
        <HeaderContainer>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {t("sidebar.webhooks")}
            </Typography>
            <Tooltip title="Create Webhooks" placement="top">
              <AddCircleOutlineOutlinedIcon
                onClick={() => {
                  setOpenEditWebhooks(true);
                  setModeOfPopup("Create");
                }}
                style={{ cursor: "pointer", marginLeft: "7px" }}
              />
            </Tooltip>
          </Box>
        </HeaderContainer>
        <Typography variant="body2" mt={1.25}>
          {t("webhooks.pageDescription")}
        </Typography>
      </Form>
      <List
        empty={<TableEmptyMessage />}
        actions={false}
        sx={{ width: "100%", overflow: "hidden" }}
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
            <PayloadURLFIeld
              source="payloadUrl"
              sortable={false}
              label={t("webhooks.webhookURL")}
            />
            <ColoredField
              source="isLastDeliverySuccess"
              label={t("common.status")}
              textAlign={"center"}
              sortable={false}
            />
            <IconsField source="id" sortable={false} label={""} />
          </Datagrid>
        </Box>
      </List>

      {showRecentDeliveries && recentDeliveryValues.length > 0 && (
        <RecentDeliveries recentDeliveryValues={recentDeliveryValues} />
      )}

      {/* Modals */}

      {/* DeletePersonalModal */}
      <GeneralModal
        open={openDeleteWebhooks}
        setOpen={setOpenDeleteWebhooks}
        headerText={t("webhooks.deleteWebhooks")}
        confirmText="DELETE"
        confirmButtonText={`${t("common.delete")}`}
        resourceName={"webhooks"}
        selectedWebhookDetails={webhookDetailsForUpdate}
        onRefetch={onRefetch}
        modalDescriptionText={
          <Typography variant="body1">
            {t("webhooks.deleteDescription1")} <b>DELETE</b>
            {t("webhooks.deleteDescription2")}
          </Typography>
        }
      />

      <EditWebhooks
        open={openEditWebhooks}
        setOpen={setOpenEditWebhooks}
        headerText={t("webhooks.configureWebhook")}
        mode={modeOfPopup}
        onRefetch={onRefetch}
        webhookDetailsForUpdate={webhookDetailsForUpdate}
      />
    </Container>
  );
};

export default Webhooks;
