import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
  Decimal: number;
  UUID: string;
};

/** Booking type for admin users */
export type AdminBookingType = {
  __typename?: "AdminBookingType";
  cabins: Array<CabinType>;
  checkIn: Scalars["Date"];
  checkOut: Scalars["Date"];
  declineReason: Scalars["String"];
  externalParticipants: Scalars["Int"];
  extraInfo: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  internalParticipants: Scalars["Int"];
  isDeclined: Scalars["Boolean"];
  isInternalPrice?: Maybe<Scalars["Int"]>;
  isTentative: Scalars["Boolean"];
  lastName: Scalars["String"];
  numberOfNights?: Maybe<Scalars["Int"]>;
  phone: Scalars["String"];
  price?: Maybe<Scalars["Int"]>;
  receiverEmail: Scalars["String"];
  timestamp: Scalars["DateTime"];
};

/**
 * Sets the field is_attending to False in the Sign Up for the user with the
 * given ID, for the event with the given ID
 * NOTE: The sign up still exists, it is not deleted from the database
 *       when a user signs off an event
 */
export type AdminEventSignOff = {
  __typename?: "AdminEventSignOff";
  event?: Maybe<EventType>;
};

/** Booking type for fields available for not logged in users */
export type AllBookingsType = {
  __typename?: "AllBookingsType";
  cabins: Array<CabinType>;
  checkIn: Scalars["Date"];
  checkOut: Scalars["Date"];
  id: Scalars["ID"];
};

export type AnswerInput = {
  answer: Scalars["String"];
  questionId: Scalars["ID"];
};

/** A user's answer to a question. */
export type AnswerType = {
  __typename?: "AnswerType";
  answer: Scalars["String"];
  id?: Maybe<Scalars["UUID"]>;
  question: QuestionType;
  uuid: Scalars["UUID"];
};

export type ArchiveDocumentType = {
  __typename?: "ArchiveDocumentType";
  featured: Scalars["Boolean"];
  fileLocation: Scalars["String"];
  id: Scalars["ID"];
  thumbnail?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  typeDoc: ArchiveDocumentTypeDoc;
  webLink?: Maybe<Scalars["String"]>;
  year?: Maybe<Scalars["Int"]>;
};

/** An enumeration. */
export enum ArchiveDocumentTypeDoc {
  /** Annet */
  Annet = "ANNET",
  /** Årbøker */
  Arboker = "ARBOKER",
  /** Budsjett og Regnskap */
  BudsjettOgRegnskap = "BUDSJETT_OG_REGNSKAP",
  /** Foreningens lover */
  ForeningensLover = "FORENINGENS_LOVER",
  /** Generalforsamling */
  Generalforsamling = "GENERALFORSAMLING",
  /** Januscript */
  Januscript = "JANUSCRIPT",
  /** Støtte fra HS */
  StotteFraHs = "STOTTE_FRA_HS",
  /** Utveksling */
  Utveksling = "UTVEKSLING",
}

