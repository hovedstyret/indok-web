import { Grid, Typography } from "@material-ui/core";
import Form from "@public/illustrations/Form.svg";
import LinkAction from "./actions/LinkAction";
import ProfileCardBase from "./ProfileCardBase";

/** Displays a card on the profile page that links to the user's submitted listing applications. */
const FormCard: React.VFC = (props) => {
  return (
    <ProfileCardBase
      title="Vervsøknader"
      Action={<LinkAction text="Se verv" link="/listings" />}
      image={Form}
      alt=""
      {...props}
    >
      <Grid container direction="column">
        <Grid item>
          <Typography variant="body2">Her kan du se en oversikt over alle dine innsendte søknader på verv.</Typography>
        </Grid>
      </Grid>
    </ProfileCardBase>
  );
};

export default FormCard;
