import TextField from "@components/pages/surveys/formComponents/textfield";
import { useState } from "react";
import { Listing, Organization } from "@interfaces/listings";
import { CREATE_LISTING } from "@graphql/listings/mutations";
import { useMutation, gql } from "@apollo/client";


const CreateListing: React.FC<{ organization: Organization }> = ({ organization }) => {
  const [newListing, setNewListing] = useState<Listing>({} as Listing);
  const [createListing] = useMutation<{ createListing: { listing: Listing } }>(CREATE_LISTING, {
    update: (cache, { data }) => {
      data &&
        cache.modify({
          fields: {
            listings: (existingListings) => {
              const newListing = cache.writeFragment<Listing>({
                data: data.createListing.listing,
                fragment: gql`
                  fragment NewListing on Listing {
                    id
                  }
                `,
              });
              return [...existingListings, newListing];
            },
          },
        });
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(newListing);
        createListing({
          variables: {
            title: newListing.title,
            description: newListing.description,
            startDatetime: newListing.startDatetime,
            deadline: newListing.deadline,
            endDatetime: newListing.endDatetime,
            url: "www.google.com",
            organizationId: organization.id,
          },
        });
        //TODO: properly reset newListing state
        setNewListing({ ...newListing, title: "", description: "" });
      }}
    >
      <TextField
        title="Navn på vervet: "
        onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
        value={newListing.title}
      />
      <br />
      <TextField
        title="Beskrivelse av vervet: "
        size="short"
        onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
        value={newListing.description}
      />
      <br />
      Starttid:{" "}
      <input
        type="datetime-local"
        onChange={(e) => setNewListing({ ...newListing, startDatetime: e.target.value })}
        value={newListing.startDatetime}
      />
      <br />
      Frist:{" "}
      <input
        type="datetime-local"
        onChange={(e) => setNewListing({ ...newListing, deadline: e.target.value })}
        value={newListing.deadline}
      />
      <br />
      Slutt:{" "}
      <input
        type="datetime-local"
        onChange={(e) => setNewListing({ ...newListing, endDatetime: e.target.value })}
        value={newListing.endDatetime}
      />
      <br />
      <button type="submit">Legg til verv</button>
    </form>
  );
};

export default CreateListing;
