import { Box, Link, Typography } from "@material-ui/core";
import React, { ReactNode } from "react";
import { CSSProperties } from "react";
import WarningIcon from "@material-ui/icons/Warning";
import eatAppLogo from "../../assets/logos/eatAppLogo.png";

interface IState {
  hasError: boolean;
}

interface IProps {
  children: ReactNode;
}
class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box>
          <Box style={errorContainer}>
            <Box mb={10} display="flex" justifyContent="center">
              <img
                style={imageStyling}
                src={eatAppLogo}
                alt="EatApp Logotype"
              />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box mb={3}>
                <WarningIcon fontSize="large" />
              </Box>
              <Typography variant="h5">Sorry! Something went wrong.</Typography>
              <Link color="secondary" href="/">
                <Typography variant="h5">
                  Please return to the frontpage.
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
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

export default ErrorBoundary;
