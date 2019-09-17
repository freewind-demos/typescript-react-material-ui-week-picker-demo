import endOfWeek from "date-fns/endOfWeek";
import startOfWeek from "date-fns/startOfWeek";
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date';

export function makeJSDateObject(date: MaterialUiPickersDate): Date {
  return new Date(date!.getTime());
}

export function weekStart(date: Date): Date {
  return startOfWeek(date, {
    weekStartsOn: 1
  });
}

export function weekEnd(date: Date): Date {
  return endOfWeek(date, {
    weekStartsOn: 1
  });
}
