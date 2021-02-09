import { gql, useMutation } from "@apollo/client";
import Select from "@components/ui/Select";
import { Event } from "@interfaces/events";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAllEventCategoriesQuery, useEventFilteredOrganizationsQuery } from "src/api/generated/graphql";
import { CREATE_EVENT } from "src/graphql/events/mutations";

const CreateEvent: React.FC = () => {
  const defaultInput = {
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location: "",
    organizationId: "",
    categoryId: "",
    image: "",
    isAttendable: false,
    deadline: "",
  };

  const [eventData, setEventData] = useState(defaultInput);

  const router = useRouter();

  const [createEvent] = useMutation<{ createEvent: { event: Event } }>(CREATE_EVENT, {
    update: (cache, { data }) => {
      data &&
        cache.modify({
          fields: {
            allEvents: (existingEvents) => {
              const newEventRef = cache.writeFragment<Event>({
                data: data.createEvent.event,
                fragment: gql`
                  fragment NewEvent on Event {
                    id
                  }
                `,
              });
              return [...existingEvents, newEventRef];
            },
          },
        });
    },
  });

  const { loading: categoryLoading, error: categoryError, data: categoryData } = useAllEventCategoriesQuery();
  const {
    loading: organizationLoading,
    error: organizationError,
    data: organizationData,
  } = useEventFilteredOrganizationsQuery();

  const getAllCategories = () => {
    if (categoryLoading || categoryError || !categoryData || !categoryData.allCategories) return [];

    return categoryData.allCategories.map((category) => {
      return category
        ? { name: category.name, value: category.id, selected: category.id == eventData.categoryId }
        : { name: "", value: "", selected: false };
    });
  };

  const getAllOrganizations = () => {
    // should handle loading status
    if (organizationLoading || organizationError || !organizationData || !organizationData.eventFilteredOrganizations)
      return [];

    return organizationData.eventFilteredOrganizations.map((organization) => {
      return organization
        ? {
            name: organization.name,
            value: organization.id,
            selected: organization.id == eventData.organizationId,
          }
        : { name: "", value: "", selected: false };
    });
  };

  return (
    <div>
      <form
        id="createform"
        onSubmit={(e) => {
          e.preventDefault();
          const filtered = Object.entries(eventData).filter((entry) => entry[1] !== "");
          const filteredObj = Object.fromEntries(filtered);
          createEvent({ variables: { ...filteredObj } }).then(() => setEventData(defaultInput));
          router.push("/events");
        }}
      >
        <h2 style={{ marginTop: -10, marginBottom: 10, textAlign: "center" }}>Opprett nytt arrangement</h2>
        <h4 style={{ margin: 0 }}>Påkrevde felt</h4>
        <div>
          Tittel: &nbsp;
          <input
            placeholder="Tittel"
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.currentTarget.value })}
          />
        </div>
        {/* <div>
          Publiserer: &nbsp;
          <input
            placeholder="Publiserer"
            value={eventData.publisher}
            onChange={(e) => setEventData({ ...eventData, publisher: e.currentTarget.value })}
          />
        </div> */}
        <div>
          Starttid: &nbsp;
          <input
            type="datetime-local"
            placeholder="Starttid"
            value={eventData.startTime}
            onChange={(e) => setEventData({ ...eventData, startTime: e.currentTarget.value })}
          />
        </div>
        <div>
          Krever påmelding: &nbsp;
          <input
            type="checkbox"
            placeholder="Is attendable"
            checked={eventData.isAttendable}
            onChange={(e) => setEventData({ ...eventData, isAttendable: e.currentTarget.checked })}
          />
        </div>
        <div>
          Beskrivelse: <br />
          <textarea
            style={{
              width: 300,
              height: 60,
            }}
            form="createform"
            placeholder="Beskrivelse ..."
            value={eventData.description}
            onChange={(e) => setEventData({ ...eventData, description: e.currentTarget.value })}
          ></textarea>
        </div>

        <h4 style={{ marginBottom: 0 }}>Frivillige felt</h4>
        <div>
          Sluttid: &nbsp;
          <input
            type="datetime-local"
            placeholder="Sluttid"
            value={eventData.endTime}
            onChange={(e) => setEventData({ ...eventData, endTime: e.currentTarget.value })}
          />
        </div>
        <div>
          Lokasjon: &nbsp;
          <input
            placeholder="Lokasjon"
            value={eventData.location}
            onChange={(e) => setEventData({ ...eventData, location: e.currentTarget.value })}
          />
        </div>
        <div>
          <Select
            name="Organisasjon"
            items={getAllOrganizations()}
            onChange={(value) => setEventData({ ...eventData, organizationId: value })}
          />
        </div>
        <div>
          <Select
            name="Kategori"
            items={getAllCategories()}
            onChange={(value) => setEventData({ ...eventData, categoryId: value })}
          />
        </div>
        <div>
          Bilde (URL): &nbsp;
          <input
            placeholder="Bilde URL"
            value={eventData.image}
            onChange={(e) => setEventData({ ...eventData, image: e.currentTarget.value })}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          Deadline for påmelding: &nbsp;
          <input
            type="datetime-local"
            placeholder="Deadline"
            value={eventData.deadline}
            onChange={(e) => setEventData({ ...eventData, deadline: e.currentTarget.value })}
          />
        </div>

        <Button type="submit" color="primary">
          Opprett arrangement
        </Button>
      </form>
    </div>
  );
};

export default CreateEvent;
