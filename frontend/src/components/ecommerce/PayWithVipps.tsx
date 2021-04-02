import { Card, CardActionArea, CardMedia, CircularProgress, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { INITIATE_ORDER } from "@graphql/ecommerce/mutations";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 300,
    background: "inherit",
  },
}));

const PayWithVipps: React.FC = () => {
  const [initiateOrder, { data, loading, error }] = useMutation(INITIATE_ORDER);

  const classes = useStyles();
  const router = useRouter();

  if (loading) return <CircularProgress />;

  if (data && data.redirect) {
    router.push(data.redirect);
    return null;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => initiateOrder({ variables: { productId: 1 } })} disableRipple>
        <CardMedia
          component="img"
          alt="Pay with vipps"
          image="/img/pay_with_vipps_rect_250_NO.svg"
          title="Pay with vipps"
        />
      </CardActionArea>
      {error && <Typography>{error.message}</Typography>}
    </Card>
  );
};

export default PayWithVipps;
