import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_EVENT } from "@graphql/events/mutations";
import { GET_CATEGORIES } from "@graphql/events/queries";
import { Event } from "@interfaces/events";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { Check, Close, Warning } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Alert from "@components/Alert";
import { DEFAULT_INPUT, SlotDistributionDataType } from "../constants";
import { getInitialEventData } from "./helpers";
import { getFormattedDataAndErrors } from "../helpers";
import RequiredFields from "../EventFields/RequiredFields";
import AttendableFields from "../EventFields/AttendableFields";
import SlotDistributionFields from "../EventFields/SlotDistributionFields";
import OptionalFields from "../EventFields/OptionalFields";

type EditEventProps = {
  open: boolean;
  onClose: () => void;
  event: Event;
};

/**
 * Component (Dialog) for editing an event
 *
 * Props:
 * - open: whether the dialog should be open
 * - onClose: called when the doalog should be closed
 * - event: The event to be edited
 */

const EditEvent: React.FC<EditEventProps> = ({ open, onClose, event }) => {
  const [eventData, setEventData] = useState(DEFAULT_INPUT);
  const [isAttendable, setIsAttendable] = useState(!!event.attendable);
  const [hasSlotDistribution, setHasSlotDistribution] = useState(
    !!event.attendable && event.attendable.slotDistribution.length > 1
  );
  const [slotDistribution, setSlotDistribution] = useState<SlotDistributionDataType[]>(
    event.attendable && event.attendable.slotDistribution.length > 1
      ? event.attendable?.slotDistribution.map((slotDist) => {
          return {
            grades: slotDist.gradeGroup.split(",").map((val) => Number(val)),
            availableSlots: slotDist.availableSlots,
          };
        })
      : []
  );

  const [errors, setErrors] = useState<string[]>([]);
  const [openEditErrorSnackbar, setOpenEditErrorSnackbar] = useState(false);
  const [openEditSnackbar, setOpenEditSnackbar] = useState(false);

  const [updateEvent, { loading: updateEventLoading, error: updateEventError }] = useMutation<{
    updateEvent: { event: Event };
  }>(UPDATE_EVENT, {
    onCompleted: () => {
      setOpenEditSnackbar(true);
      onClose();
    },
    onError: () => setOpenEditErrorSnackbar(true),
  });

  const { loading: categoryLoading, error: categoryError, data: categoryData } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    // For simplicity we operate with a flat object here (combine attendable fields and event
    // fields into a single eventData object)
    const initialEventData = getInitialEventData(event, eventData);
    setEventData(initialEventData);
  }, []);

  if (categoryLoading) return <CircularProgress />;
  if (categoryError) return <Typography>Det oppstod en feil.</Typography>;

  const updateSlotDistribution = (newSlotDistribution: SlotDistributionDataType[]) => {
    setSlotDistribution(newSlotDistribution);
    const usedGrades = newSlotDistribution
      .reduce((prev: number[], curr) => prev.concat(curr.grades), [])
      .sort((a, b) => a - b);

    setEventData({
      ...eventData,
      allowedGradeYears: usedGrades,
    });
  };

  const onIsAttendableChange = (attendable: boolean) => {
    // Reset all fields depending on isAttendable if isAttendable is disabled
    if (attendable) {
      setIsAttendable(true);
      setHasSlotDistribution(false);
    } else {
      setEventData({
        ...eventData,
        availableSlots: "",
        bindingSignup: false,
        hasExtraInformation: false,
        signupOpenDate: "",
        deadline: "",
        allowedGradeYears: [1, 2, 3, 4, 5],
      });
      setIsAttendable(false);
      setHasSlotDistribution(false);
    }
  };

  const onSubmit = () => {
    const formattedInputData = getFormattedDataAndErrors(
      eventData,
      isAttendable,
      hasSlotDistribution,
      slotDistribution
    );

    if (formattedInputData.currentErrors.length > 0) {
      setErrors(formattedInputData.currentErrors);
      setOpenEditErrorSnackbar(true);
      return;
    }

    updateEvent({
      variables: {
        id: event.id,
        isAttendable,
        eventData: formattedInputData.eventInput,
        attendableData: isAttendable ? formattedInputData.attendableInput : undefined,
        slotDistributionData: isAttendable ? formattedInputData.slotDistributionInput : undefined,
      },
    });
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="md">
      <DialogTitle>
        <Typography variant="h4">Rediger arrangement</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={1} style={{ marginTop: "auto", marginBottom: "auto" }}>
              <Warning />
            </Grid>
            <Grid item xs={11}>
              Vær varsom ved endring av arrangementer etter påmelding har åpnet.
            </Grid>
          </Grid>
        </DialogContentText>
        <Grid container spacing={3}>
          <RequiredFields eventData={eventData} onEventDataChange={setEventData} />

          <AttendableFields
            eventData={eventData}
            onEventDataChange={setEventData}
            isAttendable={isAttendable}
            onIsAttendableChange={onIsAttendableChange}
          />

          <SlotDistributionFields
            eventData={eventData}
            onEventDataChange={setEventData}
            isAttendable={isAttendable}
            hasSlotDistribution={hasSlotDistribution}
            onHasSlotDistributionChange={setHasSlotDistribution}
            onUpdateSlotDistribution={updateSlotDistribution}
            slotDistribution={slotDistribution}
          />

          <OptionalFields
            eventData={eventData}
            onEventDataChange={setEventData}
            allCategories={categoryData.allCategories}
          />
        </Grid>
      </DialogContent>

      <DialogActions>
        {updateEventError && <Typography color="error">Feil: {updateEventError.message}</Typography>}
        {updateEventLoading && <CircularProgress />}
        {errors.length > 0 &&
          errors.map((error) => (
            <Typography key={error} color="error">
              {error}
            </Typography>
          ))}
        <Button onClick={() => onClose()} color="primary" startIcon={<Close />}>
          Avbryt
        </Button>
        <Button onClick={() => onSubmit()} color="primary" startIcon={<Check />}>
          Lagre
        </Button>
      </DialogActions>
      <Alert
        severity="error"
        open={openEditErrorSnackbar}
        onClose={() => {
          setOpenEditErrorSnackbar(false);
          setErrors([]);
        }}
        description={
          updateEventError
            ? updateEventError.message
            : "Opprettelse feilet: ".concat(
                errors.slice(1, errors.length).reduce((res, error) => `${res}, ${error}`, `${errors[0]}`)
              )
        }
      />

      <Alert
        severity="success"
        open={openEditSnackbar}
        onClose={() => setOpenEditSnackbar(false)}
        description={"Arrangement oppdatert"}
      />
    </Dialog>
  );
};

export default EditEvent;
