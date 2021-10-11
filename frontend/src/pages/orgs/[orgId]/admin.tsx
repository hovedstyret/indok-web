import { NextPage } from "next";
import OrgInfo from "@components/pages/orgs/OrgInfo";
import { useQuery } from "@apollo/client";
import { Organization } from "@interfaces/organizations";
import { GET_ORGANIZATION } from "@graphql/orgs/queries";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import { Container } from "@material-ui/core";

const AdminPage: NextPage = () => {
  const { orgId } = useRouter().query;

  const { loading, error, data } = useQuery<{ organization: Organization }>(GET_ORGANIZATION, {
    variables: { orgId: orgId as string },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Layout>
      <Container>
        {data && (
          <>
            <OrgInfo organization={data.organization} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default AdminPage;
