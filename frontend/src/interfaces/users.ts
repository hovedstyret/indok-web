import { Organization } from "./organizations";

export interface User {
  __typename: string;
  id: string;
  feideEmail: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dateJoined: string;
  organizations: Organization[];
  graduationYear: number;
  gradeYear: number;
  allergies: string;
  phoneNumber: string;
  firstLogin: boolean;
  events: Partial<Event>[];
}

export interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  allergies: string;
  graduationYear: string;
}

export interface UserInputValidations {
  email: boolean;
  phoneNumber: boolean;
  graduationYear?: boolean;
}
