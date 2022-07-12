import React from "react";
import { CircularProgress, CircularProgressProps } from "@mui/material";

/**
 *
 * @param {import("@material-ui/core").CircularProgressProps} props
 */
function LoadingIndicator(props: CircularProgressProps) {
  return <CircularProgress {...props} />;
}

export default LoadingIndicator;
