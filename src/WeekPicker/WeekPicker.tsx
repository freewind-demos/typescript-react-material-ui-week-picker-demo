import React, {useState} from 'react'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {IconButton, withStyles} from "@material-ui/core";
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date';
import DateFnsUtils from '@date-io/date-fns';
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import clsx from "clsx";
import {weekStart, weekEnd, makeJSDateObject} from './utils';
import styles from './styles';

function WeekPicker({classes}: { classes: any }) {
  const [selectedDate, handleDateChange] = useState<Date | null>(new Date());

  function handleWeekChange(date: MaterialUiPickersDate) {
    if (date) {
      handleDateChange(weekStart(date));
    } else {
      handleDateChange(null);
    }
  }

  function renderWrappedWeekDay(date: MaterialUiPickersDate, selectedDate: MaterialUiPickersDate, dayInCurrentMonth: boolean, dayComponent: JSX.Element) {
    let dateClone = makeJSDateObject(date);
    let selectedDateClone = makeJSDateObject(selectedDate);

    const start = weekStart(selectedDateClone);
    const end = weekEnd(selectedDateClone);

    const dayIsBetween = isWithinInterval(dateClone, {start, end});
    const isFirstDay = isSameDay(dateClone, start);
    const isLastDay = isSameDay(dateClone, end);

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(dateClone, "d")} </span>
        </IconButton>
      </div>
    );
  }

  function formatWeekSelectLabel(date: MaterialUiPickersDate, invalidLabel: string) {
    let dateClone = makeJSDateObject(date);

    return dateClone && isValid(dateClone)
      ? `Week of ${format(weekStart(dateClone), "MMM do")}`
      : invalidLabel;
  }

  return <div>
    <h1>Start Day of Selected Week: {(selectedDate || '').toString()}</h1>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        label="Week picker"
        variant="inline"
        inputVariant="outlined"
        value={selectedDate}
        onChange={handleWeekChange}
        renderDay={renderWrappedWeekDay}
        labelFunc={formatWeekSelectLabel}
      />
    </MuiPickersUtilsProvider>
  </div>
}

export default withStyles(styles)(WeekPicker);
