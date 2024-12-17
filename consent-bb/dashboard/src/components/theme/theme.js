import { defaultTheme } from "react-admin";

export const theme = {
  ...defaultTheme,
  palette: {
    background: {
      default: "#FFFF",
    },
  },
  sidebar: {
    closedWidth: 0,
  },
  components: {
    ...defaultTheme.components,
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "14px", // Change the font size
          black: "black", // Change the text color
        },
      },
    },
    RaList: {
      styleOverrides: {
        root: {
          "& .RaList-content": {
            boxShadow: "none",
          },
        },
      },
    },
    RaDatagrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFF",
          "& .RaDatagrid-headerCell": {
            fontWeight: "bold",
            backgroundColor: "#E5E4E4",
            border: "1px solid #D7D6D6",
            fontSize: "14px",
          },
          "& .RaDatagrid-rowCell	": {
            border: "1px solid #D7D6D6",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            "&.Mui-focused fieldset": {
              borderColor: "black",
              borderWidth: "1px",
            },
          },
          input: {
            "&::placeholder": {
              fontSize: "14px",
            }
          }
        }
      }
    }
  }
};
