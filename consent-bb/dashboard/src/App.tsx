// react-admin
import { Admin, Resource } from 'react-admin'

// main layout
import { MyLayout } from './components/layout/MyLayout';

// pages
import { Login } from './pages/login/Login';
import GettingStarted from "./pages/gettingStarted/GettingStarted"
import DataAgreements from "./pages/dataAgreements/DataAgreements"
import PersonalData from './pages/personalData/personalData';
import UserRecords from './pages/userRecords/userRecords';

import { dataProvider } from './components/providers/dataProvider';
import { authProvider } from './components/providers/authprovider'
import { theme } from './components/theme/theme'

// icons
import HouseIcon from '@mui/icons-material/HouseOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import UserAccess from './pages/userAccess/userAcess';
import Privacyboard from './pages/privacyBoard/privacyBoard';
import ManageAdmin from './pages/manageAdmin/manageAdmin';
import DeveloperAPIs from './pages/developerAPIs/developerAPIs'
import ViewLogs from './pages/viewLogs/viewLogs';
import Webhooks from './pages/webhooks/webhooks';
import { QueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation("translation");

  const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
          },
      },
  });    

  return (
    <Admin queryClient={queryClient}  layout={MyLayout} loginPage={Login} dataProvider={dataProvider} theme={theme} authProvider={authProvider} requireAuth>
      <Resource name='start' options={{ label: t("sidebar.gettingStarted") }} list={GettingStarted} icon={HouseIcon} />
      <Resource name='dataagreement' options={{ label: t("sidebar.dataAgreements") }} list={DataAgreements} icon={InsertDriveFileOutlinedIcon}  />
      <Resource name='personaldata' options={{ label: t("sidebar.personalData") }} list={PersonalData} icon={InsertChartOutlinedOutlinedIcon}/>
      <Resource name='configuration' options={{ label: t("sidebar.configuration") }} list={UserAccess}/>
      <Resource name='consentrecords' options={{ label: t("sidebar.consentRecords")}} list={UserRecords} />
      <Resource name='privacydashboard' options={{ label: t("sidebar.privacyDashboard") }} list={Privacyboard} icon={HealthAndSafetyOutlinedIcon} />
      <Resource name='manageadmin' options={{ label: t("sidebar.manageAdmin") }} list={ManageAdmin} />
      <Resource name='developerapi' options={{ label: t("sidebar.developerAPIs") }} list={DeveloperAPIs} />
      <Resource name='viewlogs' options={{ label: t("sidebar.viewLogs") }} list={ViewLogs} />
      <Resource name='webhooks' options={{ label: t("sidebar.Webhooks") }} list={Webhooks} />
    </Admin>
  );
}

export default App;