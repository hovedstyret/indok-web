import { useQuery } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import nb from "dayjs/locale/nb";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useState } from "react";

import { ServerTimeDocument } from "@/generated/graphql";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.locale(nb);
dayjs.tz.setDefault("Europe/Oslo");

dayjs.updateLocale("nb", {
  relativeTime: {
    future: "om %s",
    past: "%s siden",
    s: "%d sekunder",
    m: "ett minutt",
    mm: "%d minutter",
    h: "én time",
    hh: "%d timer",
    d: "én dag",
    dd: "%d dager",
    M: "én måned",
    MM: "%d måneder",
    y: "ett år",
    yy: "%d år",
  },
});

type ButtonTextProps = {
  isSignedUp: boolean;
  isOnWaitingList: boolean;
  countdownText: string;
  isOpen: boolean;
  isFull: boolean;
  positionOnWaitingList: number;
};

const ButtonText: React.FC<ButtonTextProps> = ({
  isSignedUp,
  isOnWaitingList,
  isOpen,
  countdownText,
  isFull,
  positionOnWaitingList,
}) => {
  if (isSignedUp) return <>Meld av</>;
  if (!isOpen) return <>Åpner {countdownText}</>;

  if (isOnWaitingList) {
    if (positionOnWaitingList === 2)
      return (
        <>
          Det er én person foran deg i ventelisten
          <br /> Trykk her for å melde av
        </>
      );
    if (positionOnWaitingList === 1)
      return (
        <>
          Du er på første plass i ventelisten
          <br /> Trykk her for å melde av
        </>
      );
    return (
      <>
        Det er {positionOnWaitingList - 1} personer foran deg i ventelisten
        <br /> Trykk her for å melde av
      </>
    );
  }

  if (isFull) return <>Meld på venteliste</>;
  return <>Meld På</>;
};

type Props = {
  /** The date that is counted down to */
  countDownDate: string;
  /** Whether the user viewing the page is signed up to the event */
  isSignedUp: boolean;
  /** Whether the user viewing the page is on the waiting list for the event */
  isOnWaitingList: boolean;
  positionOnWaitingList: number;
  /** Whether the event is full (all available slots are taken) */
  isFull: boolean;
  /** Whether the button should show a loading symbol */
  loading: boolean;
  /** Whether the button should be disabled */
  disabled?: boolean;
  /** Method called when the count down button is clicked */
  onClick: () => void;
};

/**
 * Component for the count down button on the detail page of an attendable event
 *
 * Props:
 * - countDownDate: the date that is counted down to
 * - isSignedUp: whether the user viewing the page is signed up to the event
 * - isOnWaitingList: whether the user viewing the page is on the waiting list for the event
 * - isFull: whether the event is full (all available slots are taken)
 * - loading: whether the button should show a loading symbol
 * - disabled: whether the button should be disabled
 * - onClick: metod called when the count down button is clicked
 */
export const CountdownButton: React.FC<Props> = ({
  countDownDate,
  isSignedUp,
  isOnWaitingList,
  positionOnWaitingList,
  isFull,
  loading,
  disabled,
  onClick,
}) => {
  const { timeLeft, countdownText } = useCountdown(countDownDate);

  return (
    <Box sx={{ float: "left" }}>
      <LoadingButton
        fullWidth
        sx={{ minWidth: (theme) => theme.spacing(30) }}
        size="large"
        variant={timeLeft > 0 ? "text" : "contained"}
        color={isSignedUp || isOnWaitingList ? "inherit" : "primary"}
        onClick={onClick}
        disabled={timeLeft > 0 || disabled}
        loading={loading}
      >
        <ButtonText
          countdownText={countdownText}
          isOpen={timeLeft <= 0}
          isSignedUp={isSignedUp}
          isOnWaitingList={isOnWaitingList}
          positionOnWaitingList={positionOnWaitingList}
          isFull={isFull}
        />
      </LoadingButton>
    </Box>
  );
};

/**
 * Creates a countdown based on the server time until the given `date`.
 * The countdown is updated approximately every 500 milliseconds, and should be resistant to drift.
 * @param date The date that is counted down to
 * @returns The time left until the event starts, in milliseconds
 * @returns A formatted countdown string, for more details, see [relative time](https://day.js.org/docs/en/customization/relative-time)
 */
function useCountdown(date: string) {
  /**
   * Difference between the client time and the server time at the time of the last server time query.
   */
  const [difference, setDifference] = useState<number>(0);

  useQuery(ServerTimeDocument, {
    onCompleted: (data) => {
      if (data.serverTime) {
        /**
         * Store the difference between the server time and the client time
         * to be able to calculate the correct time left.
         * This is necessary because the server and client time is not always
         * the same, and the server time is the correct one.
         * The difference is stored in milliseconds.
         */
        const serverTime = dayjs(data.serverTime);
        const currentTime = dayjs();
        const difference = currentTime.diff(serverTime);
        setDifference(difference);
      }
    },
    /**
     * Always fetch the server time from the server, completely ignoring the cache
     * as a cached server time will be outdated.
     */
    fetchPolicy: "network-only",
  });

  /**
   * The time on the client at the time of the previous render.
   */
  const [currentClientTime, setCurrentClientTime] = useState(dayjs());
  /**
   * Adjust the current client time by subtracting the difference between the client time and the server time.
   * This is necessary because the server and client time is not always
   * the same, and the server time is the correct one.
   *
   * We make an assumption here that the two clocks will advance at the same pace, i.e. that when one second has passed
   * on the server, the same has happened on the client. This is not necessarily true, but it is a reasonable assumption.
   */
  const adjustedClientTime = currentClientTime.subtract(difference, "ms");
  /**
   * Time left until the event starts, in milliseconds
   */
  const timeLeft = dayjs(date).diff(adjustedClientTime);
  /**
   * A formatted countdown string, for more details, see [relative time](https://day.js.org/docs/en/customization/relative-time)
   */
  const countdownText = dayjs(date).from(adjustedClientTime);

  useEffect(() => {
    /**
     * Update the current client time every 500 milliseconds to be able to
     * calculate the correct time left.
     *
     * Note: we have no guarantees that this function will be re-run every 500 milliseconds,
     * and as such, we must update the current time rather than e.g. subtracting a second from the previous time.
     * Otherwise, the countdown will drift over time.
     * See [Countdown timer drifts significantly before event signup opens (#427)](https://github.com/rubberdok/indok-web/issues/427)
     * for more details on this.
     */
    const id = setTimeout(() => {
      setCurrentClientTime(dayjs());
    }, 500);
    return () => {
      clearTimeout(id);
    };
  });

  return { timeLeft, countdownText };
}
