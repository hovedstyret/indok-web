import { useMutation } from "@apollo/client";
import Layout from "@components/Layout";
import { AUTHENTICATE } from "@graphql/auth/mutations";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CallbackPage: NextPage = () => {
  const router = useRouter();
  const { code } = router.query;

  const [authUser] = useMutation(AUTHENTICATE);
  const [userInfo, setUserInfo] = useState<{ username?: string }>({});

  useEffect(() => {
    if (code) {
      console.log("sending to backend");
      authUser({ variables: { code } }).then((res) => {
        console.log(res);
        setUserInfo(res.data.authUser.user);
      });
    }
  }, [code]);

  return (
    <Layout>
      {userInfo.username ? <div>Logged in as {Object.values(userInfo).join("\n")}</div> : <div>Logging you in...!</div>}{" "}
    </Layout>
  );
};

export default CallbackPage;