export type AssignMembership = {
  __typename?: "AssignMembership";
  membership?: Maybe<MembershipType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type AttemptCapturePayment = {
  __typename?: "AttemptCapturePayment";
  order?: Maybe<OrderType>;
  status?: Maybe<PaymentStatus>;
};

export type AuthUser = {
  __typename?: "AuthUser";
  user: UserType;
};

export type BaseFormInput = {
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  organizationId?: InputMaybe<Scalars["ID"]>;
};

export type BaseListingInput = {
  application?: InputMaybe<Scalars["Boolean"]>;
  applicationUrl?: InputMaybe<Scalars["String"]>;
  case?: InputMaybe<Scalars["Boolean"]>;
  deadline?: InputMaybe<Scalars["DateTime"]>;
  description?: InputMaybe<Scalars["String"]>;
  endDatetime?: InputMaybe<Scalars["DateTime"]>;
  formId?: InputMaybe<Scalars["ID"]>;
  interview?: InputMaybe<Scalars["Boolean"]>;
  readMoreUrl?: InputMaybe<Scalars["String"]>;
  startDatetime?: InputMaybe<Scalars["DateTime"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type BaseQuestionInput = {
  description?: InputMaybe<Scalars["String"]>;
  mandatory?: InputMaybe<Scalars["Boolean"]>;
  question?: InputMaybe<Scalars["String"]>;
  questionType?: InputMaybe<QuestionTypeEnum>;
};

export type BlogPostType = {
  __typename?: "BlogPostType";
  author?: Maybe<UserType>;
  blog?: Maybe<BlogType>;
  id: Scalars["ID"];
  publishDate: Scalars["DateTime"];
  text: Scalars["String"];
  title: Scalars["String"];
};

export type BlogType = {
  __typename?: "BlogType";
  blogPosts: Array<BlogPostType>;
  description: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  organization?: Maybe<OrganizationType>;
};

/** Basic booking object type used as a base for other types and as a standalone */
export type BookingInput = {
  cabins?: InputMaybe<Array<Scalars["Int"]>>;
  checkIn?: InputMaybe<Scalars["Date"]>;
  checkOut?: InputMaybe<Scalars["Date"]>;
  externalParticipants?: InputMaybe<Scalars["Int"]>;
  extraInfo?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  internalParticipants?: InputMaybe<Scalars["Int"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  receiverEmail?: InputMaybe<Scalars["String"]>;
};

export type BookingResponsibleType = {
  __typename?: "BookingResponsibleType";
  active?: Maybe<Scalars["Boolean"]>;
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  lastName?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["Int"]>;
};

export type CabinType = {
  __typename?: "CabinType";
  externalPrice: Scalars["Int"];
  id: Scalars["ID"];
  internalPrice: Scalars["Int"];
  maxGuests: Scalars["Int"];
  name: Scalars["String"];
};

export type CategoryInput = {
  name?: InputMaybe<Scalars["String"]>;
};

export type CategoryType = {
  __typename?: "CategoryType";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type CreateArchiveDocument = {
  __typename?: "CreateArchiveDocument";
  arhiveDocument?: Maybe<ArchiveDocumentType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type CreateBlog = {
  __typename?: "CreateBlog";
  blog?: Maybe<BlogType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type CreateBlogPost = {
  __typename?: "CreateBlogPost";
  blogPost?: Maybe<BlogPostType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

/** Add a new booking to the database */
export type CreateBooking = {
  __typename?: "CreateBooking";
  booking?: Maybe<AllBookingsType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

/** Create a new event category */
export type CreateCategory = {
  __typename?: "CreateCategory";
  category?: Maybe<CategoryType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

/** Create a new event */
export type CreateEvent = {
  __typename?: "CreateEvent";
  event?: Maybe<EventType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type CreateEventInput = {
  allowedGradeYears?: InputMaybe<Array<Scalars["Int"]>>;
  availableSlots?: InputMaybe<Scalars["Int"]>;
  bindingSignup?: InputMaybe<Scalars["Boolean"]>;
  categoryId?: InputMaybe<Scalars["ID"]>;
  contactEmail?: InputMaybe<Scalars["String"]>;
  deadline?: InputMaybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  endTime?: InputMaybe<Scalars["DateTime"]>;
  hasExtraInformation?: InputMaybe<Scalars["Boolean"]>;
  image?: InputMaybe<Scalars["String"]>;
  isAttendable: Scalars["Boolean"];
  location?: InputMaybe<Scalars["String"]>;
  organizationId: Scalars["ID"];
  price?: InputMaybe<Scalars["Float"]>;
  shortDescription?: InputMaybe<Scalars["String"]>;
  signupOpenDate?: InputMaybe<Scalars["DateTime"]>;
  startTime: Scalars["DateTime"];
  title: Scalars["String"];
};

export type CreateForm = {
  __typename?: "CreateForm";
  form?: Maybe<FormType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type CreateFormInput = {
  description?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  organizationId: Scalars["ID"];
};

/** Creates a new listing */
export type CreateListing = {
  __typename?: "CreateListing";
  listing?: Maybe<ListingType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type CreateListingInput = {
  application?: InputMaybe<Scalars["Boolean"]>;
  applicationUrl?: InputMaybe<Scalars["String"]>;
  case?: InputMaybe<Scalars["Boolean"]>;
  deadline: Scalars["DateTime"];
  description?: InputMaybe<Scalars["String"]>;
  endDatetime?: InputMaybe<Scalars["DateTime"]>;
  formId?: InputMaybe<Scalars["ID"]>;
  interview?: InputMaybe<Scalars["Boolean"]>;
  organizationId: Scalars["ID"];
  readMoreUrl?: InputMaybe<Scalars["String"]>;
  startDatetime?: InputMaybe<Scalars["DateTime"]>;
  title: Scalars["String"];
};

export type CreateOrganization = {
  __typename?: "CreateOrganization";
  ok?: Maybe<Scalars["Boolean"]>;
  organization?: Maybe<OrganizationType>;
};

export type CreateProduct = {
  __typename?: "CreateProduct";
  ok?: Maybe<Scalars["Boolean"]>;
  product?: Maybe<ProductType>;
};

export type CreateProductInput = {
  description: Scalars["String"];
  maxBuyableQuantity: Scalars["Int"];
  name: Scalars["String"];
  organizationId: Scalars["ID"];
  price: Scalars["Decimal"];
  totalQuantity: Scalars["Int"];
};

export type CreateQuestion = {
  __typename?: "CreateQuestion";
  ok?: Maybe<Scalars["Boolean"]>;
  question?: Maybe<QuestionType>;
};

export type CreateQuestionInput = {
  description?: InputMaybe<Scalars["String"]>;
  mandatory?: InputMaybe<Scalars["Boolean"]>;
  question: Scalars["String"];
  questionType?: InputMaybe<QuestionTypeEnum>;
};

export type CreateUpdateAndDeleteOptions = {
  __typename?: "CreateUpdateAndDeleteOptions";
  ok?: Maybe<Scalars["Boolean"]>;
  options?: Maybe<Array<OptionType>>;
};

export type DeleteAnswer = {
  __typename?: "DeleteAnswer";
  deletedUuid?: Maybe<Scalars["ID"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type DeleteAnswersToForm = {
  __typename?: "DeleteAnswersToForm";
  ok?: Maybe<Scalars["Boolean"]>;
};

export type DeleteArchiveDocument = {
  __typename?: "DeleteArchiveDocument";
  archiveDocument?: Maybe<ArchiveDocumentType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type DeleteBlog = {
  __typename?: "DeleteBlog";
  ok?: Maybe<Scalars["ID"]>;
};

export type DeleteBlogPost = {
  __typename?: "DeleteBlogPost";
  ok?: Maybe<Scalars["Boolean"]>;
};

/** Deletes the booking with the given ID */
export type DeleteBooking = {
  __typename?: "DeleteBooking";
  bookingId?: Maybe<Scalars["ID"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

/** Deletes the category with a given ID */
export type DeleteCategory = {
  __typename?: "DeleteCategory";
  category?: Maybe<CategoryType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

/** Deletes the event with the given ID */
export type DeleteEvent = {
  __typename?: "DeleteEvent";
  event?: Maybe<EventType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type DeleteForm = {
  __typename?: "DeleteForm";
  deletedId?: Maybe<Scalars["ID"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

/** Deletes the listing with the given ID */
export type DeleteListing = {
  __typename?: "DeleteListing";
  listingId?: Maybe<Scalars["ID"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type DeleteOrganization = {
  __typename?: "DeleteOrganization";
  ok?: Maybe<Scalars["Boolean"]>;
  organization?: Maybe<OrganizationType>;
};

export type DeleteQuestion = {
  __typename?: "DeleteQuestion";
  deletedId?: Maybe<Scalars["ID"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type EmailInput = {
  cabins?: InputMaybe<Array<Scalars["Int"]>>;
  checkIn?: InputMaybe<Scalars["Date"]>;
  checkOut?: InputMaybe<Scalars["Date"]>;
  emailType?: InputMaybe<Scalars["String"]>;
  externalParticipants?: InputMaybe<Scalars["Int"]>;
  extraInfo?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  internalParticipants?: InputMaybe<Scalars["Int"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  receiverEmail?: InputMaybe<Scalars["String"]>;
};

/**
 * Sets the field is_attending to False in the Sign Up for the user that
 * sent the request, for the event with the given ID
 * NOTE: The sign up still exists, it is not deleted from the database
 *       when a user signs off an event
 */
export type EventSignOff = {
  __typename?: "EventSignOff";
  event?: Maybe<EventType>;
  isFull?: Maybe<Scalars["Boolean"]>;
};

/**
 * Creates a new Sign Up for the user that sent the request, for the event
 * with the given ID
 */
export type EventSignUp = {
  __typename?: "EventSignUp";
  event?: Maybe<EventType>;
  isFull?: Maybe<Scalars["Boolean"]>;
};

export type EventSignUpInput = {
  extraInformation?: InputMaybe<Scalars["String"]>;
};

export type EventType = {
  __typename?: "EventType";
  allowedGradeYears?: Maybe<Array<Scalars["Int"]>>;
  availableSlots?: Maybe<Scalars["Int"]>;
  bindingSignup: Scalars["Boolean"];
  category?: Maybe<CategoryType>;
  contactEmail: Scalars["String"];
  deadline?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  endTime?: Maybe<Scalars["DateTime"]>;
  hasExtraInformation: Scalars["Boolean"];
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  isAttendable: Scalars["Boolean"];
  isFull?: Maybe<Scalars["Boolean"]>;
  location?: Maybe<Scalars["String"]>;
  organization: OrganizationType;
  price?: Maybe<Scalars["Float"]>;
  product?: Maybe<ProductType>;
  publisher?: Maybe<UserType>;
  shortDescription?: Maybe<Scalars["String"]>;
  signupOpenDate?: Maybe<Scalars["DateTime"]>;
  startTime: Scalars["DateTime"];
  title: Scalars["String"];
  userAttendance?: Maybe<UserAttendingType>;
  usersAttending?: Maybe<Array<SignUpType>>;
  usersOnWaitingList?: Maybe<Array<SignUpType>>;
};

/** A form containing questions, optionally linked to a listing. */
export type FormType = {
  __typename?: "FormType";
  description: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  organization?: Maybe<OrganizationType>;
  questions: Array<QuestionType>;
  responder?: Maybe<UserType>;
  responders?: Maybe<Array<UserType>>;
  response?: Maybe<ResponseType>;
  responses?: Maybe<Array<ResponseType>>;
};

/** A form containing questions, optionally linked to a listing. */
export type FormTypeResponderArgs = {
  userId: Scalars["ID"];
};

/** A form containing questions, optionally linked to a listing. */
export type FormTypeRespondersArgs = {
  userId?: InputMaybe<Scalars["ID"]>;
};

/** A form containing questions, optionally linked to a listing. */
export type FormTypeResponseArgs = {
  responsePk?: InputMaybe<Scalars["UUID"]>;
};

export type InitiateOrder = {
  __typename?: "InitiateOrder";
  orderId?: Maybe<Scalars["UUID"]>;
  redirect?: Maybe<Scalars["String"]>;
};

export type ListingType = {
  __typename?: "ListingType";
  applicationUrl?: Maybe<Scalars["String"]>;
  chips: Array<Scalars["String"]>;
  deadline: Scalars["DateTime"];
  description: Scalars["String"];
  endDatetime: Scalars["DateTime"];
  form?: Maybe<FormType>;
  heroImageUrl?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  organization: OrganizationType;
  readMoreUrl?: Maybe<Scalars["String"]>;
  slug: Scalars["String"];
  startDatetime: Scalars["DateTime"];
  title: Scalars["String"];
  viewCount: Scalars["Int"];
};

export type Logout = {
  __typename?: "Logout";
  idToken?: Maybe<Scalars["String"]>;
};

export type MembershipInput = {
  groupId?: InputMaybe<Scalars["ID"]>;
  organizationId?: InputMaybe<Scalars["ID"]>;
  userId?: InputMaybe<Scalars["ID"]>;
};

export type MembershipType = {
  __typename?: "MembershipType";
  group?: Maybe<ResponsibleGroupType>;
  id: Scalars["ID"];
  organization: OrganizationType;
  user: UserType;
};

export type Mutations = {
  __typename?: "Mutations";
  /**
   * Sets the field is_attending to False in the Sign Up for the user with the
   * given ID, for the event with the given ID
   * NOTE: The sign up still exists, it is not deleted from the database
   *       when a user signs off an event
   */
  adminEventSignOff?: Maybe<AdminEventSignOff>;
  assignMembership?: Maybe<AssignMembership>;
  attemptCapturePayment?: Maybe<AttemptCapturePayment>;
  authUser: AuthUser;
  createArchivedocument?: Maybe<CreateArchiveDocument>;
  createBlog?: Maybe<CreateBlog>;
  createBlogPost?: Maybe<CreateBlogPost>;
  /** Add a new booking to the database */
  createBooking?: Maybe<CreateBooking>;
  /** Create a new event category */
  createCategory?: Maybe<CreateCategory>;
  /** Create a new event */
  createEvent?: Maybe<CreateEvent>;
  createForm?: Maybe<CreateForm>;
  /** Creates a new listing */
  createListing?: Maybe<CreateListing>;
  createOrganization?: Maybe<CreateOrganization>;
  createProduct?: Maybe<CreateProduct>;
  createQuestion?: Maybe<CreateQuestion>;
  createUpdateAndDeleteOptions?: Maybe<CreateUpdateAndDeleteOptions>;
  deleteAnswer?: Maybe<DeleteAnswer>;
  deleteAnswers?: Maybe<DeleteAnswersToForm>;
  deleteArchivedocument?: Maybe<DeleteArchiveDocument>;
  deleteBlog?: Maybe<DeleteBlog>;
  deleteBlogPost?: Maybe<DeleteBlogPost>;
  /** Deletes the booking with the given ID */
  deleteBooking?: Maybe<DeleteBooking>;
  /** Deletes the category with a given ID */
  deleteCategory?: Maybe<DeleteCategory>;
  /** Deletes the event with the given ID */
  deleteEvent?: Maybe<DeleteEvent>;
  deleteForm?: Maybe<DeleteForm>;
  /** Deletes the listing with the given ID */
  deleteListing?: Maybe<DeleteListing>;
  deleteOrganization?: Maybe<DeleteOrganization>;
  deleteQuestion?: Maybe<DeleteQuestion>;
  /**
   * Sets the field is_attending to False in the Sign Up for the user that
   * sent the request, for the event with the given ID
   * NOTE: The sign up still exists, it is not deleted from the database
   *       when a user signs off an event
   */
  eventSignOff?: Maybe<EventSignOff>;
  /**
   * Creates a new Sign Up for the user that sent the request, for the event
   * with the given ID
   */
  eventSignUp?: Maybe<EventSignUp>;
  initiateOrder?: Maybe<InitiateOrder>;
  logout?: Maybe<Logout>;
  /** Sends email to the user or an admin (or both) */
  sendEmail?: Maybe<SendEmail>;
  /** Send an email to all users signed up to an event */
  sendEventMails?: Maybe<SendEventEmails>;
  submitAnswers?: Maybe<SubmitOrUpdateAnswers>;
  updateArchivedocument?: Maybe<UpdateArchiveDocument>;
  updateBlog?: Maybe<UpdateBlog>;
  updateBlogPost?: Maybe<UpdateBlogPost>;
  /** Change the given booking */
  updateBooking?: Maybe<UpdateBooking>;
  /** Update the booking semester */
  updateBookingSemester?: Maybe<UpdateBookingSemester>;
  /** Change the given cabin */
  updateCabin?: Maybe<UpdateCabin>;
  /** Updates the category with a given ID with the data in category_data */
  updateCategory?: Maybe<UpdateCategory>;
  /** Updates the event with a given ID with the data in event_data */
  updateEvent?: Maybe<UpdateEvent>;
  updateForm?: Maybe<UpdateForm>;
  updateListing?: Maybe<UpdateListing>;
  updateOrganization?: Maybe<UpdateOrganization>;
  updateQuestion?: Maybe<UpdateQuestion>;
  updateUser?: Maybe<UpdateUser>;
};

export type MutationsAdminEventSignOffArgs = {
  eventId: Scalars["ID"];
  userId: Scalars["ID"];
};

export type MutationsAssignMembershipArgs = {
  membershipData: MembershipInput;
};

export type MutationsAttemptCapturePaymentArgs = {
  orderId: Scalars["ID"];
};

export type MutationsAuthUserArgs = {
  code: Scalars["String"];
};

export type MutationsCreateArchivedocumentArgs = {
  date?: InputMaybe<Scalars["DateTime"]>;
  fileLocation?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  typeDoc?: InputMaybe<Scalars["String"]>;
  webLink?: InputMaybe<Scalars["String"]>;
};

export type MutationsCreateBlogArgs = {
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  organizationId?: InputMaybe<Scalars["ID"]>;
};

export type MutationsCreateBlogPostArgs = {
  authorId?: InputMaybe<Scalars["ID"]>;
  blogId?: InputMaybe<Scalars["ID"]>;
  text?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type MutationsCreateBookingArgs = {
  bookingData?: InputMaybe<BookingInput>;
};

export type MutationsCreateCategoryArgs = {
  categoryData: CategoryInput;
};

export type MutationsCreateEventArgs = {
  eventData: CreateEventInput;
};

export type MutationsCreateFormArgs = {
  formData: CreateFormInput;
  listingId?: InputMaybe<Scalars["ID"]>;
};

export type MutationsCreateListingArgs = {
  listingData: CreateListingInput;
};

export type MutationsCreateOrganizationArgs = {
  organizationData: OrganizationInput;
};

export type MutationsCreateProductArgs = {
  productData: CreateProductInput;
};

export type MutationsCreateQuestionArgs = {
  formId?: InputMaybe<Scalars["ID"]>;
  questionData: CreateQuestionInput;
};

export type MutationsCreateUpdateAndDeleteOptionsArgs = {
  optionData?: InputMaybe<Array<OptionInput>>;
  questionId: Scalars["ID"];
};

export type MutationsDeleteAnswerArgs = {
  uuid: Scalars["ID"];
};

export type MutationsDeleteAnswersArgs = {
  formId?: InputMaybe<Scalars["ID"]>;
};

export type MutationsDeleteArchivedocumentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type MutationsDeleteBlogArgs = {
  blogId?: InputMaybe<Scalars["ID"]>;
};

export type MutationsDeleteBlogPostArgs = {
  blogPostId?: InputMaybe<Scalars["ID"]>;
};

export type MutationsDeleteBookingArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type MutationsDeleteCategoryArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type MutationsDeleteEventArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type MutationsDeleteFormArgs = {
  id: Scalars["ID"];
};

export type MutationsDeleteListingArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type MutationsDeleteOrganizationArgs = {
  id: Scalars["ID"];
};

export type MutationsDeleteQuestionArgs = {
  id: Scalars["ID"];
};

export type MutationsEventSignOffArgs = {
  eventId: Scalars["ID"];
};

export type MutationsEventSignUpArgs = {
  data?: InputMaybe<EventSignUpInput>;
  eventId: Scalars["ID"];
};

export type MutationsInitiateOrderArgs = {
  fallbackRedirect?: InputMaybe<Scalars["String"]>;
  productId: Scalars["ID"];
  quantity?: InputMaybe<Scalars["Int"]>;
};

export type MutationsSendEmailArgs = {
  emailInput?: InputMaybe<EmailInput>;
};

export type MutationsSendEventMailsArgs = {
  content?: InputMaybe<Scalars["String"]>;
  eventId: Scalars["ID"];
  receiverEmails?: InputMaybe<Array<Scalars["String"]>>;
  subject: Scalars["String"];
};

export type MutationsSubmitAnswersArgs = {
  answersData?: InputMaybe<Array<AnswerInput>>;
  formId: Scalars["ID"];
};

export type MutationsUpdateArchivedocumentArgs = {
  date?: InputMaybe<Scalars["DateTime"]>;
  fileLocation?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
  typeDoc?: InputMaybe<Scalars["String"]>;
  webLink?: InputMaybe<Scalars["String"]>;
};

export type MutationsUpdateBlogArgs = {
  blogData?: InputMaybe<UpdateBlogInput>;
};

export type MutationsUpdateBlogPostArgs = {
  blogPostData?: InputMaybe<UpdateBlogPostInput>;
};

export type MutationsUpdateBookingArgs = {
  bookingData?: InputMaybe<UpdateBookingInput>;
};

export type MutationsUpdateBookingSemesterArgs = {
  semesterData?: InputMaybe<UpdateBookingSemesterInput>;
};

export type MutationsUpdateCabinArgs = {
  cabinData?: InputMaybe<UpdateCabinInput>;
};

export type MutationsUpdateCategoryArgs = {
  categoryData?: InputMaybe<CategoryInput>;
  id: Scalars["ID"];
};

export type MutationsUpdateEventArgs = {
  eventData?: InputMaybe<UpdateEventInput>;
  id: Scalars["ID"];
};

export type MutationsUpdateFormArgs = {
  formData: BaseFormInput;
  id?: InputMaybe<Scalars["ID"]>;
};

export type MutationsUpdateListingArgs = {
  id: Scalars["ID"];
  listingData?: InputMaybe<BaseListingInput>;
};

export type MutationsUpdateOrganizationArgs = {
  id: Scalars["ID"];
  organizationData?: InputMaybe<OrganizationInput>;
};

export type MutationsUpdateQuestionArgs = {
  id: Scalars["ID"];
  questionData: BaseQuestionInput;
};

export type MutationsUpdateUserArgs = {
  userData?: InputMaybe<UserInput>;
};

export type OptionInput = {
  answer: Scalars["String"];
  id?: InputMaybe<Scalars["ID"]>;
};

/** Option for multiple choice questions */
export type OptionType = {
  __typename?: "OptionType";
  answer: Scalars["String"];
  id: Scalars["ID"];
  question: QuestionType;
};

export type OrderType = {
  __typename?: "OrderType";
  id: Scalars["UUID"];
  paymentStatus: PaymentStatus;
  product: ProductType;
  quantity: Scalars["Int"];
  timestamp: Scalars["DateTime"];
  totalPrice: Scalars["Decimal"];
  user: UserType;
};

export type OrdersByStatusType = {
  __typename?: "OrdersByStatusType";
  length?: Maybe<Scalars["Int"]>;
  orders?: Maybe<Array<OrderType>>;
};

export type OrganizationInput = {
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  parentId?: InputMaybe<Scalars["ID"]>;
};

export type OrganizationType = {
  __typename?: "OrganizationType";
  absoluteSlug?: Maybe<Scalars["String"]>;
  children: Array<OrganizationType>;
  color?: Maybe<Scalars["String"]>;
  description: Scalars["String"];
  events: Array<EventType>;
  hrGroup?: Maybe<ResponsibleGroupType>;
  id: Scalars["ID"];
  listings?: Maybe<Array<ListingType>>;
  logoUrl?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  parent?: Maybe<OrganizationType>;
  primaryGroup?: Maybe<ResponsibleGroupType>;
  slug: Scalars["String"];
  users: Array<UserType>;
};

/** An enumeration. */
export enum PaymentStatus {
  Cancelled = "CANCELLED",
  Captured = "CAPTURED",
  Failed = "FAILED",
  Initiated = "INITIATED",
  Refunded = "REFUNDED",
  Rejected = "REJECTED",
  Reserved = "RESERVED",
}

export type ProductType = {
  __typename?: "ProductType";
  description: Scalars["String"];
  id: Scalars["ID"];
  maxBuyableQuantity: Scalars["Int"];
  name: Scalars["String"];
  price: Scalars["Decimal"];
};

export type Queries = {
  __typename?: "Queries";
  activeBookingResponsible?: Maybe<BookingResponsibleType>;
  adminAllBookings?: Maybe<Array<AdminBookingType>>;
  allBlogPosts?: Maybe<Array<BlogPostType>>;
  allBlogs?: Maybe<Array<BlogType>>;
  allBookings?: Maybe<Array<AllBookingsType>>;
  allCategories?: Maybe<Array<CategoryType>>;
  allEvents?: Maybe<Array<EventType>>;
  allOrganizations?: Maybe<Array<OrganizationType>>;
  allUsers?: Maybe<Array<UserType>>;
  archiveByTypes: Array<ArchiveDocumentType>;
  attendeeReport?: Maybe<Scalars["String"]>;
  attendeeReportOrg?: Maybe<Scalars["String"]>;
  attendeeReports?: Maybe<Scalars["String"]>;
  availableYears: Array<Scalars["String"]>;
  blog?: Maybe<BlogType>;
  blogPost?: Maybe<BlogPostType>;
  bookingSemester?: Maybe<UpdateBookingSemesterType>;
  cabins?: Maybe<Array<CabinType>>;
  category?: Maybe<CategoryType>;
  defaultEvents?: Maybe<Array<EventType>>;
  event?: Maybe<EventType>;
  eventFilteredOrganizations?: Maybe<Array<OrganizationType>>;
  featuredArchive: Array<ArchiveDocumentType>;
  form?: Maybe<FormType>;
  forms?: Maybe<Array<FormType>>;
  hasPermission?: Maybe<Scalars["Boolean"]>;
  listing?: Maybe<ListingType>;
  listings?: Maybe<Array<ListingType>>;
  logout: Scalars["String"];
  memberships?: Maybe<Array<MembershipType>>;
  order?: Maybe<OrderType>;
  ordersByStatus?: Maybe<OrdersByStatusType>;
  organization?: Maybe<OrganizationType>;
  product?: Maybe<ProductType>;
  products?: Maybe<Array<ProductType>>;
  response?: Maybe<ResponseType>;
  responses?: Maybe<Array<ResponseType>>;
  serverTime?: Maybe<Scalars["DateTime"]>;
  signUps?: Maybe<SignUpType>;
  user?: Maybe<UserType>;
  userOrders?: Maybe<Array<OrderType>>;
};

export type QueriesAdminAllBookingsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
};

export type QueriesAllEventsArgs = {
  category?: InputMaybe<Scalars["String"]>;
  endTime?: InputMaybe<Scalars["DateTime"]>;
  organization?: InputMaybe<Scalars["String"]>;
  startTime?: InputMaybe<Scalars["DateTime"]>;
};

export type QueriesAllOrganizationsArgs = {
  search?: InputMaybe<Scalars["String"]>;
};

export type QueriesArchiveByTypesArgs = {
  names?: InputMaybe<Scalars["String"]>;
  typeDoc: Array<InputMaybe<Scalars["String"]>>;
  year?: InputMaybe<Scalars["Int"]>;
};

export type QueriesAttendeeReportArgs = {
  eventId: Scalars["ID"];
  fields?: InputMaybe<Array<Scalars["String"]>>;
  filetype?: InputMaybe<Scalars["String"]>;
};

export type QueriesAttendeeReportOrgArgs = {
  fields?: InputMaybe<Array<Scalars["String"]>>;
  filetype?: InputMaybe<Scalars["String"]>;
  orgId: Scalars["ID"];
};

export type QueriesAttendeeReportsArgs = {
  eventIds: Array<Scalars["ID"]>;
  fields?: InputMaybe<Array<Scalars["String"]>>;
  filetype?: InputMaybe<Scalars["String"]>;
};

export type QueriesBlogArgs = {
  blogId: Scalars["ID"];
};

export type QueriesBlogPostArgs = {
  blogPostId: Scalars["ID"];
};

export type QueriesCategoryArgs = {
  id: Scalars["ID"];
};

export type QueriesEventArgs = {
  id: Scalars["ID"];
};

export type QueriesFormArgs = {
  formId?: InputMaybe<Scalars["ID"]>;
};

export type QueriesHasPermissionArgs = {
  permission: Scalars["String"];
};

export type QueriesListingArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueriesListingsArgs = {
  search?: InputMaybe<Scalars["String"]>;
};

export type QueriesMembershipsArgs = {
  organizationId?: InputMaybe<Scalars["ID"]>;
};

export type QueriesOrderArgs = {
  orderId: Scalars["ID"];
};

export type QueriesOrdersByStatusArgs = {
  productId: Scalars["ID"];
  status: Scalars["String"];
};

export type QueriesOrganizationArgs = {
  id?: InputMaybe<Scalars["ID"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type QueriesProductArgs = {
  productId: Scalars["ID"];
};

export type QueriesResponseArgs = {
  formId: Scalars["ID"];
  responseId?: InputMaybe<Scalars["ID"]>;
};

export type QueriesResponsesArgs = {
  formId: Scalars["ID"];
};

export type QueriesSignUpsArgs = {
  eventId: Scalars["ID"];
};

/** A question on a form. */
export type QuestionType = {
  __typename?: "QuestionType";
  answer?: Maybe<AnswerType>;
  answers?: Maybe<Array<AnswerType>>;
  description: Scalars["String"];
  id: Scalars["ID"];
  mandatory: Scalars["Boolean"];
  options?: Maybe<Array<OptionType>>;
  question: Scalars["String"];
  questionType?: Maybe<QuestionTypeEnum>;
};

/** A question on a form. */
export type QuestionTypeAnswersArgs = {
  userId?: InputMaybe<Scalars["ID"]>;
};

export enum QuestionTypeEnum {
  Checkboxes = "CHECKBOXES",
  Dropdown = "DROPDOWN",
  FileUpload = "FILE_UPLOAD",
  MultipleChoice = "MULTIPLE_CHOICE",
  Paragraph = "PARAGRAPH",
  ShortAnswer = "SHORT_ANSWER",
  Slider = "SLIDER",
}

/** An enumeration. */
export enum ResponseStatus {
  /** Red */
  A_0 = "A_0",
  /** Yellow */
  A_1 = "A_1",
  /** Green */
  A_2 = "A_2",
  /** Unknown */
  None = "NONE",
}

/** A response instance that contains information about a user's response to a form. */
export type ResponseType = {
  __typename?: "ResponseType";
  answers: Array<AnswerType>;
  form: FormType;
  id?: Maybe<Scalars["UUID"]>;
  questions?: Maybe<Array<QuestionType>>;
  respondent: UserType;
  status?: Maybe<ResponseStatus>;
  uuid: Scalars["UUID"];
};

export type ResponsibleGroupType = {
  __typename?: "ResponsibleGroupType";
  description?: Maybe<Scalars["String"]>;
  groupType: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  organization: OrganizationType;
  uuid: Scalars["UUID"];
};

/** Sends email to the user or an admin (or both) */
export type SendEmail = {
  __typename?: "SendEmail";
  ok?: Maybe<Scalars["Boolean"]>;
};

/** Send an email to all users signed up to an event */
export type SendEventEmails = {
  __typename?: "SendEventEmails";
  ok?: Maybe<Scalars["Boolean"]>;
};

export type SignUpType = {
  __typename?: "SignUpType";
  event: EventType;
  extraInformation: Scalars["String"];
  hasBoughtTicket?: Maybe<Scalars["Boolean"]>;
  id: Scalars["ID"];
  isAttending: Scalars["Boolean"];
  timestamp: Scalars["DateTime"];
  user: UserType;
  userAllergies?: Maybe<Scalars["String"]>;
  userEmail: Scalars["String"];
  userGradeYear: Scalars["Int"];
  userPhoneNumber: Scalars["String"];
};

export type SubmitOrUpdateAnswers = {
  __typename?: "SubmitOrUpdateAnswers";
  message?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type UpdateArchiveDocument = {
  __typename?: "UpdateArchiveDocument";
  event?: Maybe<ArchiveDocumentType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type UpdateBlog = {
  __typename?: "UpdateBlog";
  blog?: Maybe<BlogType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type UpdateBlogInput = {
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  organizationId?: InputMaybe<Scalars["ID"]>;
};

export type UpdateBlogPost = {
  __typename?: "UpdateBlogPost";
  blogPost?: Maybe<BlogPostType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type UpdateBlogPostInput = {
  blogId?: InputMaybe<Scalars["ID"]>;
  id: Scalars["ID"];
  text?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

/** Change the given booking */
export type UpdateBooking = {
  __typename?: "UpdateBooking";
  booking?: Maybe<AllBookingsType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type UpdateBookingInput = {
  cabins?: InputMaybe<Array<Scalars["Int"]>>;
  checkIn?: InputMaybe<Scalars["Date"]>;
  checkOut?: InputMaybe<Scalars["Date"]>;
  declineReason?: InputMaybe<Scalars["String"]>;
  externalParticipants?: InputMaybe<Scalars["Int"]>;
  extraInfo?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  internalParticipants?: InputMaybe<Scalars["Int"]>;
  isDeclined?: InputMaybe<Scalars["Boolean"]>;
  isTentative?: InputMaybe<Scalars["Boolean"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  receiverEmail?: InputMaybe<Scalars["String"]>;
};

/** Update the booking semester */
export type UpdateBookingSemester = {
  __typename?: "UpdateBookingSemester";
  bookingSemester?: Maybe<UpdateBookingSemesterType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type UpdateBookingSemesterInput = {
  fallEndDate?: InputMaybe<Scalars["Date"]>;
  fallSemesterActive?: InputMaybe<Scalars["Boolean"]>;
  fallStartDate?: InputMaybe<Scalars["Date"]>;
  springEndDate?: InputMaybe<Scalars["Date"]>;
  springSemesterActive?: InputMaybe<Scalars["Boolean"]>;
  springStartDate?: InputMaybe<Scalars["Date"]>;
};

export type UpdateBookingSemesterType = {
  __typename?: "UpdateBookingSemesterType";
  fallEndDate: Scalars["Date"];
  fallSemesterActive: Scalars["Boolean"];
  fallStartDate: Scalars["Date"];
  id: Scalars["ID"];
  springEndDate: Scalars["Date"];
  springSemesterActive: Scalars["Boolean"];
  springStartDate: Scalars["Date"];
};

/** Change the given cabin */
export type UpdateCabin = {
  __typename?: "UpdateCabin";
  cabin?: Maybe<CabinType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type UpdateCabinInput = {
  externalPrice?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["ID"]>;
  internalPrice?: InputMaybe<Scalars["Int"]>;
  maxGuests?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
};

/** Updates the category with a given ID with the data in category_data */
export type UpdateCategory = {
  __typename?: "UpdateCategory";
  category?: Maybe<CategoryType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

/** Updates the event with a given ID with the data in event_data */
export type UpdateEvent = {
  __typename?: "UpdateEvent";
  event?: Maybe<EventType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type UpdateEventInput = {
  allowedGradeYears?: InputMaybe<Array<Scalars["Int"]>>;
  availableSlots?: InputMaybe<Scalars["Int"]>;
  bindingSignup?: InputMaybe<Scalars["Boolean"]>;
  categoryId?: InputMaybe<Scalars["ID"]>;
  contactEmail?: InputMaybe<Scalars["String"]>;
  deadline?: InputMaybe<Scalars["DateTime"]>;
  description?: InputMaybe<Scalars["String"]>;
  endTime?: InputMaybe<Scalars["DateTime"]>;
  hasExtraInformation?: InputMaybe<Scalars["Boolean"]>;
  image?: InputMaybe<Scalars["String"]>;
  isAttendable?: InputMaybe<Scalars["Boolean"]>;
  location?: InputMaybe<Scalars["String"]>;
  organizationId?: InputMaybe<Scalars["ID"]>;
  price?: InputMaybe<Scalars["Float"]>;
  shortDescription?: InputMaybe<Scalars["String"]>;
  signupOpenDate?: InputMaybe<Scalars["DateTime"]>;
  startTime?: InputMaybe<Scalars["DateTime"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type UpdateForm = {
  __typename?: "UpdateForm";
  form?: Maybe<FormType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type UpdateListing = {
  __typename?: "UpdateListing";
  listing?: Maybe<ListingType>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type UpdateOrganization = {
  __typename?: "UpdateOrganization";
  ok?: Maybe<Scalars["Boolean"]>;
  organization?: Maybe<OrganizationType>;
};

export type UpdateQuestion = {
  __typename?: "UpdateQuestion";
  ok?: Maybe<Scalars["Boolean"]>;
  question?: Maybe<QuestionType>;
};

export type UpdateUser = {
  __typename?: "UpdateUser";
  user?: Maybe<UserType>;
};

export type UserAttendingType = {
  __typename?: "UserAttendingType";
  hasBoughtTicket?: Maybe<Scalars["Boolean"]>;
  isOnWaitingList?: Maybe<Scalars["Boolean"]>;
  isSignedUp?: Maybe<Scalars["Boolean"]>;
  positionOnWaitingList?: Maybe<Scalars["Int"]>;
};

export type UserInput = {
  allergies?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  graduationYear?: InputMaybe<Scalars["Int"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
};

export type UserType = {
  __typename?: "UserType";
  allergies?: Maybe<Scalars["String"]>;
  canUpdateYear?: Maybe<Scalars["Boolean"]>;
  dateJoined: Scalars["DateTime"];
  email: Scalars["String"];
  events?: Maybe<Array<EventType>>;
  feideEmail: Scalars["String"];
  feideUserid: Scalars["String"];
  firstLogin: Scalars["Boolean"];
  firstName: Scalars["String"];
  gradeYear?: Maybe<Scalars["Int"]>;
  graduationYear?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  idToken: Scalars["String"];
  lastLogin?: Maybe<Scalars["DateTime"]>;
  lastName: Scalars["String"];
  memberships: Array<MembershipType>;
  organizations: Array<OrganizationType>;
  phoneNumber: Scalars["String"];
  responses: Array<ResponseType>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
  yearUpdatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ArchiveByTypesQueryVariables = Exact<{
  documentTypes: Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>;
  year?: InputMaybe<Scalars["Int"]>;
  names?: InputMaybe<Scalars["String"]>;
}>;

export type ArchiveByTypesQuery = {
  __typename?: "Queries";
  archiveByTypes: Array<{
    __typename?: "ArchiveDocumentType";
    id: string;
    title: string;
    thumbnail?: string | null;
    typeDoc: ArchiveDocumentTypeDoc;
    year?: number | null;
    webLink?: string | null;
  }>;
};

export type FeaturedArchiveQueryVariables = Exact<{ [key: string]: never }>;

export type FeaturedArchiveQuery = {
  __typename?: "Queries";
  featuredArchive: Array<{
    __typename?: "ArchiveDocumentType";
    id: string;
    title: string;
    thumbnail?: string | null;
    featured: boolean;
    typeDoc: ArchiveDocumentTypeDoc;
    year?: number | null;
    webLink?: string | null;
  }>;
};

export type AvailableYearsQueryVariables = Exact<{ [key: string]: never }>;

export type AvailableYearsQuery = { __typename?: "Queries"; availableYears: Array<string> };

export type CabinFragment = {
  __typename?: "CabinType";
  id: string;
  name: string;
  maxGuests: number;
  internalPrice: number;
  externalPrice: number;
};

export type BookingFragment = {
  __typename?: "AllBookingsType";
  id: string;
  checkIn: string;
  checkOut: string;
  cabins: Array<{ __typename?: "CabinType"; id: string; name: string }>;
};

export type AdminBookingFragment = {
  __typename?: "AdminBookingType";
  id: string;
  checkIn: string;
  checkOut: string;
  firstName: string;
  lastName: string;
  phone: string;
  receiverEmail: string;
  externalParticipants: number;
  internalParticipants: number;
  price?: number | null;
  isTentative: boolean;
  isDeclined: boolean;
  timestamp: string;
  extraInfo: string;
  declineReason: string;
  cabins: Array<{ __typename?: "CabinType"; id: string; name: string }>;
};

export type BookingResponsibleFragment = {
  __typename?: "BookingResponsibleType";
  id: string;
  active?: boolean | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: number | null;
};

export type BookingSemesterFragment = {
  __typename?: "UpdateBookingSemesterType";
  fallStartDate: string;
  fallEndDate: string;
  springStartDate: string;
  springEndDate: string;
  fallSemesterActive: boolean;
  springSemesterActive: boolean;
};

export type CreateBookingMutationVariables = Exact<{
  bookingData: BookingInput;
}>;

export type CreateBookingMutation = {
  __typename?: "Mutations";
  createBooking?: { __typename?: "CreateBooking"; ok?: boolean | null } | null;
};

export type ConfirmBookingMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ConfirmBookingMutation = {
  __typename?: "Mutations";
  updateBooking?: { __typename?: "UpdateBooking"; ok?: boolean | null } | null;
};

export type DeclineBookingMutationVariables = Exact<{
  id: Scalars["ID"];
  declineReason?: InputMaybe<Scalars["String"]>;
}>;

export type DeclineBookingMutation = {
  __typename?: "Mutations";
  updateBooking?: { __typename?: "UpdateBooking"; ok?: boolean | null } | null;
};

export type SendEmailMutationVariables = Exact<{
  emailInput: EmailInput;
}>;

export type SendEmailMutation = {
  __typename?: "Mutations";
  sendEmail?: { __typename?: "SendEmail"; ok?: boolean | null } | null;
};

export type UpdateCabinMutationVariables = Exact<{
  cabinData: UpdateCabinInput;
}>;

export type UpdateCabinMutation = {
  __typename?: "Mutations";
  updateCabin?: {
    __typename?: "UpdateCabin";
    cabin?: {
      __typename?: "CabinType";
      id: string;
      name: string;
      maxGuests: number;
      internalPrice: number;
      externalPrice: number;
    } | null;
  } | null;
};

export type UpdateBookingSemesterMutationVariables = Exact<{
  semesterData: UpdateBookingSemesterInput;
}>;

export type UpdateBookingSemesterMutation = {
  __typename?: "Mutations";
  updateBookingSemester?: {
    __typename?: "UpdateBookingSemester";
    bookingSemester?: {
      __typename?: "UpdateBookingSemesterType";
      fallStartDate: string;
      fallEndDate: string;
      springStartDate: string;
      springEndDate: string;
      fallSemesterActive: boolean;
      springSemesterActive: boolean;
    } | null;
  } | null;
};

export type CabinsQueryVariables = Exact<{ [key: string]: never }>;

export type CabinsQuery = {
  __typename?: "Queries";
  cabins?: Array<{
    __typename?: "CabinType";
    id: string;
    name: string;
    maxGuests: number;
    internalPrice: number;
    externalPrice: number;
  }> | null;
};

export type AllBookingsQueryVariables = Exact<{ [key: string]: never }>;

export type AllBookingsQuery = {
  __typename?: "Queries";
  allBookings?: Array<{
    __typename?: "AllBookingsType";
    id: string;
    checkIn: string;
    checkOut: string;
    cabins: Array<{ __typename?: "CabinType"; id: string; name: string }>;
  }> | null;
};

export type AdminAllBookingsQueryVariables = Exact<{
  after?: InputMaybe<Scalars["String"]>;
}>;

export type AdminAllBookingsQuery = {
  __typename?: "Queries";
  adminAllBookings?: Array<{
    __typename?: "AdminBookingType";
    id: string;
    checkIn: string;
    checkOut: string;
    firstName: string;
    lastName: string;
    phone: string;
    receiverEmail: string;
    externalParticipants: number;
    internalParticipants: number;
    price?: number | null;
    isTentative: boolean;
    isDeclined: boolean;
    timestamp: string;
    extraInfo: string;
    declineReason: string;
    cabins: Array<{ __typename?: "CabinType"; id: string; name: string }>;
  }> | null;
};

export type ActiveBookingResponsibleQueryVariables = Exact<{ [key: string]: never }>;

export type ActiveBookingResponsibleQuery = {
  __typename?: "Queries";
  activeBookingResponsible?: {
    __typename?: "BookingResponsibleType";
    id: string;
    active?: boolean | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: number | null;
  } | null;
};

export type CabinsAndResponsiblesQueryVariables = Exact<{ [key: string]: never }>;

export type CabinsAndResponsiblesQuery = {
  __typename?: "Queries";
  cabins?: Array<{
    __typename?: "CabinType";
    id: string;
    name: string;
    maxGuests: number;
    internalPrice: number;
    externalPrice: number;
  }> | null;
  activeBookingResponsible?: { __typename?: "BookingResponsibleType"; id: string; email?: string | null } | null;
};

export type BookingSemesterQueryVariables = Exact<{ [key: string]: never }>;

export type BookingSemesterQuery = {
  __typename?: "Queries";
  bookingSemester?: {
    __typename?: "UpdateBookingSemesterType";
    fallStartDate: string;
    fallEndDate: string;
    springStartDate: string;
    springEndDate: string;
    fallSemesterActive: boolean;
    springSemesterActive: boolean;
  } | null;
};

export type ProductFragment = {
  __typename?: "ProductType";
  id: string;
  name: string;
  description: string;
  price: number;
  maxBuyableQuantity: number;
};

export type OrderFragment = {
  __typename?: "OrderType";
  id: string;
  quantity: number;
  totalPrice: number;
  paymentStatus: PaymentStatus;
  timestamp: string;
  product: {
    __typename?: "ProductType";
    id: string;
    name: string;
    description: string;
    price: number;
    maxBuyableQuantity: number;
  };
};

export type InitiateOrderMutationVariables = Exact<{
  productId: Scalars["ID"];
  quantity?: InputMaybe<Scalars["Int"]>;
  fallbackRedirect?: InputMaybe<Scalars["String"]>;
}>;

export type InitiateOrderMutation = {
  __typename?: "Mutations";
  initiateOrder?: { __typename?: "InitiateOrder"; redirect?: string | null; orderId?: string | null } | null;
};

export type AttemptCapturePaymentMutationVariables = Exact<{
  orderId: Scalars["ID"];
}>;

export type AttemptCapturePaymentMutation = {
  __typename?: "Mutations";
  attemptCapturePayment?: {
    __typename?: "AttemptCapturePayment";
    status?: PaymentStatus | null;
    order?: {
      __typename?: "OrderType";
      id: string;
      quantity: number;
      totalPrice: number;
      paymentStatus: PaymentStatus;
      timestamp: string;
      product: {
        __typename?: "ProductType";
        id: string;
        name: string;
        description: string;
        price: number;
        maxBuyableQuantity: number;
      };
    } | null;
  } | null;
};

export type ProductQueryVariables = Exact<{
  productId: Scalars["ID"];
}>;

export type ProductQuery = {
  __typename?: "Queries";
  product?: {
    __typename?: "ProductType";
    id: string;
    name: string;
    description: string;
    price: number;
    maxBuyableQuantity: number;
  } | null;
};

export type UserOrdersQueryVariables = Exact<{ [key: string]: never }>;

export type UserOrdersQuery = {
  __typename?: "Queries";
  userOrders?: Array<{
    __typename?: "OrderType";
    id: string;
    quantity: number;
    totalPrice: number;
    paymentStatus: PaymentStatus;
    timestamp: string;
    product: {
      __typename?: "ProductType";
      id: string;
      name: string;
      description: string;
      price: number;
      maxBuyableQuantity: number;
    };
  }> | null;
};

export type EventFragment = {
  __typename?: "EventType";
  id: string;
  title: string;
  startTime: string;
  endTime?: string | null;
  location?: string | null;
  description: string;
  image?: string | null;
  isAttendable: boolean;
  deadline?: string | null;
  availableSlots?: number | null;
  price?: number | null;
  shortDescription?: string | null;
  signupOpenDate?: string | null;
  isFull?: boolean | null;
  hasExtraInformation: boolean;
  bindingSignup: boolean;
  contactEmail: string;
  allowedGradeYears?: Array<number> | null;
  organization: { __typename?: "OrganizationType"; id: string; name: string };
  category?: { __typename?: "CategoryType"; id: string; name: string } | null;
  publisher?: {
    __typename?: "UserType";
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dateJoined: string;
  } | null;
  userAttendance?: {
    __typename?: "UserAttendingType";
    isSignedUp?: boolean | null;
    isOnWaitingList?: boolean | null;
    hasBoughtTicket?: boolean | null;
    positionOnWaitingList?: number | null;
  } | null;
  product?: { __typename?: "ProductType"; id: string } | null;
};

export type EventInListFragment = {
  __typename?: "EventType";
  id: string;
  title: string;
  startTime: string;
  endTime?: string | null;
  location?: string | null;
  description: string;
  image?: string | null;
  isAttendable: boolean;
  deadline?: string | null;
  price?: number | null;
  shortDescription?: string | null;
  signupOpenDate?: string | null;
  isFull?: boolean | null;
  hasExtraInformation: boolean;
  allowedGradeYears?: Array<number> | null;
  organization: { __typename?: "OrganizationType"; name: string; color?: string | null };
  category?: { __typename?: "CategoryType"; name: string } | null;
  publisher?: {
    __typename?: "UserType";
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dateJoined: string;
  } | null;
  userAttendance?: {
    __typename?: "UserAttendingType";
    isSignedUp?: boolean | null;
    isOnWaitingList?: boolean | null;
  } | null;
};

export type AdminEventFragment = {
  __typename?: "EventType";
  id: string;
  title: string;
  startTime: string;
  endTime?: string | null;
  location?: string | null;
  description: string;
  image?: string | null;
  isAttendable: boolean;
  deadline?: string | null;
  availableSlots?: number | null;
  price?: number | null;
  shortDescription?: string | null;
  signupOpenDate?: string | null;
  isFull?: boolean | null;
  hasExtraInformation: boolean;
  bindingSignup: boolean;
  contactEmail: string;
  allowedGradeYears?: Array<number> | null;
  organization: { __typename?: "OrganizationType"; id: string; name: string };
  category?: { __typename?: "CategoryType"; id: string; name: string } | null;
  publisher?: {
    __typename?: "UserType";
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dateJoined: string;
  } | null;
  usersAttending?: Array<{
    __typename?: "SignUpType";
    userEmail: string;
    userGradeYear: number;
    userAllergies?: string | null;
    userPhoneNumber: string;
    extraInformation: string;
    hasBoughtTicket?: boolean | null;
    user: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
  }> | null;
  usersOnWaitingList?: Array<{
    __typename?: "SignUpType";
    userEmail: string;
    userGradeYear: number;
    userAllergies?: string | null;
    userPhoneNumber: string;
    extraInformation: string;
    user: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
  }> | null;
  userAttendance?: {
    __typename?: "UserAttendingType";
    isSignedUp?: boolean | null;
    isOnWaitingList?: boolean | null;
  } | null;
  product?: { __typename?: "ProductType"; id: string } | null;
};

export type SignUpFragment = {
  __typename?: "SignUpType";
  userEmail: string;
  userGradeYear: number;
  userAllergies?: string | null;
  userPhoneNumber: string;
  extraInformation: string;
  user: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
};

export type SignUpWithTicketFragment = {
  __typename?: "SignUpType";
  userEmail: string;
  userGradeYear: number;
  userAllergies?: string | null;
  userPhoneNumber: string;
  extraInformation: string;
  hasBoughtTicket?: boolean | null;
  user: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
};

export type CreateEventMutationVariables = Exact<{
  eventData: CreateEventInput;
}>;

export type CreateEventMutation = {
  __typename?: "Mutations";
  createEvent?: {
    __typename?: "CreateEvent";
    ok?: boolean | null;
    event?: {
      __typename?: "EventType";
      id: string;
      title: string;
      startTime: string;
      endTime?: string | null;
      location?: string | null;
      description: string;
      image?: string | null;
      isAttendable: boolean;
      deadline?: string | null;
      price?: number | null;
      shortDescription?: string | null;
      signupOpenDate?: string | null;
      isFull?: boolean | null;
      hasExtraInformation: boolean;
      allowedGradeYears?: Array<number> | null;
      organization: { __typename?: "OrganizationType"; name: string; color?: string | null };
      category?: { __typename?: "CategoryType"; name: string } | null;
      publisher?: {
        __typename?: "UserType";
        id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        dateJoined: string;
      } | null;
      userAttendance?: {
        __typename?: "UserAttendingType";
        isSignedUp?: boolean | null;
        isOnWaitingList?: boolean | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateEventMutationVariables = Exact<{
  id: Scalars["ID"];
  eventData: UpdateEventInput;
}>;

export type UpdateEventMutation = {
  __typename?: "Mutations";
  updateEvent?: {
    __typename?: "UpdateEvent";
    ok?: boolean | null;
    event?: {
      __typename?: "EventType";
      id: string;
      title: string;
      startTime: string;
      endTime?: string | null;
      location?: string | null;
      description: string;
      image?: string | null;
      isAttendable: boolean;
      deadline?: string | null;
      availableSlots?: number | null;
      price?: number | null;
      shortDescription?: string | null;
      signupOpenDate?: string | null;
      isFull?: boolean | null;
      hasExtraInformation: boolean;
      bindingSignup: boolean;
      contactEmail: string;
      allowedGradeYears?: Array<number> | null;
      organization: { __typename?: "OrganizationType"; id: string; name: string };
      category?: { __typename?: "CategoryType"; id: string; name: string } | null;
      publisher?: {
        __typename?: "UserType";
        id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        dateJoined: string;
      } | null;
      userAttendance?: {
        __typename?: "UserAttendingType";
        isSignedUp?: boolean | null;
        isOnWaitingList?: boolean | null;
        hasBoughtTicket?: boolean | null;
        positionOnWaitingList?: number | null;
      } | null;
      product?: { __typename?: "ProductType"; id: string } | null;
    } | null;
  } | null;
};

export type EventSignUpMutationVariables = Exact<{
  eventId: Scalars["ID"];
  extraInformation?: InputMaybe<Scalars["String"]>;
}>;

export type EventSignUpMutation = {
  __typename?: "Mutations";
  eventSignUp?: {
    __typename?: "EventSignUp";
    isFull?: boolean | null;
    event?: {
      __typename?: "EventType";
      id: string;
      userAttendance?: {
        __typename?: "UserAttendingType";
        isSignedUp?: boolean | null;
        isOnWaitingList?: boolean | null;
        positionOnWaitingList?: number | null;
      } | null;
    } | null;
  } | null;
};

export type EventSignOffMutationVariables = Exact<{
  eventId: Scalars["ID"];
}>;

export type EventSignOffMutation = {
  __typename?: "Mutations";
  eventSignOff?: {
    __typename?: "EventSignOff";
    isFull?: boolean | null;
    event?: {
      __typename?: "EventType";
      id: string;
      userAttendance?: {
        __typename?: "UserAttendingType";
        isSignedUp?: boolean | null;
        isOnWaitingList?: boolean | null;
        positionOnWaitingList?: number | null;
      } | null;
    } | null;
  } | null;
};

export type AdminEventSignOffMutationVariables = Exact<{
  eventId: Scalars["ID"];
  userId: Scalars["ID"];
}>;

export type AdminEventSignOffMutation = {
  __typename?: "Mutations";
  adminEventSignOff?: {
    __typename?: "AdminEventSignOff";
    event?: { __typename?: "EventType"; id: string } | null;
  } | null;
};

export type SendEventMailsMutationVariables = Exact<{
  eventId: Scalars["ID"];
  receiverEmails?: InputMaybe<Array<Scalars["String"]> | Scalars["String"]>;
  content?: InputMaybe<Scalars["String"]>;
  subject: Scalars["String"];
}>;

export type SendEventMailsMutation = {
  __typename?: "Mutations";
  sendEventMails?: { __typename?: "SendEventEmails"; ok?: boolean | null } | null;
};

export type EventQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type EventQuery = {
  __typename?: "Queries";
  event?: {
    __typename?: "EventType";
    id: string;
    title: string;
    startTime: string;
    endTime?: string | null;
    location?: string | null;
    description: string;
    image?: string | null;
    isAttendable: boolean;
    deadline?: string | null;
    availableSlots?: number | null;
    price?: number | null;
    shortDescription?: string | null;
    signupOpenDate?: string | null;
    isFull?: boolean | null;
    hasExtraInformation: boolean;
    bindingSignup: boolean;
    contactEmail: string;
    allowedGradeYears?: Array<number> | null;
    organization: { __typename?: "OrganizationType"; id: string; name: string };
    category?: { __typename?: "CategoryType"; id: string; name: string } | null;
    publisher?: {
      __typename?: "UserType";
      id: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      dateJoined: string;
    } | null;
    userAttendance?: {
      __typename?: "UserAttendingType";
      isSignedUp?: boolean | null;
      isOnWaitingList?: boolean | null;
      hasBoughtTicket?: boolean | null;
      positionOnWaitingList?: number | null;
    } | null;
    product?: { __typename?: "ProductType"; id: string } | null;
  } | null;
};

export type EventFieldsFragment = {
  __typename?: "EventType";
  id: string;
  title: string;
  startTime: string;
  shortDescription?: string | null;
  allowedGradeYears?: Array<number> | null;
  isFull?: boolean | null;
  isAttendable: boolean;
  userAttendance?: {
    __typename?: "UserAttendingType";
    isSignedUp?: boolean | null;
    isOnWaitingList?: boolean | null;
  } | null;
  organization: { __typename?: "OrganizationType"; id: string; color?: string | null };
};

export type EventsQueryVariables = Exact<{
  organization?: InputMaybe<Scalars["String"]>;
  category?: InputMaybe<Scalars["String"]>;
  startTime?: InputMaybe<Scalars["DateTime"]>;
  endTime?: InputMaybe<Scalars["DateTime"]>;
}>;

export type EventsQuery = {
  __typename?: "Queries";
  allEvents?: Array<{
    __typename?: "EventType";
    id: string;
    title: string;
    startTime: string;
    shortDescription?: string | null;
    allowedGradeYears?: Array<number> | null;
    isFull?: boolean | null;
    isAttendable: boolean;
    userAttendance?: {
      __typename?: "UserAttendingType";
      isSignedUp?: boolean | null;
      isOnWaitingList?: boolean | null;
    } | null;
    organization: { __typename?: "OrganizationType"; id: string; color?: string | null };
  }> | null;
  defaultEvents?: Array<{
    __typename?: "EventType";
    id: string;
    title: string;
    startTime: string;
    shortDescription?: string | null;
    allowedGradeYears?: Array<number> | null;
    isFull?: boolean | null;
    isAttendable: boolean;
    userAttendance?: {
      __typename?: "UserAttendingType";
      isSignedUp?: boolean | null;
      isOnWaitingList?: boolean | null;
    } | null;
    organization: { __typename?: "OrganizationType"; id: string; color?: string | null };
  }> | null;
  user?: { __typename?: "UserType"; id: string; gradeYear?: number | null } | null;
};

export type EventDetailFieldsFragment = {
  __typename?: "EventType";
  id: string;
  title: string;
  description: string;
  shortDescription?: string | null;
  startTime: string;
  endTime?: string | null;
  location?: string | null;
  contactEmail: string;
  allowedGradeYears?: Array<number> | null;
  hasExtraInformation: boolean;
  isFull?: boolean | null;
  signupOpenDate?: string | null;
  deadline?: string | null;
  isAttendable: boolean;
  bindingSignup: boolean;
  userAttendance?: {
    __typename?: "UserAttendingType";
    isSignedUp?: boolean | null;
    isOnWaitingList?: boolean | null;
    positionOnWaitingList?: number | null;
  } | null;
  category?: { __typename?: "CategoryType"; id: string; name: string } | null;
  organization: { __typename?: "OrganizationType"; id: string; name: string; logoUrl?: string | null };
};

export type EventDetailsQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type EventDetailsQuery = {
  __typename?: "Queries";
  event?: {
    __typename?: "EventType";
    id: string;
    title: string;
    description: string;
    shortDescription?: string | null;
    startTime: string;
    endTime?: string | null;
    location?: string | null;
    contactEmail: string;
    allowedGradeYears?: Array<number> | null;
    hasExtraInformation: boolean;
    isFull?: boolean | null;
    signupOpenDate?: string | null;
    deadline?: string | null;
    isAttendable: boolean;
    bindingSignup: boolean;
    userAttendance?: {
      __typename?: "UserAttendingType";
      isSignedUp?: boolean | null;
      isOnWaitingList?: boolean | null;
      positionOnWaitingList?: number | null;
    } | null;
    category?: { __typename?: "CategoryType"; id: string; name: string } | null;
    organization: { __typename?: "OrganizationType"; id: string; name: string; logoUrl?: string | null };
  } | null;
};

export type AllEventsQueryVariables = Exact<{
  organization?: InputMaybe<Scalars["String"]>;
  category?: InputMaybe<Scalars["String"]>;
  startTime?: InputMaybe<Scalars["DateTime"]>;
  endTime?: InputMaybe<Scalars["DateTime"]>;
}>;

export type AllEventsQuery = {
  __typename?: "Queries";
  allEvents?: Array<{
    __typename?: "EventType";
    id: string;
    title: string;
    startTime: string;
    endTime?: string | null;
    location?: string | null;
    description: string;
    image?: string | null;
    isAttendable: boolean;
    deadline?: string | null;
    price?: number | null;
    shortDescription?: string | null;
    signupOpenDate?: string | null;
    isFull?: boolean | null;
    hasExtraInformation: boolean;
    allowedGradeYears?: Array<number> | null;
    organization: { __typename?: "OrganizationType"; name: string; color?: string | null };
    category?: { __typename?: "CategoryType"; name: string } | null;
    publisher?: {
      __typename?: "UserType";
      id: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      dateJoined: string;
    } | null;
    userAttendance?: {
      __typename?: "UserAttendingType";
      isSignedUp?: boolean | null;
      isOnWaitingList?: boolean | null;
    } | null;
  }> | null;
};

export type DefaultEventsQueryVariables = Exact<{ [key: string]: never }>;

export type DefaultEventsQuery = {
  __typename?: "Queries";
  defaultEvents?: Array<{
    __typename?: "EventType";
    id: string;
    title: string;
    startTime: string;
    endTime?: string | null;
    location?: string | null;
    description: string;
    image?: string | null;
    isAttendable: boolean;
    deadline?: string | null;
    price?: number | null;
    shortDescription?: string | null;
    signupOpenDate?: string | null;
    isFull?: boolean | null;
    hasExtraInformation: boolean;
    allowedGradeYears?: Array<number> | null;
    organization: { __typename?: "OrganizationType"; name: string; color?: string | null };
    category?: { __typename?: "CategoryType"; name: string } | null;
    publisher?: {
      __typename?: "UserType";
      id: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      dateJoined: string;
    } | null;
    userAttendance?: {
      __typename?: "UserAttendingType";
      isSignedUp?: boolean | null;
      isOnWaitingList?: boolean | null;
    } | null;
  }> | null;
};

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type AllCategoriesQuery = {
  __typename?: "Queries";
  allCategories?: Array<{ __typename?: "CategoryType"; id: string; name: string }> | null;
};

export type EventFilteredOrganizationsQueryVariables = Exact<{ [key: string]: never }>;

export type EventFilteredOrganizationsQuery = {
  __typename?: "Queries";
  eventFilteredOrganizations?: Array<{
    __typename?: "OrganizationType";
    id: string;
    name: string;
    color?: string | null;
    children: Array<{ __typename?: "OrganizationType"; id: string; name: string }>;
  }> | null;
};

export type AdminEventQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AdminEventQuery = {
  __typename?: "Queries";
  event?: {
    __typename?: "EventType";
    id: string;
    title: string;
    startTime: string;
    endTime?: string | null;
    location?: string | null;
    description: string;
    image?: string | null;
    isAttendable: boolean;
    deadline?: string | null;
    availableSlots?: number | null;
    price?: number | null;
    shortDescription?: string | null;
    signupOpenDate?: string | null;
    isFull?: boolean | null;
    hasExtraInformation: boolean;
    bindingSignup: boolean;
    contactEmail: string;
    allowedGradeYears?: Array<number> | null;
    organization: { __typename?: "OrganizationType"; id: string; name: string };
    category?: { __typename?: "CategoryType"; id: string; name: string } | null;
    publisher?: {
      __typename?: "UserType";
      id: string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      dateJoined: string;
    } | null;
    usersAttending?: Array<{
      __typename?: "SignUpType";
      userEmail: string;
      userGradeYear: number;
      userAllergies?: string | null;
      userPhoneNumber: string;
      extraInformation: string;
      hasBoughtTicket?: boolean | null;
      user: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
    }> | null;
    usersOnWaitingList?: Array<{
      __typename?: "SignUpType";
      userEmail: string;
      userGradeYear: number;
      userAllergies?: string | null;
      userPhoneNumber: string;
      extraInformation: string;
      user: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
    }> | null;
    userAttendance?: {
      __typename?: "UserAttendingType";
      isSignedUp?: boolean | null;
      isOnWaitingList?: boolean | null;
    } | null;
    product?: { __typename?: "ProductType"; id: string } | null;
  } | null;
};

export type EventSignUpsQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type EventSignUpsQuery = {
  __typename?: "Queries";
  event?: {
    __typename?: "EventType";
    isAttendable: boolean;
    usersAttending?: Array<{ __typename?: "SignUpType"; userEmail: string }> | null;
  } | null;
};

export type AttendeeReportQueryVariables = Exact<{
  eventId: Scalars["ID"];
  fields?: InputMaybe<Array<Scalars["String"]> | Scalars["String"]>;
  filetype?: InputMaybe<Scalars["String"]>;
}>;

export type AttendeeReportQuery = { __typename?: "Queries"; attendeeReport?: string | null };

export type AttendeeReportOrgQueryVariables = Exact<{
  orgId: Scalars["ID"];
  fields?: InputMaybe<Array<Scalars["String"]> | Scalars["String"]>;
  filetype?: InputMaybe<Scalars["String"]>;
}>;

export type AttendeeReportOrgQuery = { __typename?: "Queries"; attendeeReportOrg?: string | null };

export type AttendeeReportsQueryVariables = Exact<{
  eventIds: Array<Scalars["ID"]> | Scalars["ID"];
  fields?: InputMaybe<Array<Scalars["String"]> | Scalars["String"]>;
  filetype?: InputMaybe<Scalars["String"]>;
}>;

export type AttendeeReportsQuery = { __typename?: "Queries"; attendeeReports?: string | null };

export type EventUserOrganizationsQueryVariables = Exact<{ [key: string]: never }>;

export type EventUserOrganizationsQuery = {
  __typename?: "Queries";
  user?: {
    __typename?: "UserType";
    id: string;
    organizations: Array<{ __typename?: "OrganizationType"; id: string }>;
  } | null;
};

export type FormFragment = {
  __typename?: "FormType";
  id: string;
  name: string;
  questions: Array<{
    __typename?: "QuestionType";
    id: string;
    question: string;
    description: string;
    questionType?: QuestionTypeEnum | null;
    mandatory: boolean;
    options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
  }>;
};

export type FormWithAnswersFragment = {
  __typename?: "FormType";
  id: string;
  name: string;
  description: string;
  questions: Array<{
    __typename?: "QuestionType";
    id: string;
    question: string;
    description: string;
    questionType?: QuestionTypeEnum | null;
    mandatory: boolean;
    answer?: { __typename?: "AnswerType"; id?: string | null; answer: string } | null;
    options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
  }>;
};

export type FormWithAllResponsesFragment = {
  __typename?: "FormType";
  id: string;
  name: string;
  questions: Array<{
    __typename?: "QuestionType";
    id: string;
    question: string;
    description: string;
    questionType?: QuestionTypeEnum | null;
    mandatory: boolean;
    answers?: Array<{ __typename?: "AnswerType"; id?: string | null }> | null;
    options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
  }>;
  responses?: Array<{
    __typename?: "ResponseType";
    id?: string | null;
    respondent: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
    answers: Array<{
      __typename?: "AnswerType";
      id?: string | null;
      answer: string;
      question: { __typename?: "QuestionType"; id: string };
    }>;
  }> | null;
};

export type ResponseFragment = {
  __typename?: "ResponseType";
  id?: string | null;
  respondent: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
  answers: Array<{
    __typename?: "AnswerType";
    id?: string | null;
    answer: string;
    question: { __typename?: "QuestionType"; id: string };
  }>;
};

export type QuestionFragment = {
  __typename?: "QuestionType";
  id: string;
  question: string;
  description: string;
  questionType?: QuestionTypeEnum | null;
  mandatory: boolean;
  options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
};

export type QuestionWithAnswerFragment = {
  __typename?: "QuestionType";
  id: string;
  question: string;
  description: string;
  questionType?: QuestionTypeEnum | null;
  mandatory: boolean;
  answer?: { __typename?: "AnswerType"; id?: string | null; answer: string } | null;
  options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
};

export type QuestionWithAnswerIdsFragment = {
  __typename?: "QuestionType";
  id: string;
  question: string;
  description: string;
  questionType?: QuestionTypeEnum | null;
  mandatory: boolean;
  answers?: Array<{ __typename?: "AnswerType"; id?: string | null }> | null;
  options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
};

export type OptionFragment = { __typename?: "OptionType"; id: string; answer: string };

export type AnswerFragment = { __typename?: "AnswerType"; id?: string | null; answer: string };

export type AnswerWithQuestionIdFragment = {
  __typename?: "AnswerType";
  id?: string | null;
  answer: string;
  question: { __typename?: "QuestionType"; id: string };
};

export type CreateFormMutationVariables = Exact<{
  formData: CreateFormInput;
  listingId?: InputMaybe<Scalars["ID"]>;
}>;

export type CreateFormMutation = {
  __typename?: "Mutations";
  createForm?: {
    __typename?: "CreateForm";
    ok?: boolean | null;
    form?: {
      __typename?: "FormType";
      id: string;
      name: string;
      questions: Array<{
        __typename?: "QuestionType";
        id: string;
        question: string;
        description: string;
        questionType?: QuestionTypeEnum | null;
        mandatory: boolean;
        answers?: Array<{ __typename?: "AnswerType"; id?: string | null }> | null;
        options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
      }>;
      responses?: Array<{
        __typename?: "ResponseType";
        id?: string | null;
        respondent: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
        answers: Array<{
          __typename?: "AnswerType";
          id?: string | null;
          answer: string;
          question: { __typename?: "QuestionType"; id: string };
        }>;
      }> | null;
    } | null;
  } | null;
};

export type UpdateFormMutationVariables = Exact<{
  id: Scalars["ID"];
  formData: BaseFormInput;
}>;

export type UpdateFormMutation = {
  __typename?: "Mutations";
  updateForm?: {
    __typename?: "UpdateForm";
    ok?: boolean | null;
    form?: {
      __typename?: "FormType";
      id: string;
      name: string;
      questions: Array<{
        __typename?: "QuestionType";
        id: string;
        question: string;
        description: string;
        questionType?: QuestionTypeEnum | null;
        mandatory: boolean;
        answers?: Array<{ __typename?: "AnswerType"; id?: string | null }> | null;
        options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
      }>;
      responses?: Array<{
        __typename?: "ResponseType";
        id?: string | null;
        respondent: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
        answers: Array<{
          __typename?: "AnswerType";
          id?: string | null;
          answer: string;
          question: { __typename?: "QuestionType"; id: string };
        }>;
      }> | null;
    } | null;
  } | null;
};

export type CreateQuestionMutationVariables = Exact<{
  formId: Scalars["ID"];
  questionData: CreateQuestionInput;
}>;

export type CreateQuestionMutation = {
  __typename?: "Mutations";
  createQuestion?: {
    __typename?: "CreateQuestion";
    ok?: boolean | null;
    question?: {
      __typename?: "QuestionType";
      id: string;
      question: string;
      description: string;
      questionType?: QuestionTypeEnum | null;
      mandatory: boolean;
      answers?: Array<{ __typename?: "AnswerType"; id?: string | null }> | null;
      options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
    } | null;
  } | null;
};

export type UpdateQuestionMutationVariables = Exact<{
  id: Scalars["ID"];
  questionData: BaseQuestionInput;
  optionData?: InputMaybe<Array<OptionInput> | OptionInput>;
}>;

export type UpdateQuestionMutation = {
  __typename?: "Mutations";
  createUpdateAndDeleteOptions?: { __typename?: "CreateUpdateAndDeleteOptions"; ok?: boolean | null } | null;
  updateQuestion?: {
    __typename?: "UpdateQuestion";
    ok?: boolean | null;
    question?: {
      __typename?: "QuestionType";
      id: string;
      question: string;
      description: string;
      questionType?: QuestionTypeEnum | null;
      mandatory: boolean;
      answers?: Array<{ __typename?: "AnswerType"; id?: string | null }> | null;
      options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
    } | null;
  } | null;
};

export type DeleteQuestionMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteQuestionMutation = {
  __typename?: "Mutations";
  deleteQuestion?: { __typename?: "DeleteQuestion"; deletedId?: string | null; ok?: boolean | null } | null;
};

export type SubmitAnswersMutationVariables = Exact<{
  formId: Scalars["ID"];
  answersData?: InputMaybe<Array<AnswerInput> | AnswerInput>;
}>;

export type SubmitAnswersMutation = {
  __typename?: "Mutations";
  submitAnswers?: { __typename?: "SubmitOrUpdateAnswers"; ok?: boolean | null; message?: string | null } | null;
};

export type FormWithAllResponsesQueryVariables = Exact<{
  formId: Scalars["ID"];
}>;

export type FormWithAllResponsesQuery = {
  __typename?: "Queries";
  form?: {
    __typename?: "FormType";
    id: string;
    name: string;
    questions: Array<{
      __typename?: "QuestionType";
      id: string;
      question: string;
      description: string;
      questionType?: QuestionTypeEnum | null;
      mandatory: boolean;
      answers?: Array<{ __typename?: "AnswerType"; id?: string | null }> | null;
      options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
    }>;
    responses?: Array<{
      __typename?: "ResponseType";
      id?: string | null;
      respondent: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
      answers: Array<{
        __typename?: "AnswerType";
        id?: string | null;
        answer: string;
        question: { __typename?: "QuestionType"; id: string };
      }>;
    }> | null;
  } | null;
};

export type FormWithAnswersQueryVariables = Exact<{
  formId: Scalars["ID"];
}>;

export type FormWithAnswersQuery = {
  __typename?: "Queries";
  form?: {
    __typename?: "FormType";
    id: string;
    name: string;
    description: string;
    questions: Array<{
      __typename?: "QuestionType";
      id: string;
      question: string;
      description: string;
      questionType?: QuestionTypeEnum | null;
      mandatory: boolean;
      answer?: { __typename?: "AnswerType"; id?: string | null; answer: string } | null;
      options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
    }>;
  } | null;
};

export type ListingFragment = {
  __typename?: "ListingType";
  id: string;
  title: string;
  slug: string;
  description: string;
  startDatetime: string;
  deadline: string;
  endDatetime: string;
  applicationUrl?: string | null;
  chips: Array<string>;
  readMoreUrl?: string | null;
  heroImageUrl?: string | null;
  organization: {
    __typename?: "OrganizationType";
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
    color?: string | null;
    description: string;
  };
};

export type ListingOrganizationFragment = {
  __typename?: "OrganizationType";
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  color?: string | null;
  description: string;
};

export type ListingWithFormIdFragment = {
  __typename?: "ListingType";
  id: string;
  title: string;
  slug: string;
  description: string;
  startDatetime: string;
  deadline: string;
  endDatetime: string;
  applicationUrl?: string | null;
  chips: Array<string>;
  readMoreUrl?: string | null;
  heroImageUrl?: string | null;
  form?: { __typename?: "FormType"; id: string } | null;
  organization: {
    __typename?: "OrganizationType";
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
    color?: string | null;
    description: string;
  };
};

export type ListingWithFormFragment = {
  __typename?: "ListingType";
  id: string;
  title: string;
  slug: string;
  description: string;
  startDatetime: string;
  deadline: string;
  endDatetime: string;
  applicationUrl?: string | null;
  chips: Array<string>;
  readMoreUrl?: string | null;
  heroImageUrl?: string | null;
  form?: {
    __typename?: "FormType";
    id: string;
    name: string;
    questions: Array<{
      __typename?: "QuestionType";
      id: string;
      question: string;
      description: string;
      questionType?: QuestionTypeEnum | null;
      mandatory: boolean;
      options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
    }>;
  } | null;
  organization: {
    __typename?: "OrganizationType";
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
    color?: string | null;
    description: string;
  };
};

export type ListingWithResponsesFragment = {
  __typename?: "ListingType";
  id: string;
  title: string;
  slug: string;
  description: string;
  startDatetime: string;
  deadline: string;
  endDatetime: string;
  applicationUrl?: string | null;
  chips: Array<string>;
  readMoreUrl?: string | null;
  heroImageUrl?: string | null;
  form?: {
    __typename?: "FormType";
    id: string;
    name: string;
    questions: Array<{
      __typename?: "QuestionType";
      id: string;
      question: string;
      description: string;
      questionType?: QuestionTypeEnum | null;
      mandatory: boolean;
      answers?: Array<{ __typename?: "AnswerType"; id?: string | null }> | null;
      options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
    }>;
    responses?: Array<{
      __typename?: "ResponseType";
      id?: string | null;
      respondent: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
      answers: Array<{
        __typename?: "AnswerType";
        id?: string | null;
        answer: string;
        question: { __typename?: "QuestionType"; id: string };
      }>;
    }> | null;
  } | null;
  organization: {
    __typename?: "OrganizationType";
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
    color?: string | null;
    description: string;
  };
};

export type CreateListingMutationVariables = Exact<{
  input: CreateListingInput;
}>;

export type CreateListingMutation = {
  __typename?: "Mutations";
  createListing?: {
    __typename?: "CreateListing";
    ok?: boolean | null;
    listing?: { __typename?: "ListingType"; id: string; slug: string } | null;
  } | null;
};

export type UpdateListingMutationVariables = Exact<{
  id: Scalars["ID"];
  input?: InputMaybe<BaseListingInput>;
}>;

export type UpdateListingMutation = {
  __typename?: "Mutations";
  updateListing?: {
    __typename?: "UpdateListing";
    ok?: boolean | null;
    listing?: { __typename?: "ListingType"; id: string; slug: string } | null;
  } | null;
};

export type DeleteListingMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteListingMutation = {
  __typename?: "Mutations";
  deleteListing?: { __typename?: "DeleteListing"; listingId?: string | null; ok?: boolean | null } | null;
};

export type ListingQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ListingQuery = {
  __typename?: "Queries";
  listing?: {
    __typename?: "ListingType";
    id: string;
    title: string;
    slug: string;
    description: string;
    startDatetime: string;
    deadline: string;
    endDatetime: string;
    applicationUrl?: string | null;
    chips: Array<string>;
    readMoreUrl?: string | null;
    heroImageUrl?: string | null;
    form?: { __typename?: "FormType"; id: string } | null;
    organization: {
      __typename?: "OrganizationType";
      id: string;
      name: string;
      slug: string;
      logoUrl?: string | null;
      color?: string | null;
      description: string;
    };
  } | null;
};

export type ListingsQueryVariables = Exact<{ [key: string]: never }>;

export type ListingsQuery = {
  __typename?: "Queries";
  listings?: Array<{
    __typename?: "ListingType";
    id: string;
    title: string;
    slug: string;
    description: string;
    startDatetime: string;
    deadline: string;
    endDatetime: string;
    applicationUrl?: string | null;
    chips: Array<string>;
    readMoreUrl?: string | null;
    heroImageUrl?: string | null;
    organization: {
      __typename?: "OrganizationType";
      id: string;
      name: string;
      slug: string;
      logoUrl?: string | null;
      color?: string | null;
      description: string;
    };
  }> | null;
};

export type ListingWithFormQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ListingWithFormQuery = {
  __typename?: "Queries";
  listing?: {
    __typename?: "ListingType";
    id: string;
    title: string;
    slug: string;
    description: string;
    startDatetime: string;
    deadline: string;
    endDatetime: string;
    applicationUrl?: string | null;
    chips: Array<string>;
    readMoreUrl?: string | null;
    heroImageUrl?: string | null;
    form?: {
      __typename?: "FormType";
      id: string;
      name: string;
      questions: Array<{
        __typename?: "QuestionType";
        id: string;
        question: string;
        description: string;
        questionType?: QuestionTypeEnum | null;
        mandatory: boolean;
        options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
      }>;
    } | null;
    organization: {
      __typename?: "OrganizationType";
      id: string;
      name: string;
      slug: string;
      logoUrl?: string | null;
      color?: string | null;
      description: string;
    };
  } | null;
};

export type ListingWithResponsesQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ListingWithResponsesQuery = {
  __typename?: "Queries";
  listing?: {
    __typename?: "ListingType";
    id: string;
    title: string;
    slug: string;
    description: string;
    startDatetime: string;
    deadline: string;
    endDatetime: string;
    applicationUrl?: string | null;
    chips: Array<string>;
    readMoreUrl?: string | null;
    heroImageUrl?: string | null;
    form?: {
      __typename?: "FormType";
      id: string;
      name: string;
      questions: Array<{
        __typename?: "QuestionType";
        id: string;
        question: string;
        description: string;
        questionType?: QuestionTypeEnum | null;
        mandatory: boolean;
        answers?: Array<{ __typename?: "AnswerType"; id?: string | null }> | null;
        options?: Array<{ __typename?: "OptionType"; id: string; answer: string }> | null;
      }>;
      responses?: Array<{
        __typename?: "ResponseType";
        id?: string | null;
        respondent: { __typename?: "UserType"; id: string; firstName: string; lastName: string };
        answers: Array<{
          __typename?: "AnswerType";
          id?: string | null;
          answer: string;
          question: { __typename?: "QuestionType"; id: string };
        }>;
      }> | null;
    } | null;
    organization: {
      __typename?: "OrganizationType";
      id: string;
      name: string;
      slug: string;
      logoUrl?: string | null;
      color?: string | null;
      description: string;
    };
  } | null;
};

export type UserOrganizationsQueryVariables = Exact<{ [key: string]: never }>;

export type UserOrganizationsQuery = {
  __typename?: "Queries";
  user?: {
    __typename?: "UserType";
    organizations: Array<{
      __typename?: "OrganizationType";
      id: string;
      name: string;
      slug: string;
      logoUrl?: string | null;
      color?: string | null;
      description: string;
    }>;
  } | null;
};

export type AdminOrganizationFragment = {
  __typename?: "OrganizationType";
  id: string;
  name: string;
  hrGroup?: { __typename?: "ResponsibleGroupType"; uuid: string } | null;
  primaryGroup?: { __typename?: "ResponsibleGroupType"; uuid: string } | null;
  events: Array<{
    __typename?: "EventType";
    id: string;
    title: string;
    startTime: string;
    shortDescription?: string | null;
    availableSlots?: number | null;
    isFull?: boolean | null;
    usersAttending?: Array<{ __typename?: "SignUpType"; id: string }> | null;
  }>;
  listings?: Array<{ __typename?: "ListingType"; id: string; title: string; deadline: string }> | null;
};

export type OrgAdminEventFragment = {
  __typename?: "EventType";
  id: string;
  title: string;
  startTime: string;
  shortDescription?: string | null;
  availableSlots?: number | null;
  isFull?: boolean | null;
  usersAttending?: Array<{ __typename?: "SignUpType"; id: string }> | null;
};

export type OrgAdminListingFragment = { __typename?: "ListingType"; id: string; title: string; deadline: string };

export type MembershipFragment = {
  __typename?: "MembershipType";
  id: string;
  user: { __typename?: "UserType"; firstName: string; lastName: string };
  group?: { __typename?: "ResponsibleGroupType"; uuid: string } | null;
};

export type AdminOrganizationQueryVariables = Exact<{
  orgId: Scalars["ID"];
}>;

export type AdminOrganizationQuery = {
  __typename?: "Queries";
  organization?: {
    __typename?: "OrganizationType";
    id: string;
    name: string;
    hrGroup?: { __typename?: "ResponsibleGroupType"; uuid: string } | null;
    primaryGroup?: { __typename?: "ResponsibleGroupType"; uuid: string } | null;
    events: Array<{
      __typename?: "EventType";
      id: string;
      title: string;
      startTime: string;
      shortDescription?: string | null;
      availableSlots?: number | null;
      isFull?: boolean | null;
      usersAttending?: Array<{ __typename?: "SignUpType"; id: string }> | null;
    }>;
    listings?: Array<{ __typename?: "ListingType"; id: string; title: string; deadline: string }> | null;
  } | null;
};

export type MembershipsQueryVariables = Exact<{
  organizationId: Scalars["ID"];
}>;

export type MembershipsQuery = {
  __typename?: "Queries";
  memberships?: Array<{
    __typename?: "MembershipType";
    id: string;
    user: { __typename?: "UserType"; firstName: string; lastName: string };
    group?: { __typename?: "ResponsibleGroupType"; uuid: string } | null;
  }> | null;
};

export type HasPermissionQueryVariables = Exact<{
  permission: Scalars["String"];
}>;

export type HasPermissionQuery = { __typename?: "Queries"; hasPermission?: boolean | null };

export type UserFragment = {
  __typename?: "UserType";
  id: string;
  feideEmail: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dateJoined: string;
  graduationYear?: number | null;
  gradeYear?: number | null;
  allergies?: string | null;
  phoneNumber: string;
  firstLogin: boolean;
};

export type UserWithEventsAndOrgsFragment = {
  __typename?: "UserType";
  id: string;
  feideEmail: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dateJoined: string;
  graduationYear?: number | null;
  gradeYear?: number | null;
  allergies?: string | null;
  phoneNumber: string;
  firstLogin: boolean;
  events?: Array<{ __typename?: "EventType"; id: string }> | null;
  organizations: Array<{ __typename?: "OrganizationType"; id: string; name: string }>;
};

export type UserToEditFragment = {
  __typename?: "UserType";
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  allergies?: string | null;
  email: string;
  graduationYear?: number | null;
  firstLogin: boolean;
  feideEmail: string;
  canUpdateYear?: boolean | null;
  yearUpdatedAt?: string | null;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: "Mutations";
  logout?: { __typename?: "Logout"; idToken?: string | null } | null;
};

export type AuthUserMutationVariables = Exact<{
  code: Scalars["String"];
}>;

export type AuthUserMutation = {
  __typename?: "Mutations";
  authUser: {
    __typename?: "AuthUser";
    user: {
      __typename?: "UserType";
      id: string;
      feideEmail: string;
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      dateJoined: string;
      graduationYear?: number | null;
      gradeYear?: number | null;
      allergies?: string | null;
      phoneNumber: string;
      firstLogin: boolean;
    };
  };
};

export type UpdateUserMutationVariables = Exact<{
  userData?: InputMaybe<UserInput>;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutations";
  updateUser?: {
    __typename?: "UpdateUser";
    user?: {
      __typename?: "UserType";
      id: string;
      feideEmail: string;
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      dateJoined: string;
      graduationYear?: number | null;
      gradeYear?: number | null;
      allergies?: string | null;
      phoneNumber: string;
      firstLogin: boolean;
    } | null;
  } | null;
};

export type UserQueryVariables = Exact<{ [key: string]: never }>;

export type UserQuery = {
  __typename?: "Queries";
  user?: {
    __typename?: "UserType";
    id: string;
    feideEmail: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    dateJoined: string;
    graduationYear?: number | null;
    gradeYear?: number | null;
    allergies?: string | null;
    phoneNumber: string;
    firstLogin: boolean;
  } | null;
};

export type UserWithEventsAndOrgsQueryVariables = Exact<{ [key: string]: never }>;

export type UserWithEventsAndOrgsQuery = {
  __typename?: "Queries";
  user?: {
    __typename?: "UserType";
    id: string;
    feideEmail: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    dateJoined: string;
    graduationYear?: number | null;
    gradeYear?: number | null;
    allergies?: string | null;
    phoneNumber: string;
    firstLogin: boolean;
    events?: Array<{ __typename?: "EventType"; id: string }> | null;
    organizations: Array<{ __typename?: "OrganizationType"; id: string; name: string }>;
  } | null;
};

export type UserToEditQueryVariables = Exact<{ [key: string]: never }>;

export type UserToEditQuery = {
  __typename?: "Queries";
  user?: {
    __typename?: "UserType";
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    allergies?: string | null;
    email: string;
    graduationYear?: number | null;
    firstLogin: boolean;
    feideEmail: string;
    canUpdateYear?: boolean | null;
    yearUpdatedAt?: string | null;
  } | null;
};

export type ServerTimeQueryVariables = Exact<{ [key: string]: never }>;

export type ServerTimeQuery = { __typename?: "Queries"; serverTime?: string | null };

export const CabinFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Cabin" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "CabinType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "maxGuests" } },
          { kind: "Field", name: { kind: "Name", value: "internalPrice" } },
          { kind: "Field", name: { kind: "Name", value: "externalPrice" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CabinFragment, unknown>;
export const BookingFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Booking" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "AllBookingsType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "checkIn" } },
          { kind: "Field", name: { kind: "Name", value: "checkOut" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "cabins" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BookingFragment, unknown>;
export const AdminBookingFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AdminBooking" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "AdminBookingType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "checkIn" } },
          { kind: "Field", name: { kind: "Name", value: "checkOut" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "cabins" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "firstName" } },
          { kind: "Field", name: { kind: "Name", value: "lastName" } },
          { kind: "Field", name: { kind: "Name", value: "phone" } },
          { kind: "Field", name: { kind: "Name", value: "receiverEmail" } },
          { kind: "Field", name: { kind: "Name", value: "externalParticipants" } },
          { kind: "Field", name: { kind: "Name", value: "internalParticipants" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
          { kind: "Field", name: { kind: "Name", value: "isTentative" } },
          { kind: "Field", name: { kind: "Name", value: "isDeclined" } },
          { kind: "Field", name: { kind: "Name", value: "timestamp" } },
          { kind: "Field", name: { kind: "Name", value: "extraInfo" } },
          { kind: "Field", name: { kind: "Name", value: "declineReason" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminBookingFragment, unknown>;
export const BookingResponsibleFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BookingResponsible" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "BookingResponsibleType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "active" } },
          { kind: "Field", name: { kind: "Name", value: "firstName" } },
          { kind: "Field", name: { kind: "Name", value: "lastName" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "phone" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BookingResponsibleFragment, unknown>;
export const BookingSemesterFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BookingSemester" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "UpdateBookingSemesterType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "fallStartDate" } },
          { kind: "Field", name: { kind: "Name", value: "fallEndDate" } },
          { kind: "Field", name: { kind: "Name", value: "springStartDate" } },
          { kind: "Field", name: { kind: "Name", value: "springEndDate" } },
          { kind: "Field", name: { kind: "Name", value: "fallSemesterActive" } },
          { kind: "Field", name: { kind: "Name", value: "springSemesterActive" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BookingSemesterFragment, unknown>;
export const ProductFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Product" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ProductType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
          { kind: "Field", name: { kind: "Name", value: "maxBuyableQuantity" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductFragment, unknown>;
export const OrderFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Order" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "OrderType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "quantity" } },
          { kind: "Field", name: { kind: "Name", value: "totalPrice" } },
          { kind: "Field", name: { kind: "Name", value: "paymentStatus" } },
          { kind: "Field", name: { kind: "Name", value: "timestamp" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "product" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Product" } }],
            },
          },
        ],
      },
    },
    ...ProductFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<OrderFragment, unknown>;
export const EventFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Event" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "EventType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "startTime" } },
          { kind: "Field", name: { kind: "Name", value: "endTime" } },
          { kind: "Field", name: { kind: "Name", value: "location" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "organization" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "category" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "image" } },
          { kind: "Field", name: { kind: "Name", value: "isAttendable" } },
          { kind: "Field", name: { kind: "Name", value: "deadline" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "publisher" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "dateJoined" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "availableSlots" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
          { kind: "Field", name: { kind: "Name", value: "shortDescription" } },
          { kind: "Field", name: { kind: "Name", value: "signupOpenDate" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "userAttendance" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isSignedUp" } },
                { kind: "Field", name: { kind: "Name", value: "isOnWaitingList" } },
                { kind: "Field", name: { kind: "Name", value: "hasBoughtTicket" } },
                { kind: "Field", name: { kind: "Name", value: "positionOnWaitingList" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "isFull" } },
          { kind: "Field", name: { kind: "Name", value: "hasExtraInformation" } },
          { kind: "Field", name: { kind: "Name", value: "bindingSignup" } },
          { kind: "Field", name: { kind: "Name", value: "contactEmail" } },
          { kind: "Field", name: { kind: "Name", value: "allowedGradeYears" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "product" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventFragment, unknown>;
export const EventInListFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EventInList" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "EventType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "startTime" } },
          { kind: "Field", name: { kind: "Name", value: "endTime" } },
          { kind: "Field", name: { kind: "Name", value: "location" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "organization" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "category" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "image" } },
          { kind: "Field", name: { kind: "Name", value: "isAttendable" } },
          { kind: "Field", name: { kind: "Name", value: "deadline" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "publisher" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "dateJoined" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "price" } },
          { kind: "Field", name: { kind: "Name", value: "shortDescription" } },
          { kind: "Field", name: { kind: "Name", value: "signupOpenDate" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "userAttendance" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isSignedUp" } },
                { kind: "Field", name: { kind: "Name", value: "isOnWaitingList" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "isFull" } },
          { kind: "Field", name: { kind: "Name", value: "hasExtraInformation" } },
          { kind: "Field", name: { kind: "Name", value: "allowedGradeYears" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventInListFragment, unknown>;
export const SignUpWithTicketFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "SignUpWithTicket" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "SignUpType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "userEmail" } },
          { kind: "Field", name: { kind: "Name", value: "userGradeYear" } },
          { kind: "Field", name: { kind: "Name", value: "userAllergies" } },
          { kind: "Field", name: { kind: "Name", value: "userPhoneNumber" } },
          { kind: "Field", name: { kind: "Name", value: "extraInformation" } },
          { kind: "Field", name: { kind: "Name", value: "hasBoughtTicket" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpWithTicketFragment, unknown>;
export const SignUpFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "SignUp" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "SignUpType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "userEmail" } },
          { kind: "Field", name: { kind: "Name", value: "userGradeYear" } },
          { kind: "Field", name: { kind: "Name", value: "userAllergies" } },
          { kind: "Field", name: { kind: "Name", value: "userPhoneNumber" } },
          { kind: "Field", name: { kind: "Name", value: "extraInformation" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpFragment, unknown>;
export const AdminEventFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AdminEvent" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "EventType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "startTime" } },
          { kind: "Field", name: { kind: "Name", value: "endTime" } },
          { kind: "Field", name: { kind: "Name", value: "location" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "organization" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "category" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "image" } },
          { kind: "Field", name: { kind: "Name", value: "isAttendable" } },
          { kind: "Field", name: { kind: "Name", value: "deadline" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "publisher" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "dateJoined" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "availableSlots" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
          { kind: "Field", name: { kind: "Name", value: "shortDescription" } },
          { kind: "Field", name: { kind: "Name", value: "signupOpenDate" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "usersAttending" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "SignUpWithTicket" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "usersOnWaitingList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "SignUp" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "userAttendance" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isSignedUp" } },
                { kind: "Field", name: { kind: "Name", value: "isOnWaitingList" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "isFull" } },
          { kind: "Field", name: { kind: "Name", value: "hasExtraInformation" } },
          { kind: "Field", name: { kind: "Name", value: "bindingSignup" } },
          { kind: "Field", name: { kind: "Name", value: "contactEmail" } },
          { kind: "Field", name: { kind: "Name", value: "allowedGradeYears" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "product" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
    ...SignUpWithTicketFragmentDoc.definitions,
    ...SignUpFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AdminEventFragment, unknown>;
export const EventFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EventFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "EventType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "startTime" } },
          { kind: "Field", name: { kind: "Name", value: "shortDescription" } },
          { kind: "Field", name: { kind: "Name", value: "allowedGradeYears" } },
          { kind: "Field", name: { kind: "Name", value: "isFull" } },
          { kind: "Field", name: { kind: "Name", value: "isAttendable" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "userAttendance" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isSignedUp" } },
                { kind: "Field", name: { kind: "Name", value: "isOnWaitingList" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "organization" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventFieldsFragment, unknown>;
export const EventDetailFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EventDetailFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "EventType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "shortDescription" } },
          { kind: "Field", name: { kind: "Name", value: "startTime" } },
          { kind: "Field", name: { kind: "Name", value: "endTime" } },
          { kind: "Field", name: { kind: "Name", value: "location" } },
          { kind: "Field", name: { kind: "Name", value: "contactEmail" } },
          { kind: "Field", name: { kind: "Name", value: "allowedGradeYears" } },
          { kind: "Field", name: { kind: "Name", value: "hasExtraInformation" } },
          { kind: "Field", name: { kind: "Name", value: "isFull" } },
          { kind: "Field", name: { kind: "Name", value: "signupOpenDate" } },
          { kind: "Field", name: { kind: "Name", value: "deadline" } },
          { kind: "Field", name: { kind: "Name", value: "isAttendable" } },
          { kind: "Field", name: { kind: "Name", value: "bindingSignup" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "userAttendance" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isSignedUp" } },
                { kind: "Field", name: { kind: "Name", value: "isOnWaitingList" } },
                { kind: "Field", name: { kind: "Name", value: "positionOnWaitingList" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "category" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "organization" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "logoUrl" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventDetailFieldsFragment, unknown>;
export const OptionFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Option" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "OptionType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "answer" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OptionFragment, unknown>;
export const QuestionFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Question" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "QuestionType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "question" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "questionType" } },
          { kind: "Field", name: { kind: "Name", value: "mandatory" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "options" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Option" } }],
            },
          },
        ],
      },
    },
    ...OptionFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<QuestionFragment, unknown>;
export const AnswerFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Answer" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "AnswerType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "answer" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AnswerFragment, unknown>;
export const QuestionWithAnswerFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "QuestionWithAnswer" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "QuestionType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "Question" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "answer" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Answer" } }],
            },
          },
        ],
      },
    },
    ...QuestionFragmentDoc.definitions,
    ...AnswerFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<QuestionWithAnswerFragment, unknown>;
export const FormWithAnswersFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormWithAnswers" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "FormType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "QuestionWithAnswer" } }],
            },
          },
        ],
      },
    },
    ...QuestionWithAnswerFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<FormWithAnswersFragment, unknown>;
export const ListingOrganizationFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ListingOrganization" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "OrganizationType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "logoUrl" } },
          { kind: "Field", name: { kind: "Name", value: "color" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ListingOrganizationFragment, unknown>;
export const ListingFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Listing" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ListingType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "startDatetime" } },
          { kind: "Field", name: { kind: "Name", value: "deadline" } },
          { kind: "Field", name: { kind: "Name", value: "endDatetime" } },
          { kind: "Field", name: { kind: "Name", value: "applicationUrl" } },
          { kind: "Field", name: { kind: "Name", value: "chips" } },
          { kind: "Field", name: { kind: "Name", value: "readMoreUrl" } },
          { kind: "Field", name: { kind: "Name", value: "heroImageUrl" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "organization" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "ListingOrganization" } }],
            },
          },
        ],
      },
    },
    ...ListingOrganizationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ListingFragment, unknown>;
export const ListingWithFormIdFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ListingWithFormId" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ListingType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "Listing" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "form" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
    ...ListingFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ListingWithFormIdFragment, unknown>;
export const FormFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Form" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "FormType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Question" } }],
            },
          },
        ],
      },
    },
    ...QuestionFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<FormFragment, unknown>;
export const ListingWithFormFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ListingWithForm" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ListingType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "Listing" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "form" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Form" } }],
            },
          },
        ],
      },
    },
    ...ListingFragmentDoc.definitions,
    ...FormFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ListingWithFormFragment, unknown>;
export const QuestionWithAnswerIdsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "QuestionWithAnswerIds" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "QuestionType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "Question" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "answers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
    ...QuestionFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<QuestionWithAnswerIdsFragment, unknown>;
export const AnswerWithQuestionIdFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AnswerWithQuestionId" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "AnswerType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "Answer" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "question" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
    ...AnswerFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AnswerWithQuestionIdFragment, unknown>;
export const ResponseFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Response" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ResponseType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "respondent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "answers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "AnswerWithQuestionId" } }],
            },
          },
        ],
      },
    },
    ...AnswerWithQuestionIdFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ResponseFragment, unknown>;
export const FormWithAllResponsesFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FormWithAllResponses" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "FormType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "QuestionWithAnswerIds" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "responses" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Response" } }],
            },
          },
        ],
      },
    },
    ...QuestionWithAnswerIdsFragmentDoc.definitions,
    ...ResponseFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<FormWithAllResponsesFragment, unknown>;
export const ListingWithResponsesFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ListingWithResponses" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ListingType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "Listing" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "form" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "FormWithAllResponses" } }],
            },
          },
        ],
      },
    },
    ...ListingFragmentDoc.definitions,
    ...FormWithAllResponsesFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ListingWithResponsesFragment, unknown>;
export const OrgAdminEventFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OrgAdminEvent" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "EventType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "startTime" } },
          { kind: "Field", name: { kind: "Name", value: "shortDescription" } },
          { kind: "Field", name: { kind: "Name", value: "availableSlots" } },
          { kind: "Field", name: { kind: "Name", value: "isFull" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "usersAttending" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OrgAdminEventFragment, unknown>;
export const OrgAdminListingFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OrgAdminListing" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ListingType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "deadline" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OrgAdminListingFragment, unknown>;
export const AdminOrganizationFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AdminOrganization" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "OrganizationType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "hrGroup" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "uuid" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "primaryGroup" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "uuid" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "events" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "OrgAdminEvent" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "listings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "OrgAdminListing" } }],
            },
          },
        ],
      },
    },
    ...OrgAdminEventFragmentDoc.definitions,
    ...OrgAdminListingFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AdminOrganizationFragment, unknown>;
export const MembershipFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Membership" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "MembershipType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "group" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "uuid" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MembershipFragment, unknown>;
export const UserFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "User" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "UserType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "feideEmail" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "firstName" } },
          { kind: "Field", name: { kind: "Name", value: "lastName" } },
          { kind: "Field", name: { kind: "Name", value: "dateJoined" } },
          { kind: "Field", name: { kind: "Name", value: "graduationYear" } },
          { kind: "Field", name: { kind: "Name", value: "gradeYear" } },
          { kind: "Field", name: { kind: "Name", value: "allergies" } },
          { kind: "Field", name: { kind: "Name", value: "phoneNumber" } },
          { kind: "Field", name: { kind: "Name", value: "firstLogin" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserFragment, unknown>;
export const UserWithEventsAndOrgsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserWithEventsAndOrgs" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "UserType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "User" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "events" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "organizations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
    ...UserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UserWithEventsAndOrgsFragment, unknown>;
export const UserToEditFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserToEdit" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "UserType" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "firstName" } },
          { kind: "Field", name: { kind: "Name", value: "lastName" } },
          { kind: "Field", name: { kind: "Name", value: "phoneNumber" } },
          { kind: "Field", name: { kind: "Name", value: "allergies" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "graduationYear" } },
          { kind: "Field", name: { kind: "Name", value: "firstLogin" } },
          { kind: "Field", name: { kind: "Name", value: "feideEmail" } },
          { kind: "Field", name: { kind: "Name", value: "canUpdateYear" } },
          { kind: "Field", name: { kind: "Name", value: "yearUpdatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserToEditFragment, unknown>;
export const ArchiveByTypesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "archiveByTypes" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "documentTypes" } },
          type: {
            kind: "NonNullType",
            type: { kind: "ListType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "year" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "names" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "archiveByTypes" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "typeDoc" },
                value: { kind: "Variable", name: { kind: "Name", value: "documentTypes" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "year" },
                value: { kind: "Variable", name: { kind: "Name", value: "year" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "names" },
                value: { kind: "Variable", name: { kind: "Name", value: "names" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "thumbnail" } },
                { kind: "Field", name: { kind: "Name", value: "typeDoc" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
                { kind: "Field", name: { kind: "Name", value: "webLink" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ArchiveByTypesQuery, ArchiveByTypesQueryVariables>;
export const FeaturedArchiveDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "featuredArchive" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "featuredArchive" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "thumbnail" } },
                { kind: "Field", name: { kind: "Name", value: "featured" } },
                { kind: "Field", name: { kind: "Name", value: "typeDoc" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
                { kind: "Field", name: { kind: "Name", value: "webLink" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FeaturedArchiveQuery, FeaturedArchiveQueryVariables>;
export const AvailableYearsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "availableYears" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "availableYears" } }],
      },
    },
  ],
} as unknown as DocumentNode<AvailableYearsQuery, AvailableYearsQueryVariables>;
export const CreateBookingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createBooking" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "bookingData" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "BookingInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createBooking" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "bookingData" },
                value: { kind: "Variable", name: { kind: "Name", value: "bookingData" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "ok" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateBookingMutation, CreateBookingMutationVariables>;
export const ConfirmBookingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "confirmBooking" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateBooking" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "bookingData" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: { kind: "Variable", name: { kind: "Name", value: "id" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isTentative" },
                      value: { kind: "BooleanValue", value: false },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "ok" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ConfirmBookingMutation, ConfirmBookingMutationVariables>;
export const DeclineBookingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "declineBooking" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "declineReason" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateBooking" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "bookingData" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: { kind: "Variable", name: { kind: "Name", value: "id" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isTentative" },
                      value: { kind: "BooleanValue", value: false },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "isDeclined" },
                      value: { kind: "BooleanValue", value: true },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "declineReason" },
                      value: { kind: "Variable", name: { kind: "Name", value: "declineReason" } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "ok" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeclineBookingMutation, DeclineBookingMutationVariables>;
export const SendEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "sendEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "emailInput" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "EmailInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "sendEmail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "emailInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "emailInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "ok" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SendEmailMutation, SendEmailMutationVariables>;
export const UpdateCabinDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateCabin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cabinData" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "UpdateCabinInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateCabin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "cabinData" },
                value: { kind: "Variable", name: { kind: "Name", value: "cabinData" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "cabin" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Cabin" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...CabinFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UpdateCabinMutation, UpdateCabinMutationVariables>;
export const UpdateBookingSemesterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateBookingSemester" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "semesterData" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateBookingSemesterInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateBookingSemester" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "semesterData" },
                value: { kind: "Variable", name: { kind: "Name", value: "semesterData" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "bookingSemester" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "BookingSemester" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...BookingSemesterFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UpdateBookingSemesterMutation, UpdateBookingSemesterMutationVariables>;
export const CabinsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "cabins" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "cabins" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Cabin" } }],
            },
          },
        ],
      },
    },
    ...CabinFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CabinsQuery, CabinsQueryVariables>;
export const AllBookingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allBookings" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allBookings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Booking" } }],
            },
          },
        ],
      },
    },
    ...BookingFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllBookingsQuery, AllBookingsQueryVariables>;
export const AdminAllBookingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "adminAllBookings" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAllBookings" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "AdminBooking" } }],
            },
          },
        ],
      },
    },
    ...AdminBookingFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AdminAllBookingsQuery, AdminAllBookingsQueryVariables>;
