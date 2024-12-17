import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
  height: '100vh',
  backgroundColor: "#FFFF",
  marginTop: 0,
  width: '480px',
  [theme.breakpoints.down('md')]: {
    marginTop: 0,
    width: '380px',
  },
}));

const HeaderContainer = styled('div')({
  fontSize: '16px',
  backgroundColor: "#0A065E",
  display: "flex",
  alignItems: "center",
  height: '80px',
  width: '100%',
  justifyContent: "space-between",
})

const BannerContainer = styled('div')(({ theme }) => ({
  height: 150,
  width: '100%',
  backgroundColor: "#E6E6E6",
  marginTop: '0px',
  [theme.breakpoints.down('md')]: {
    marginTop: 0,
    width: '380px',
  },
}));

const DetailsContainer = styled('div')(({ theme }) => ({
  width: '480px',
  borderRadius: 2,
  backgroundColor: "#FFFF",
  [theme.breakpoints.down('md')]: {
    width: '370px',
  },
}));

const FooterContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: '0px',
  width: '480px',
  borderTop: '1px solid #E9ECEF',
  height: "65px",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
  backgroundColor: 'white',
  zindex: 1,
  [theme.breakpoints.down('md')]: {
    width: '380px',
  },
}));

const buttonStyle = {
  height: 30,
  width: 150,
  borderRadius: 0,
  border: '1px solid #DFDFDF'
}

const disabledButtonstyle = {
  height: 30,
  width: 150,
  borderRadius: 0,
  border: '1px solid #EAEAEA'
}

export { Container, HeaderContainer,BannerContainer, DetailsContainer, FooterContainer, buttonStyle, disabledButtonstyle }
