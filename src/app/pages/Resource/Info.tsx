import * as React from "react";
import { Box, Button, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import {
  Explore as ExploreIcon,
  Favorite as FavoriteIcon,
  FileCopy as FileCopyIcon,
  MovieFilter as MovieFilterIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";

import { ResourceInfo } from "API";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(4),
      [theme.breakpoints.up("sm")]: {
        paddingTop: theme.spacing(6),
      },
    },
    title: {
      marginRight: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        marginRight: theme.spacing(4),
      },
    },
    enTitle: {
      alignSelf: "flex-end",
    },
    alias: {
      marginTop: theme.spacing(1),
    },
    attribute: {
      marginTop: theme.spacing(3),
    },
    label: {
      marginLeft: theme.spacing(1),
    },
  })
);

interface InfoPropTypes {
  loading: boolean;
  resourceInfo: ResourceInfo;
  url: string;
}

export function Info(props: InfoPropTypes) {
  const { loading, resourceInfo, url } = props;

  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  return (
    <div>
      <Box css={{ display: "flex", flexWrap: "wrap" }}>
        <Typography component="h1" variant="h4" className={classes.title}>
          {loading ? <Skeleton variant="rect" width={200} /> : resourceInfo.cnname}
        </Typography>

        <Typography className={classes.enTitle}>
          {loading ? <Skeleton variant="rect" width={100} /> : resourceInfo.enname}
        </Typography>
      </Box>
      <Typography className={classes.alias} variant="body2">
        {loading ? <Skeleton variant="rect" width="100%" /> : resourceInfo.aliasname}
      </Typography>
      <Grid container className={classes.attribute}>
        <Grid item xs={4} sm={3} md={2}>
          <Box display="flex" alignItems="center">
            <MovieFilterIcon />
            <Typography className={classes.label}>
              {loading ? <Skeleton variant="rect" width={50} height={24} /> : resourceInfo.channel_cn}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box display="flex" alignItems="center">
            <ExploreIcon />
            <Typography className={classes.label}>
              {loading ? <Skeleton variant="rect" width={50} height={24} /> : resourceInfo.area}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Box display="flex" alignItems="center">
            <VisibilityIcon />
            <Typography className={classes.label}>
              {loading ? <Skeleton variant="rect" width={50} height={24} /> : resourceInfo.views}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container className={classes.attribute}>
        <Grid item xs={4} sm={3} md={2}>
          {loading ? (
            <Skeleton variant="rect" width={100} height={30} />
          ) : (
            <Button variant="contained" color="secondary" size="small" startIcon={<FavoriteIcon />}>
              收藏资源
            </Button>
          )}
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          {loading ? (
            <Skeleton variant="rect" width={100} height={30} />
          ) : (
            <CopyToClipboard
              text={url}
              onCopy={() => {
                enqueueSnackbar("复制成功，快去分享给小伙伴吧", { variant: "success" });
              }}
            >
              <Button variant="contained" color="primary" size="small" startIcon={<FileCopyIcon />}>
                复制页面
              </Button>
            </CopyToClipboard>
          )}
        </Grid>
      </Grid>
    </div>
  );
}