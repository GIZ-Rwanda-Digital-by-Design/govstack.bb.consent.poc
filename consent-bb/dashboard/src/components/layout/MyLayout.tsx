import { Layout } from "react-admin";
import MyAppBar from "./MyAppBar";
import MyMenu from "./MyMenu";
import { OrganizationDetailsCRUDProvider } from "../providers/organizationDetailsCRUDProvider";

export const MyLayout = (props: object) => {
  return (
    <OrganizationDetailsCRUDProvider>
      <Layout {...props} appBar={MyAppBar} menu={MyMenu} />
    </OrganizationDetailsCRUDProvider>
  );
};
