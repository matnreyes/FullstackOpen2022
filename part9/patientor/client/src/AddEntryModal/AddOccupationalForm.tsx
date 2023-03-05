import { Grid, Button, Typography } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, DateField } from "./FormField";
import { useStateValue } from "../state";
import { Diagnosis, Entry } from "../types";

export type EntryFormValues = Omit<Extract<Entry, { type: "OccupationalHealthcare" }>, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddOccupationalForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosisInfo }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employer = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              name="date"
              component={DateField}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer Name"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
            <Typography variant="h5">Sick leave:</Typography>
            <Field
              label="Start Date"
              placeholder="Sick leave start date"
              name="sickLeave.startDate"
              component={DateField}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
            <Field
              label="End Date"
              placeholder="Sick leave end date"
              name="sickLeave.endDate"
              component={DateField}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
            <DiagnosisSelection diagnoses={Object.values(diagnosisInfo as Diagnosis[])} setFieldTouched={setFieldTouched} setFieldValue={setFieldValue}/>
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalForm;
