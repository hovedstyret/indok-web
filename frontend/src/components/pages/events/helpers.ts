import { EventDataType, SlotDistributionDataType } from "./constants";

export const getFormattedDataAndErrors = (
  eventData: EventDataType,
  isAttendable: boolean,
  hasSlotDistribution: boolean,
  slotDistribution: SlotDistributionDataType[]
): Record<string, any> => {
  const eventInput = formatEventData(eventData);
  const attendableInput = formatAttendableData(eventData, slotDistribution, hasSlotDistribution);

  let currentErrors: string[] = [];

  if (!eventInput.title || !eventInput.description || !eventInput.startTime) {
    currentErrors = [...currentErrors, "Tittel, beskrivelse og starttid er påkrevd"];
  }
  if (isAttendable && !attendableInput.signupOpenDate) {
    currentErrors = [...currentErrors, "Når påmeldingen åpner er påkrevd for arrangementer med påmelding"];
  }

  if (isAttendable && !attendableInput.totalAvailableSlots) {
    currentErrors = [...currentErrors, "Antall plasser er påkrevd for arrangementer med påmelding"];
  }

  if (isAttendable) {
    if (!attendableInput.totalAvailableSlots) {
      currentErrors = [...currentErrors, "Antall plasser er påkrevd for arrangementer med påmelding"];
    }

    if (
      !!attendableInput.totalAvailableSlots &&
      hasSlotDistribution &&
      slotDistribution.reduce((res, dist) => (res = res + dist.availableSlots), 0) < attendableInput.totalAvailableSlots
    ) {
      currentErrors = [
        ...currentErrors,
        "Totalt antall plasser kan ikke være større enn summen av antall i hver gruppe i plassfordelingen",
      ];
    }

    const slotDistGradesString = slotDistribution
      .flatMap((slotDist) => slotDist.grades)
      .sort((a, b) => a - b)
      .reduce((res, grade) => `${res},${grade}`, "");
    const allowedGradesString = eventInput.allowedGradeYears.reduce(
      (res: string, grade: number) => `${res},${grade}`,
      ""
    );

    if (
      hasSlotDistribution &&
      slotDistGradesString.slice(1, slotDistGradesString.length) !==
        allowedGradesString.slice(1, allowedGradesString.length)
    ) {
      currentErrors = [...currentErrors, "Hvem det er åpent for må tilsvare plassfordelingen for klassetrinn"];
    }
  }

  return { eventInput, attendableInput, currentErrors };
};

const formatEventData = (eventData: EventDataType) => {
  const eventInputData = {
    title: eventData.title === "" ? undefined : eventData.title,
    description: eventData.description === "" ? undefined : eventData.description,
    startTime: eventData.startTime === "" ? undefined : eventData.startTime,
    organizationId: eventData.organizationId === "" ? undefined : eventData.organizationId,
    endTime: eventData.endTime === "" ? undefined : eventData.endTime,
    location: eventData.location === "" ? undefined : eventData.location,
    categoryId: eventData.categoryId === "" ? undefined : eventData.categoryId,
    image: eventData.image === "" ? undefined : eventData.image,
    shortDescription: eventData.shortDescription === "" ? undefined : eventData.shortDescription,
    contactEmail: eventData.contactEmail === "" ? undefined : eventData.contactEmail,
    allowedGradeYears: [...eventData.allowedGradeYears].sort((a, b) => a - b),
  };

  return eventInputData;
};

const formatAttendableData = (
  eventData: EventDataType,
  slotDistributionInput: SlotDistributionDataType[],
  hasSlotDistribution: boolean
) => {
  if (hasSlotDistribution) {
    const slotDistribution = slotDistributionInput
      .filter((dist) => dist.availableSlots !== 0 && dist.grades !== [])
      .map((dist) => {
        const stringGrades = dist.grades.sort((a, b) => a - b).reduce((res, grade) => `${res},${grade}`, "");
        return { gradeGroup: stringGrades.slice(1, stringGrades.length), availableSlots: dist.availableSlots };
      });

    const attendableInputData = {
      signupOpenDate: eventData.signupOpenDate === "" ? undefined : eventData.signupOpenDate,
      bindingSignup: eventData.bindingSignup,
      deadline: eventData.deadline === "" ? undefined : eventData.deadline,
      hasExtraInformation: eventData.hasExtraInformation,
      totalAvailableSlots: eventData.availableSlots === "" ? undefined : Number(eventData.availableSlots),
      slotDistribution,
    }; // add price: eventData.price here

    return attendableInputData;
  }

  let allowedGradesString = eventData.allowedGradeYears
    .sort((a, b) => a - b)
    .reduce((res: string, grade: number) => `${res},${grade}`, "");
  allowedGradesString = allowedGradesString.slice(1, allowedGradesString.length);

  const slotDistribution = [{ gradeGroup: allowedGradesString, availableSlots: Number(eventData.availableSlots) }];

  const attendableInputData = {
    signupOpenDate: eventData.signupOpenDate === "" ? undefined : eventData.signupOpenDate,
    bindingSignup: eventData.bindingSignup,
    deadline: eventData.deadline === "" ? undefined : eventData.deadline,
    hasExtraInformation: eventData.hasExtraInformation,
    totalAvailableSlots: eventData.availableSlots === "" ? undefined : Number(eventData.availableSlots),
    slotDistribution,
  };

  return attendableInputData;
};
