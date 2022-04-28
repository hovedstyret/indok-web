import { Listing } from "@interfaces/listings";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  hero: {
    width: "100%",
    maxHeight: "25vh",
    height: "25vh",
  },
  background: {
    background: "url(/nth.svg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.04,
  },
}));

type Props = {
  imageUrl?: string | null;
};

/**
 * Component for banner image on listing detail page.
 *
 * Props:
 * - the listing from the detail page
 */
const ListingBanner: React.FC<Props> = ({ imageUrl }) => {
  const classes = useStyles();
  return (
    <>
      {imageUrl ? (
        <Box
          className={`${classes.hero}`}
          style={{
            background: `url(${imageUrl})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: 0.5,
          }}
        />
      ) : (
        <Box className={`${classes.background} ${classes.hero}`} />
      )}
    </>
  );
};

export default ListingBanner;
