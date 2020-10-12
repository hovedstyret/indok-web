import { Listing, Response } from "@interfaces/listings";
import { useMutation } from "@apollo/client";
import { CREATE_RESPONSE } from "@graphql/listings/mutations";
import React, { useState, ChangeEvent } from "react";

const CreateResponse: React.FC<{
    listing: Listing;
    children?: React.ReactNode;
}> = ({ listing, children }) => {
    const [newResponse, setNewResponse] = useState<Response>({} as Response);
    const [createResponse] = useMutation<{ createResponse: { response: Response } }>(CREATE_RESPONSE);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                createResponse({
                    variables: {
                        response: newResponse.response,
                        applicantId: 1,
                        listingId: listing.id,
                    },
                });
            }}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        value: newResponse.response,
                        onChange: (e: ChangeEvent<HTMLInputElement>) =>
                            setNewResponse({ ...newResponse, response: e.target.value }),
                    });
                }
                return child;
            })}
            <br />
            <button type="submit">Søk!</button>
        </form>
    );
};

export default CreateResponse;
