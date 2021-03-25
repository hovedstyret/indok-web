import { Listing } from "@interfaces/listings";
import { Box, makeStyles, Grid, Typography, Button, Hidden, Container } from "@material-ui/core";
import ArrowForward from "@material-ui/icons/ArrowForward";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import nb from "dayjs/locale/nb";
import Link from "next/link";
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Europe/Oslo");
dayjs.locale(nb);

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    marginTop: "-7%",
    position: "relative",
    zIndex: 10,
  },
  cardContent: {
    padding: theme.spacing(4),
    objectPosition: "center",
  },
  deadline: {
    "&::before": {
      content: "'Frist '",
      fontWeight: "bold",
      color: theme.palette.primary.main,
    },
  },
  card: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  descriptionText: {
    /* https://stackoverflow.com/a/13924997 */
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2 /* number of lines to show */,
    "-webkit-box-orient": "vertical",
  },
  organizationName: {
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.h6.fontSize
    }
  }
}));

/*
  component for the banner on the listing detail page (with "hero image")
  props: the listing for which to show the banner
*/
const ListingBanner: React.FC<{
  listing: Listing;
}> = ({ listing }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container direction="row" justify="center">
        <Grid container item direction="row" justify="space-between" alignItems="stretch" xs={10}>
          <Hidden smDown>
            <Grid
              container
              item
              xs={4}
              direction="column"
              justify="center"
              alignItems="stretch"
              className={classes.cardRoot}
            >
              <Grid
                container
                item
                direction="column"
                alignItems="center"
                justify="space-between"
                className={`${classes.card} ${classes.cardContent}`}
              >
                <Grid item style={{width: "100%"}}>
                  <Typography variant="h5" component="h2" align="center" className={`${classes.organizationName} ${classes.descriptionText}`}>
                    {listing.organization?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption" align="center" component="span" className={classes.descriptionText}>
                    {listing.organization?.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button endIcon={<OpenInNewIcon />} href={`/about/organizations/${listing.organization?.slug}`} >
                    Les mer
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          <Grid item xs={1}>
          </Grid>
          </Hidden>
          <Grid
            container
            item
            sm={12}
            md={7}
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.cardRoot}
          >
            <Grid container item direction="column" justify="center" alignItems="stretch">
              <Grid
                container
                item
                direction="row"
                justify="space-between"
                alignItems="stretch"
                className={classes.card}
              >
                <Grid
                  container
                  item
                  xs
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className={classes.cardContent}
                >
                  <Grid item>
                    <Typography variant="h3" component="h1" align="center">
                      {listing.title}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      variant="caption"
                      component="h3"
                      align="center"
                      className={classes.deadline}
                      gutterBottom
                    >
                      {dayjs(listing.deadline).format("DD. MMMM YYYY [kl.] HH:mm")}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {listing.url && (
                      <Link href={listing.url}>
                        <a>
                          <Button variant="contained" color="primary" endIcon={<ArrowForward />}>
                            Søk her
                          </Button>
                        </a>
                      </Link>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ListingBanner;
