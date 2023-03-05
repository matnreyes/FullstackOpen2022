import React, { useState } from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import {
  Select,
  FormControl,
  MenuItem,
  TextField as TextFieldMUI,
  Typography,
} from "@material-ui/core";
import { Diagnosis } from "../types";
import { InputLabel } from "@material-ui/core";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Input from '@material-ui/core/Input';

// structure of a single option
export type RatingOption = {
  value: number;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: RatingOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: "1em" }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

interface DateProps extends TextProps {
  setFieldValue: FormikProps<{ date: Date }>["setFieldValue"];
  setFieldTouched: FormikProps<{ date: Date }>["setFieldTouched"];
}

export const DateField = ({ field, label, setFieldValue, setFieldTouched }: DateProps) => {
  return (
    <div style={{ marginBottom: "1em" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...field}
          onChange={(value) => {
            setFieldTouched(field.name, true);
            setFieldValue(field.name, value);
          }}
          label={label}
        />
        <Typography variant="subtitle2" style={{ color: "red" }}>
          <ErrorMessage name={field.name} />
        </Typography>
      </LocalizationProvider>
    </div>
  );
};

/*
  for exercises 9.24.-
*/

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = "diagnosisCodes";
  const onChange = (data: string[]) => {    
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, [...data]);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: '30px' }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select multiple value={selectedDiagnoses} onChange={(e) => onChange(e.target.value as string[])} input={<Input />}>
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};
