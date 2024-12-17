import { Menu, MenuProps } from "react-admin";
import { Box } from "@mui/material";
import { useSidebarState } from "ra-ui-materialui";
import { useState } from "react";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import SubMenu from "./SubMenu";
import { configStore } from "../../store/configStore";
import { useTranslation } from "react-i18next";
import Footer from "./Footer";

type MenuName = "manageusers" | "account";

export default function MyMenu({ dense = false }: MenuProps) {
  const [open] = useSidebarState();
  let version = configStore.appVersion;
  const { t } = useTranslation("translation");

  const [state, setState] = useState({
    manageusers: false,
    account: false,
  });

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Menu
      sx={{
        marginTop: 0,
        position: "fixed",
        height: "100vh",
        backgroundColor: "#F7F6F6",
        paddingTop: "48px",
        top: { xs: 0, sm: 54 },
        bottom: 0,
      }}
    >
      <Menu.ResourceItem name="start" />
      <Menu.ResourceItem name="dataagreement" />
      <Menu.ResourceItem name="personaldata" />
      <SubMenu
        handleToggle={() => handleToggle("manageusers")}
        isOpen={state.manageusers}
        name={t("sidebar.manageUsers")}
        icon={<PeopleAltOutlinedIcon />}
        dense={!dense}
      >
        <Menu.Item
          to="/configuration"
          primaryText={t("sidebar.configuration")}
        />
        <Menu.Item
          to="/consentrecords"
          primaryText={t("sidebar.consentRecords")}
        />
      </SubMenu>
      <Menu.ResourceItem name="privacydashboard" />
      <SubMenu
        handleToggle={() => handleToggle("account")}
        isOpen={state.account}
        name={t("sidebar.account")}
        icon={<LockOutlinedIcon />}
        dense={!dense}
      >
        <Menu.Item to="/manageadmin" primaryText={t("sidebar.manageAdmin")} />
        <Menu.Item
          to="/developerapi"
          primaryText={t("sidebar.developerAPIs")}
        />
        <Menu.Item to="/viewlogs" primaryText={t("sidebar.viewLogs")} />
        <Menu.Item to="/webhooks" primaryText={t("sidebar.webhooks")} />
      </SubMenu>

      {open ? (
        <Box
          sx={{
            marginTop: "auto",
            paddingBottom: 10,
            textAlign: "center",
          }}
        >
          <Footer version={version} />
        </Box>
      ) : null}
    </Menu>
  );
}