export const ActiveBookingResponsibleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "activeBookingResponsible" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "activeBookingResponsible" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "BookingResponsible" } }],
            },
          },
        ],
      },
    },
    ...BookingResponsibleFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ActiveBookingResponsibleQuery, ActiveBookingResponsibleQueryVariables>;
export const CabinsAndResponsiblesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "cabinsAndResponsibles" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "cabins" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Cabin" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeBookingResponsible" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
    ...CabinFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CabinsAndResponsiblesQuery, CabinsAndResponsiblesQueryVariables>;
export const BookingSemesterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "bookingSemester" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "bookingSemester" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "BookingSemester" } }],
            },
          },
        ],
      },
    },
    ...BookingSemesterFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<BookingSemesterQuery, BookingSemesterQueryVariables>;
export const InitiateOrderDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "initiateOrder" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "productId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "quantity" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "fallbackRedirect" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "initiateOrder" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "productId" },
                value: { kind: "Variable", name: { kind: "Name", value: "productId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "quantity" },
                value: { kind: "Variable", name: { kind: "Name", value: "quantity" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "fallbackRedirect" },
                value: { kind: "Variable", name: { kind: "Name", value: "fallbackRedirect" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "redirect" } },
                { kind: "Field", name: { kind: "Name", value: "orderId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InitiateOrderMutation, InitiateOrderMutationVariables>;
export const AttemptCapturePaymentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "attemptCapturePayment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "orderId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "attemptCapturePayment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderId" },
                value: { kind: "Variable", name: { kind: "Name", value: "orderId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "order" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Order" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...OrderFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AttemptCapturePaymentMutation, AttemptCapturePaymentMutationVariables>;
export const ProductDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "product" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "productId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "product" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "productId" },
                value: { kind: "Variable", name: { kind: "Name", value: "productId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Product" } }],
            },
          },
        ],
      },
    },
    ...ProductFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>;
