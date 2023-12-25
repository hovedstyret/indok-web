import dayjs from "@/lib/date";

export function calculatePrice(
  chosenCabins: { internalPrice: number; externalPrice: number }[],
  contactInfo: { internalParticipants: number; externalParticipants: number } | undefined,
  startDate: dayjs.Dayjs | undefined,
  endDate: dayjs.Dayjs | undefined
): number | undefined {
  if (!contactInfo) return NaN;
  const internalPrice = contactInfo.internalParticipants >= contactInfo.externalParticipants;
  let currentDate = dayjs(startDate);
  const finalDate = dayjs(endDate);
  let weekdayNights = 0;
  let weekendNights = 0;
  while (currentDate.isBefore(finalDate, "day")) {
    // Last day has no night.
    if (currentDate.day() === 5 || currentDate.day() === 6) {
      // 5 = Friday to sat, 6 = Saturday to sunday
      weekendNights++;
    } else {
      weekdayNights++;
    }
    currentDate = currentDate.add(1, "day");
  }
  console.log("Weekday nights", weekdayNights);
  console.log("Weekend nights", weekendNights);

  /*
  if internalPrice {
    return weekdayNights*pricePerWeekdayNight + weekendNights*pricePerWeekendNight;
  }
  else {
    // TODO: calculate price for external participants
    return weekdayNights*pricePerWeekdayNight + weekendNights*pricePerWeekendNight;
  }
  */

  return NaN;
}
