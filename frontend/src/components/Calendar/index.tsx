import { useState, useEffect } from "react";
import moment from "moment";
import { Day, DayCell, MonthPickButton, MonthSelector, EventMarkerWrapper, TwoCalendarsContainer } from "./styles";
import _ from "lodash";
import { getDateRange, rangeLength } from "./helpers";
import { NORWEGIAN_SHORT_DAY_NAMES, DATE_FORMAT } from "./constants";
import CalendarTable from "./CalendarTable";

export interface CalendarEvent {
    date: string;
    renderComponent: (key: string) => React.ReactNode;
}

interface CalendarProps {
    events: CalendarEvent[];
    onMonthSelected?: (selectedMonth: moment.Moment) => void;
    rangeChanged: (fromDate: string, toDate: string) => void;
}

const Calendar = ({ events, rangeChanged }: CalendarProps) => {
    const [selectedMonth, setSelectedMonth] = useState(moment());
    const [selectedDay, setSelectedDay] = useState(moment());
    const [hoverRange, setHoverRange] = useState<string[]>([]);
    const [isRangeFreezed, setIsRangeFreezed] = useState(false);

    const getDaysOfMonth = (isCurrentMonth = true) => {
        const daysOfMonth: JSX.Element[] = [];
        const month = isCurrentMonth ? moment(selectedMonth) : moment(selectedMonth).clone().add(1, "month");
        for (let i = 1; i <= month.daysInMonth(); i++) {
            const date = isCurrentMonth ? moment(selectedMonth) : moment(selectedMonth).clone().add(1, "month");
            date.set("date", i);
            const dateEvents = events.filter((event) => event.date === date.format(DATE_FORMAT));
            daysOfMonth.push(
                <DayCell
                    onMouseOver={() => (isRangeFreezed ? null : setHoverRange(getDateRange(selectedDay, date)))}
                    isInRange={_.includes(hoverRange, date.format(DATE_FORMAT))}
                    isSelected={date.isSame(selectedDay, "day")}
                    onClick={() => handleDateClicked(date)}
                    key={date.format(DATE_FORMAT)}
                >
                    <Day>{i}</Day>
                    <EventMarkerWrapper>
                        {dateEvents ? dateEvents.map((event, index) => event.renderComponent(`${index}`)) : null}
                    </EventMarkerWrapper>
                </DayCell>
            );
        }
        return daysOfMonth;
    };

    const previousMonthDays = (isCurrentMonth = true) => {
        const previousDays: JSX.Element[] = [];
        const firstOfMonth = isCurrentMonth
            ? selectedMonth.startOf("month")
            : selectedMonth.clone().add(1, "month").startOf("month");
        const mondayIndex = 0;

        // Check if Month starts with a Monday
        if (firstOfMonth.weekday() !== mondayIndex) {
            const previousMonday = firstOfMonth.clone().subtract(1, "months").endOf("month").weekday(mondayIndex);
            const dayDifference = firstOfMonth.diff(previousMonday, "days") + 1;

            for (let i = 0; i < dayDifference; i++) {
                const date = moment(firstOfMonth);
                date.subtract(dayDifference - i, "day");
                previousDays.push(
                    <DayCell
                        isSelected={date.isSame(selectedDay, "day")}
                        onClick={() => handleDateClicked(date)}
                        outOfRange={true}
                        key={isCurrentMonth ? date.format(DATE_FORMAT) : `next-${date.format(DATE_FORMAT)}`}
                    >
                        <Day>{date.format("D")}</Day>
                    </DayCell>
                );
            }
        }
        return previousDays;
    };

    const nextMonthDays = (isCurrentMonth = true) => {
        const nextDays: JSX.Element[] = [];
        const endOfMonth = isCurrentMonth
            ? selectedMonth.endOf("month")
            : selectedMonth.clone().add(1, "month").endOf("month");
        const sundayIndex = 6;

        // Check if Month ends with a sunday
        if (endOfMonth.weekday() !== sundayIndex) {
            const nextSunday = endOfMonth.clone().add(1, "months").startOf("month").weekday(sundayIndex);
            const dayDifference = nextSunday.diff(endOfMonth, "days") + 1;

            for (let i = 0; i < dayDifference; i++) {
                const date = moment(endOfMonth);
                date.add(i + 1, "day");
                nextDays.push(
                    <DayCell
                        isSelected={date.isSame(selectedDay, "day")}
                        onClick={() => handleDateClicked(date)}
                        outOfRange={true}
                        key={`${date.format(DATE_FORMAT)}`}
                    >
                        <Day>{date.format("D")}</Day>
                    </DayCell>
                );
            }
        }
        return nextDays;
    };

    const getRows = (month: moment.Moment) => {
        const isCurrentMonth = month.isSame(selectedMonth, "month");
        const slots: JSX.Element[] = [
            ...previousMonthDays(isCurrentMonth),
            ...getDaysOfMonth(isCurrentMonth),
            ...(isCurrentMonth ? [] : nextMonthDays(isCurrentMonth)),
        ];
        let cells: JSX.Element[];
        return slots.reduce(
            (prev: JSX.Element[][], curr, index) => {
                if (index % 7 === 0) {
                    // When we reach 7 days, push new Row
                    prev.push(cells);
                    // Clear Cells
                    cells = [];
                }
                // Push current cell to cells
                cells.push(curr);
                // We reached the end, push last row
                if (index === slots.length - 1) {
                    prev.push(cells);
                }
                return prev;
            },
            [[]]
        );
    };

    const handleDateClicked = (date: moment.Moment) => {
        if (hoverRange.length > 0 && !isRangeFreezed) {
            rangeChanged(hoverRange[1], hoverRange[hoverRange.length - 1]);
            setIsRangeFreezed(true);
        } else {
            setSelectedDay(date);
            setIsRangeFreezed(false);
            setHoverRange([]);
        }
    };

    const onChangeMonth = (months: number) => {
        const newSelectedMonth = moment(selectedMonth);
        newSelectedMonth.add(months, "months");
        setSelectedMonth(newSelectedMonth);
    };

    useEffect(() => {
        if (!selectedDay.isSame(selectedMonth, "month")) {
            const newMonth = moment(selectedMonth);
            newMonth.set("month", selectedDay.get("month"));
            setSelectedMonth(newMonth);
        }
    }, [selectedDay]);

    return (
        <>
            <MonthSelector>
                <MonthPickButton onClick={() => onChangeMonth(-1)}>{"<"}</MonthPickButton>
                <MonthPickButton onClick={() => onChangeMonth(1)}>{">"}</MonthPickButton>
            </MonthSelector>
            <TwoCalendarsContainer>
                <CalendarTable getRows={getRows} month={selectedMonth} />
                <CalendarTable getRows={getRows} month={selectedMonth.clone().add(1, "month")} />
            </TwoCalendarsContainer>
        </>
    );
};

export const createDateRange = (fromDate: string, toDate: string) => getDateRange(moment(fromDate), moment(toDate));
export const getRangeLength = (fromDate: string, toDate: string) => rangeLength(fromDate, toDate);
export const CONSTANTS = { NORWEGIAN_SHORT_DAY_NAMES, DATE_FORMAT };
export default Calendar;
