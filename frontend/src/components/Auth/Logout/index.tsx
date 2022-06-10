import { useMutation } from "@apollo/client";
import { LogoutDocument } from "@generated/graphql";
import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, ButtonProps, Snackbar } from "@mui/material";
import { config } from "@utils/config";
import { generateQueryString } from "@utils/helpers";
import { useRouter } from "next/router";
import { useState } from "react";

const Logout: React.FC<Omit<ButtonProps, "sx">> = ({ ...props }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [logoutAction, { loading, client }] = useMutation(LogoutDocument, {
    onCompleted: async ({ logout }) => {
      // reset the apollo store and redirect. See // https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout
      await client.resetStore();
      const queryString = generateQueryString({
        post_logout_redirect_uri: config.FRONTEND_URI,
        id_token_hint: logout?.idToken,
      });
      const logOutUrl = "https://auth.dataporten.no/openid/endsession" + queryString;
      router.push(logOutUrl);
    },
    onError: () => setOpen(true),
  });

  return (
    <>
      {open && (
        <Snackbar open={open} color="error" anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert onClose={() => setOpen(false)} severity="error">
            <AlertTitle>Utloggingen feilet</AlertTitle>
            Kontakt <a href="mailto:kontakt@rubberdok.no">kontakt@rubberdok.no</a> dersom problemet vedvarer.
          </Alert>
        </Snackbar>
      )}
      <LoadingButton variant="contained" color="error" loading={loading} {...props} onClick={() => logoutAction()}>
        Logg ut
      </LoadingButton>
    </>
  );
};

export default Logout;
