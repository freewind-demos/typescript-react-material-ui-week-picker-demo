import React, {useState} from 'react'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {Moment} from 'moment';

export default function MyList() {
  const [selectedDate, handleDateChange] = useState<Date | null>(new Date());

  function onChange(date: Moment | null) {
    if (date) {
      handleDateChange(date.toDate());
    } else {
      handleDateChange(null);
    }
  }

  return <div>
    <h1>Selected Date: {(selectedDate || '').toString()}</h1>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableFuture
        variant="inline"
        inputVariant="outlined"
        openTo="year"
        format="MM/DD/YYYY"
        label="Date of birth"
        views={["date"]}
        value={selectedDate}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  </div>
}
