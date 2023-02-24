import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';


export default function DateField(props) {
  const { value, label, onChange } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={(val)=>onChange('dateField',val)}
          renderInput={(params) => <TextField {...params} />}
          inputFormat="DD/MM/YYYY"
          closeOnSelect
        />
    </LocalizationProvider>
  );
}