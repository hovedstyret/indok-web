import Layout from "@components/layouts";
import { Box } from "@mui/material";
import React from "react";
import { NextPageWithLayout } from "./_app";

const TestPage: NextPageWithLayout = () => {
  return <Box height="100vh"></Box>;
};

TestPage.getLayout = (page: React.ReactElement) => (
  <Layout simpleHeader simpleFooter>
    {page}
  </Layout>
);

export default TestPage;
