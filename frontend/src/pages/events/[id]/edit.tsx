import { useMutation, useQuery } from "@apollo/client";
import { Container, LinearProgress } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import { EventForm, IEventForm } from "@/components/pages/events/EventForm";
import { AdminEventDocument, UpdateEventDocument } from "@/generated/graphql";
import { Layout, RootStyle } from "@/layouts/Layout";
import { NextPageWithLayout } from "@/pages/_app";

const EditEventPage: NextPageWithLayout = () => {
  const { id } = useRouter().query;

  const { loading, data } = useQuery(AdminEventDocument, {
    variables: { id: typeof id === "string" ? id : "" },
  });

  const router = useRouter();

  const [updateEvent] = useMutation(UpdateEventDocument, {
    onCompleted() {
      router.push(`/events/${id}`);
    },
  });
  const event = data?.event;

  function handleSubmit(values: IEventForm) {
    if (id && typeof id === "string") {
      updateEvent({
        variables: {
          id,
          eventData: {
            title: values.info.title,
            description: values.info.description,
            shortDescription: values.info.shortDescription,
            categoryId: values.info.category,
            contactEmail: values.info.contactEmail,
            allowedGradeYears: values.info.gradeYears,

            startTime: dayjs(values.timeAndPlace.start).format("YYYY-MM-DDTHH:mm:ss"),
            endTime: dayjs(values.timeAndPlace.end).format("YYYY-MM-DDTHH:mm:ss"),
            location: values.timeAndPlace.location,

            isAttendable: values.registration.variant !== "closed",
            bindingSignup: values.registration.variant === "binding",
            availableSlots: values.registration.details.availableSeats,
            hasExtraInformation: values.registration.details.requiresExtraInformation,
            signupOpenDate: dayjs(values.registration.details.signUpOpen).format("YYYY-MM-DDTHH:mm:ss"),
            deadline: dayjs(values.registration.details.deadline).format("YYYY-MM-DDTHH:mm:ss"),
          },
        },
      });
    }
  }

  if (loading) {
    return <LinearProgress />;
  }

  if (event) {
    let registrationVariant: "open" | "binding" | "closed" = "closed";
    if (event.isAttendable && event.bindingSignup) {
      registrationVariant = "binding";
    } else if (event.isAttendable) {
      registrationVariant = "open";
    }

    const defaultValues: IEventForm = {
      info: {
        title: event.title,
        description: event.description,
        shortDescription: event.shortDescription ?? "",
        category: event.category?.id ?? null,
        contactEmail: event.contactEmail,
        gradeYears: event.allowedGradeYears ?? [],
        organizer: event.organization.id,
      },
      timeAndPlace: {
        start: dayjs(event.startTime).toDate(),
        end: dayjs(event.endTime).toDate(),
        location: event.location ?? "",
      },
      registration: {
        variant: registrationVariant,
        details: {
          availableSeats: event.availableSlots ?? 0,
          requiresExtraInformation: event.hasExtraInformation ?? false,
          signUpOpen: dayjs(event.signupOpenDate).toDate(),
          deadline: dayjs(event.deadline).toDate(),
        },
      },
      review: {},
    };

    return (
      <>
        {id && typeof id === "string" && (
          <Container>
            <EventForm
              title="Oppdater arrangement"
              submitText="Lagre"
              defaultValues={defaultValues}
              organizations={[event.organization]}
              onSubmit={handleSubmit}
            />
          </Container>
        )}
      </>
    );
  }
  return null;
};

EditEventPage.getLayout = (page) => (
  <Layout>
    <RootStyle>{page}</RootStyle>
  </Layout>
);

export default EditEventPage;
