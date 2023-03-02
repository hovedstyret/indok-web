import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import nb from "dayjs/locale/nb";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useState } from "react";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(nb);
dayjs.tz.setDefault("Europe/Oslo");

const calculateTimeLeft = (countdownTime: string, now: Dayjs): Record<string, number> => {
  // calculate time left until the countdownTime (sign up time)
  const countdown = dayjs(countdownTime);
  const difference = countdown.diff(now);

  if (difference > 0)
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

  return {};
};

type Props = {
  /** The date that is counted down to */
  countDownDate: string;
  /** The time right now */
  currentTime: string;
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

const ButtonText: React.FC<Props> = ({
  isSignedUp,
  isOnWaitingList,
  countDownDate,
  currentTime,
  isFull,
  positionOnWaitingList,
}) => {
  const translate = (timeWord: string, time: number) => {
    if (timeWord === "days") return time > 1 ? "dager" : "dag";
    if (timeWord === "hours") return time > 1 ? "timer" : "time";
    if (timeWord === "minutes") return time > 1 ? "minutter" : "minutt";
    if (timeWord === "seconds") return time > 1 ? "sekunder" : "sekund";
  };

  const [now, setNow] = useState(dayjs(currentTime));
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(countDownDate, now));

  useEffect(() => {
    // Update timeLeft and now (current time) each second
    const id = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(countDownDate, now));
      setNow(now.add(1, "second"));
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  });

  const currentTimeParts = Object.keys(timeLeft).filter((interval) => timeLeft[interval] !== 0);

  const getCurrentTimeLeft = (timeparts: string[]) => {
    if (timeparts.length === 1) {
      return `Åpner om ${timeLeft[timeparts[0]]} ${translate(timeparts[0], timeLeft[timeparts[0]])}`;
    }
    if (timeparts[0] === "minutes") {
      if (timeLeft[timeparts[0]] < 10) {
        return `Åpner om ${timeLeft[timeparts[0]]} ${translate(timeparts[0], timeLeft[timeparts[0]])} og ${
          timeLeft[timeparts[1]]
        } ${translate(timeparts[1], timeLeft[timeparts[1]])}`;
      }
      return `Åpner om ${timeLeft[timeparts[0]]} ${translate(timeparts[0], timeLeft[timeparts[0]])}`;
    }
    return `Åpner om ${timeLeft[timeparts[0]]} ${translate(timeparts[0], timeLeft[timeparts[0]])} og ${
      timeLeft[timeparts[1]]
    } ${translate(timeparts[1], timeLeft[timeparts[1]])}`;
  };

  if (currentTimeParts.length !== 0) return <>{getCurrentTimeLeft(currentTimeParts)}</>;
  if (isSignedUp) return <>Meld av</>;
  if (isOnWaitingList) {
    if (positionOnWaitingList === 2) {
      return (
        <>
          Det er en person foran deg i ventelisten
          <br /> Trykk her for å melde av
        </>
      );
    } else if (positionOnWaitingList === 1) {
      return (
        <>
          Du er på første plass i ventelisten <br />
          Trykk her for å melde av
        </>
      );
    } else
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

/**
 * Component for the count down button on the detail page of an attendable event
 *
 * Props:
 * - countDownDate: the date that is counted down to
 * - currentTime: the time right now
 * - isSignedUp: whether the user viewing the page is signed up to the event
 * - isOnWaitingList: whether the user viewing the page is on the waiting list for the event
 * - isFull: whether the event is full (all available slots are taken)
 * - loading: whether the button should show a loading symbol
 * - disabled: whether the button should be disabled
 * - onClick: metod called when the count down button is clicked
 * - styleClassName: styled class
 */

export const CountdownButton: React.FC<Props> = ({
  countDownDate,
  currentTime,
  isSignedUp,
  isOnWaitingList,
  positionOnWaitingList,
  isFull,
  loading,
  disabled,
  onClick,
}) => {
  const [now] = useState(dayjs(currentTime));
  const [timeLeft] = useState(calculateTimeLeft(countDownDate, now));

  const currentTimeParts = Object.keys(timeLeft).filter((interval) => timeLeft[interval] !== 0);

  return (
    <Box sx={{ float: "left" }}>
      <LoadingButton
        fullWidth
        sx={{ minWidth: (theme) => theme.spacing(30) }}
        size="large"
        variant={currentTimeParts.length !== 0 ? "text" : "contained"}
        color={isSignedUp || isOnWaitingList ? "inherit" : "primary"}
        onClick={onClick}
        disabled={currentTimeParts.length !== 0 || disabled}
        loading={loading}
      >
        <ButtonText
          countDownDate={countDownDate}
          currentTime={currentTime}
          isSignedUp={isSignedUp}
          isOnWaitingList={isOnWaitingList}
          positionOnWaitingList={positionOnWaitingList}
          isFull={isFull}
          loading={loading}
          onClick={onClick}
        />
      </LoadingButton>
    </Box>
  );
};
