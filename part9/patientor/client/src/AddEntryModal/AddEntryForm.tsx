import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, RatingOption, DiagnosisSelection } from "./FormField";
import { useStateValue } from "../state";
import { Diagnosis, Entry } from "../types";

export type EntryFormValues = Omit<Extract<Entry, { type: "HealthCheck" }>, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const ratingOptions: RatingOption[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "Low Risk" },
  { value: 2, label: "High Risk" },
  { value: 3, label: "Critical Risk" }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosisInfo }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 0,
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
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField label="Health Rating" name="healthCheckRating" options={ratingOptions} />
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

export default AddEntryForm;
