import { Box, CircularProgress, Link, Typography } from "@material-ui/core";
import React, { ReactNode, useEffect, useState } from "react";
import { CSSProperties } from "react";
import WarningIcon from "@material-ui/icons/Warning";
import eatAppLogo from "../../assets/logos/eatAppLogo.png";

interface IState {
  hasError: boolean;
}

interface IProps {}
function PageNotFound() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <Box
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      <Box style={errorContainer}>
        <Box mb={10} display="flex" justifyContent="center">
          <img style={imageStyling} src={eatAppLogo} alt="EatApp Logotype" />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mb={3}>
            <WarningIcon fontSize="large" />
          </Box>
          <Typography variant="h2">404</Typography>
          <Typography variant="h5">
            Oj, denna sidan verkar inte existera.
          </Typography>
          <Link color="secondary" href="/">
            <Typography variant="h5">Återgå till startsidan.</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
const errorContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
  objectFit: "contain",

  background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
  //   background-color: #FBAB7E;
  // background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
};

const imageStyling: CSSProperties = {
  width: "70%",
};

export default PageNotFound;
