import { NextPage } from "next";
import NewListing from "@components/pages/listings/organization/NewListing";
import { useRouter } from "next/router";

/**
 * Page for creating new listings, navigates to the newly created listing upon completion.
 */
const NewListingPage: NextPage = () => {
  const router = useRouter();
  const { orgId } = router.query;

  return <NewListing defaultOrganizationId={orgId as string} />;
};
export default NewListingPage;
