import { useGetIdentity } from "react-admin";

import MenuIcon from "@mui/icons-material/Menu";

import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import { AppBarMenu } from "./AppBarMenu";
import { useSidebarState } from "ra-ui-materialui";

import Logo from "../../assets/GovstackLogo.svg";
import { useTranslation } from "react-i18next";

export default function MyAppBar() {
  const [open, setOpen] = useSidebarState();
  const { identity } = useGetIdentity();
  const { t } = useTranslation("translation");

  return (
    <Box>
      <AppBar
        sx={{
          backgroundColor: "#0A065E",
          height: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon style={{ height: 60, width: 60 }} />
          </IconButton>
          <img src={Logo} alt="Logo" />

          <Typography
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "contents" },
            }}
            variant="h6"
          >
            {t("appbar.appbarHeader")}
          </Typography>
          <AppBarMenu
            firstName={identity?.name}
            lastVisited={identity?.lastVisited}
            email={identity?.email}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