export const UserOrdersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userOrders" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userOrders" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Order" } }],
            },
          },
        ],
      },
    },
    ...OrderFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UserOrdersQuery, UserOrdersQueryVariables>;
export const CreateEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "eventData" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "CreateEventInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createEvent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "eventData" },
                value: { kind: "Variable", name: { kind: "Name", value: "eventData" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "event" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "EventInList" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
    ...EventInListFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "eventData" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "UpdateEventInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateEvent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "eventData" },
                value: { kind: "Variable", name: { kind: "Name", value: "eventData" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "event" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Event" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
    ...EventFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UpdateEventMutation, UpdateEventMutationVariables>;
export const EventSignUpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "eventSignUp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "eventId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "extraInformation" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "eventSignUp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "eventId" },
                value: { kind: "Variable", name: { kind: "Name", value: "eventId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "extraInformation" },
                      value: { kind: "Variable", name: { kind: "Name", value: "extraInformation" } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isFull" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "event" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userAttendance" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "isSignedUp" } },
                            { kind: "Field", name: { kind: "Name", value: "isOnWaitingList" } },
                            { kind: "Field", name: { kind: "Name", value: "positionOnWaitingList" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventSignUpMutation, EventSignUpMutationVariables>;
export const EventSignOffDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "eventSignOff" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "eventId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "eventSignOff" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "eventId" },
                value: { kind: "Variable", name: { kind: "Name", value: "eventId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isFull" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "event" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userAttendance" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "isSignedUp" } },
                            { kind: "Field", name: { kind: "Name", value: "isOnWaitingList" } },
                            { kind: "Field", name: { kind: "Name", value: "positionOnWaitingList" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventSignOffMutation, EventSignOffMutationVariables>;
export const AdminEventSignOffDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "adminEventSignOff" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "eventId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "userId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminEventSignOff" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "eventId" },
                value: { kind: "Variable", name: { kind: "Name", value: "eventId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: { kind: "Variable", name: { kind: "Name", value: "userId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "event" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminEventSignOffMutation, AdminEventSignOffMutationVariables>;
export const SendEventMailsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "sendEventMails" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "eventId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "receiverEmails" } },
          type: {
            kind: "ListType",
            type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "content" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "subject" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "sendEventMails" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "eventId" },
                value: { kind: "Variable", name: { kind: "Name", value: "eventId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "receiverEmails" },
                value: { kind: "Variable", name: { kind: "Name", value: "receiverEmails" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "content" },
                value: { kind: "Variable", name: { kind: "Name", value: "content" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "subject" },
                value: { kind: "Variable", name: { kind: "Name", value: "subject" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "ok" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SendEventMailsMutation, SendEventMailsMutationVariables>;
export const EventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "event" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "event" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Event" } }],
            },
          },
        ],
      },
    },
    ...EventFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<EventQuery, EventQueryVariables>;
export const EventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "events" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "organization" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "category" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "startTime" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "endTime" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allEvents" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organization" },
                value: { kind: "Variable", name: { kind: "Name", value: "organization" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "category" },
                value: { kind: "Variable", name: { kind: "Name", value: "category" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "startTime" },
                value: { kind: "Variable", name: { kind: "Name", value: "startTime" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "endTime" },
                value: { kind: "Variable", name: { kind: "Name", value: "endTime" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "EventFields" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "defaultEvents" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "EventFields" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "gradeYear" } },
              ],
            },
          },
        ],
      },
    },
    ...EventFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<EventsQuery, EventsQueryVariables>;
export const EventDetailsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "eventDetails" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "event" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "EventDetailFields" } }],
            },
          },
        ],
      },
    },
    ...EventDetailFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<EventDetailsQuery, EventDetailsQueryVariables>;
export const AllEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allEvents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "organization" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "category" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "startTime" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "endTime" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allEvents" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organization" },
                value: { kind: "Variable", name: { kind: "Name", value: "organization" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "category" },
                value: { kind: "Variable", name: { kind: "Name", value: "category" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "startTime" },
                value: { kind: "Variable", name: { kind: "Name", value: "startTime" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "endTime" },
                value: { kind: "Variable", name: { kind: "Name", value: "endTime" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "EventInList" } }],
            },
          },
        ],
      },
    },
    ...EventInListFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllEventsQuery, AllEventsQueryVariables>;
