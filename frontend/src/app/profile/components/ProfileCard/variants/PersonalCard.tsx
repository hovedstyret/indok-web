import { Grid, Skeleton, Typography } from "@mui/material";

import { UserFragment } from "@/generated/graphql";
import Profile from "~/public/illustrations/Profile.svg";

import { ProfileCardBase } from "./ProfileCardBase";

type Props = {
  user?: UserFragment;
  "data-test-id"?: string;
};

export const PersonalCard: React.VFC<Props> = ({ user, "data-test-id": dataTestId, ...props }) => {
  return (
    <ProfileCardBase
      title="Personlig informasjon"
      actionText="Rediger"
      actionLink="/profile/edit/"
      image={Profile}
      alt=""
      data-test-id={dataTestId}
      {...props}
    >
      <Grid container direction="column">
        <Grid item>
          {user ? (
            <Typography
              variant="body2"
              data-test-id={`${dataTestId}name`}
            >{`${user.firstName} ${user.lastName}`}</Typography>
          ) : (
            <Skeleton>
              <Typography variant="body2">Placeholder Placeholder</Typography>
            </Skeleton>
          )}
        </Grid>
        <Grid item>
          {user && user.gradeYear ? (
            <Typography variant="body2">{`${user.gradeYear}. klasse`}</Typography>
          ) : (
            <Skeleton variant="rectangular">
              <Typography variant="body2">0. klasse</Typography>
            </Skeleton>
          )}
        </Grid>
      </Grid>
    </ProfileCardBase>
  );
};
