import { Form } from "@interfaces/forms";
import { Organization } from "@interfaces/organizations";

export interface Listing {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDatetime: string;
  deadline: string;
  endDatetime: string;
  applicationUrl?: string | null;
  hero?: string;
  heroImageUrl?: string | null;
  logo?: string;
  organization: Organization;
  form?: Pick<Form, "id">;
  chips: string[];
  readMoreUrl?: string;
}

export interface ListingWithForm extends Listing {
  form?: Form;
}

export interface ListingInput extends Omit<Listing, "startDatetime" | "endDatetime" | "chips" | "slug"> {
  startDatetime?: string;
  endDatetime?: string;
  case?: boolean;
  application?: boolean;
  interview?: boolean;
}