export const DefaultEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "defaultEvents" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "defaultEvents" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "EventInList" } }],
            },
          },
        ],
      },
    },
    ...EventInListFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<DefaultEventsQuery, DefaultEventsQueryVariables>;
export const AllCategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allCategories" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allCategories" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllCategoriesQuery, AllCategoriesQueryVariables>;
export const EventFilteredOrganizationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "eventFilteredOrganizations" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "eventFilteredOrganizations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "children" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventFilteredOrganizationsQuery, EventFilteredOrganizationsQueryVariables>;
export const AdminEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "adminEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "event" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "AdminEvent" } }],
            },
          },
        ],
      },
    },
    ...AdminEventFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AdminEventQuery, AdminEventQueryVariables>;
export const EventSignUpsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "eventSignUps" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "event" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isAttendable" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "usersAttending" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "userEmail" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventSignUpsQuery, EventSignUpsQueryVariables>;
export const AttendeeReportDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "attendeeReport" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "eventId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "fields" } },
          type: {
            kind: "ListType",
            type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "filetype" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "attendeeReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "eventId" },
                value: { kind: "Variable", name: { kind: "Name", value: "eventId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "fields" },
                value: { kind: "Variable", name: { kind: "Name", value: "fields" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filetype" },
                value: { kind: "Variable", name: { kind: "Name", value: "filetype" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AttendeeReportQuery, AttendeeReportQueryVariables>;
export const AttendeeReportOrgDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "attendeeReportOrg" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "orgId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "fields" } },
          type: {
            kind: "ListType",
            type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "filetype" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "attendeeReportOrg" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "orgId" },
                value: { kind: "Variable", name: { kind: "Name", value: "orgId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "fields" },
                value: { kind: "Variable", name: { kind: "Name", value: "fields" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filetype" },
                value: { kind: "Variable", name: { kind: "Name", value: "filetype" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AttendeeReportOrgQuery, AttendeeReportOrgQueryVariables>;
export const AttendeeReportsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "attendeeReports" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "eventIds" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "fields" } },
          type: {
            kind: "ListType",
            type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "filetype" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "attendeeReports" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "eventIds" },
                value: { kind: "Variable", name: { kind: "Name", value: "eventIds" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "fields" },
                value: { kind: "Variable", name: { kind: "Name", value: "fields" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filetype" },
                value: { kind: "Variable", name: { kind: "Name", value: "filetype" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AttendeeReportsQuery, AttendeeReportsQueryVariables>;
export const EventUserOrganizationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "eventUserOrganizations" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organizations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventUserOrganizationsQuery, EventUserOrganizationsQueryVariables>;
export const CreateFormDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createForm" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "formData" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "CreateFormInput" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "listingId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createForm" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "formData" },
                value: { kind: "Variable", name: { kind: "Name", value: "formData" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "listingId" },
                value: { kind: "Variable", name: { kind: "Name", value: "listingId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "form" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "FormWithAllResponses" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
    ...FormWithAllResponsesFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CreateFormMutation, CreateFormMutationVariables>;
export const UpdateFormDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateForm" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "formData" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "BaseFormInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateForm" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "formData" },
                value: { kind: "Variable", name: { kind: "Name", value: "formData" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "form" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "FormWithAllResponses" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
    ...FormWithAllResponsesFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UpdateFormMutation, UpdateFormMutationVariables>;
export const CreateQuestionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createQuestion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "formId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "questionData" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateQuestionInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createQuestion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "formId" },
                value: { kind: "Variable", name: { kind: "Name", value: "formId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "questionData" },
                value: { kind: "Variable", name: { kind: "Name", value: "questionData" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "question" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "QuestionWithAnswerIds" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
    ...QuestionWithAnswerIdsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const UpdateQuestionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateQuestion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "questionData" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "BaseQuestionInput" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "optionData" } },
          type: {
            kind: "ListType",
            type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "OptionInput" } } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUpdateAndDeleteOptions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "questionId" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "optionData" },
                value: { kind: "Variable", name: { kind: "Name", value: "optionData" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "ok" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "updateQuestion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "questionData" },
                value: { kind: "Variable", name: { kind: "Name", value: "questionData" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "question" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "QuestionWithAnswerIds" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
    ...QuestionWithAnswerIdsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const DeleteQuestionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteQuestion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteQuestion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "deletedId" } },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteQuestionMutation, DeleteQuestionMutationVariables>;
export const SubmitAnswersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "submitAnswers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "formId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "answersData" } },
          type: {
            kind: "ListType",
            type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "AnswerInput" } } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "submitAnswers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "formId" },
                value: { kind: "Variable", name: { kind: "Name", value: "formId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "answersData" },
                value: { kind: "Variable", name: { kind: "Name", value: "answersData" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubmitAnswersMutation, SubmitAnswersMutationVariables>;
export const FormWithAllResponsesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "formWithAllResponses" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "formId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "form" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "formId" },
                value: { kind: "Variable", name: { kind: "Name", value: "formId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "FormWithAllResponses" } }],
            },
          },
        ],
      },
    },
    ...FormWithAllResponsesFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<FormWithAllResponsesQuery, FormWithAllResponsesQueryVariables>;
export const FormWithAnswersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "formWithAnswers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "formId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "form" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "formId" },
                value: { kind: "Variable", name: { kind: "Name", value: "formId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "FormWithAnswers" } }],
            },
          },
        ],
      },
    },
    ...FormWithAnswersFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<FormWithAnswersQuery, FormWithAnswersQueryVariables>;
export const CreateListingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createListing" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateListingInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createListing" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "listingData" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "listing" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateListingMutation, CreateListingMutationVariables>;
export const UpdateListingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateListing" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "BaseListingInput" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateListing" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "listingData" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "listing" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateListingMutation, UpdateListingMutationVariables>;
export const DeleteListingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteListing" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteListing" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "listingId" } },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteListingMutation, DeleteListingMutationVariables>;
export const ListingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "listing" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "listing" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "ListingWithFormId" } }],
            },
          },
        ],
      },
    },
    ...ListingWithFormIdFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ListingQuery, ListingQueryVariables>;
export const ListingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "listings" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "listings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "Listing" } }],
            },
          },
        ],
      },
    },
    ...ListingFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ListingsQuery, ListingsQueryVariables>;
export const ListingWithFormDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "listingWithForm" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "listing" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "ListingWithForm" } }],
            },
          },
        ],
      },
    },
    ...ListingWithFormFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ListingWithFormQuery, ListingWithFormQueryVariables>;
