import { BookingStatus } from "@/gql/app/graphql";

import { BookingPage } from "../_components/BookingPage";

export default function Page() {
  return <BookingPage status={BookingStatus.Confirmed} />;
}
