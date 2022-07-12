import React from "react";
import { Box, IconButton, Icon } from "@mui/material";
import LoadingIndicator from "./LoadingIndicator";

interface ContentLoadingProps {
  size?: number;
  error?: any;
  loading?: boolean;
  children: any;
  onReload?: () => void;
  onMount?: () => void;
  loadingContent?: JSX.Element;
  errorContent?: JSX.Element;
}

/**
 *
 * @param {ContentLoadingProps} props
 */
function ContentLoading(props: ContentLoadingProps): JSX.Element {
  const {
    size,
    error,
    loading,
    children,
    onReload,
    onMount,
    loadingContent,
    errorContent,
    ...rest
  } = props;

  if (!loading && !error) {
    return children;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={2}
      {...rest}
    >
      {error ? (
        <React.Fragment>
          {/* <Typography variant="body2">Refresh</Typography> */}
          {errorContent || (
            <IconButton onClick={onReload} color="primary">
              <Icon fontSize="large" style={{ fontSize: size }}>
                refresh
              </Icon>
            </IconButton>
          )}
        </React.Fragment>
      ) : (
        loadingContent || <LoadingIndicator size={size} />
      )}
    </Box>
  );
}

ContentLoading.defaultProps = {
  size: 40,
  children: null,
};

export default ContentLoading;

/**
 * @typedef {{
 * size: string | number,
 * onMount: Function,
 * onReload: Function,
 * error: boolean,
 * loading: boolean,
 * errorContent: React.ReactNode,
 * loadingContent: React.ReactNode,
 * } & import("@material-ui/core").BoxProps} ContentLoadingProps
 */