export const ListingWithResponsesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "listingWithResponses" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "listing" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "ListingWithResponses" } }],
            },
          },
        ],
      },
    },
    ...ListingWithResponsesFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ListingWithResponsesQuery, ListingWithResponsesQueryVariables>;
export const UserOrganizationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userOrganizations" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organizations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "ListingOrganization" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...ListingOrganizationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UserOrganizationsQuery, UserOrganizationsQueryVariables>;
export const AdminOrganizationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "adminOrganization" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "orgId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "organization" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "orgId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "AdminOrganization" } }],
            },
          },
        ],
      },
    },
    ...AdminOrganizationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AdminOrganizationQuery, AdminOrganizationQueryVariables>;
export const MembershipsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "memberships" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "organizationId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "memberships" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: { kind: "Variable", name: { kind: "Name", value: "organizationId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "firstName" } },
                      { kind: "Field", name: { kind: "Name", value: "lastName" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "group" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "uuid" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MembershipsQuery, MembershipsQueryVariables>;
export const HasPermissionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "hasPermission" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "permission" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "hasPermission" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "permission" },
                value: { kind: "Variable", name: { kind: "Name", value: "permission" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HasPermissionQuery, HasPermissionQueryVariables>;
export const LogoutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "logout" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "logout" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "idToken" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const AuthUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "authUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "code" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "authUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "code" },
                value: { kind: "Variable", name: { kind: "Name", value: "code" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "User" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AuthUserMutation, AuthUserMutationVariables>;
export const UpdateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "userData" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UserInput" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userData" },
                value: { kind: "Variable", name: { kind: "Name", value: "userData" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "User" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "user" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "User" } }],
            },
          },
        ],
      },
    },
    ...UserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UserWithEventsAndOrgsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userWithEventsAndOrgs" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserWithEventsAndOrgs" } }],
            },
          },
        ],
      },
    },
    ...UserWithEventsAndOrgsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UserWithEventsAndOrgsQuery, UserWithEventsAndOrgsQueryVariables>;
export const UserToEditDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userToEdit" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserToEdit" } }],
            },
          },
        ],
      },
    },
    ...UserToEditFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UserToEditQuery, UserToEditQueryVariables>;
export const ServerTimeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "serverTime" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "serverTime" } }],
      },
    },
  ],
} as unknown as DocumentNode<ServerTimeQuery, ServerTimeQueryVariables>;
