import { Button, Grid, Typography } from "@material-ui/core";
import Form from "@public/illustrations/Form.svg";
import ProfileCard from "..";

const FormCard: React.VFC = () => {
  return (
    <ProfileCard
      title="Verv"
      cardActions={
        <Grid container direction="row" justifyContent="flex-end">
          <Grid item>
            <Button>Se verv</Button>
          </Grid>
        </Grid>
      }
      image={Form}
      alt=""
    >
      <Grid container direction="column">
        <Grid item>
          <Typography variant="body2">Her kan du se en oversikt over alle innsendte søknader på verv.</Typography>
        </Grid>
      </Grid>
    </ProfileCard>
  );
};

export default FormCard;
