"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPatientForm = void 0;
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const formik_1 = require("formik");
const FormField_1 = require("./FormField");
const types_1 = require("../types");
const genderOptions = [
    { value: types_1.Gender.Male, label: "Male" },
    { value: types_1.Gender.Female, label: "Female" },
    { value: types_1.Gender.Other, label: "Other" },
];
const AddPatientForm = ({ onSubmit, onCancel }) => {
    return (<formik_1.Formik initialValues={{
            name: "",
            ssn: "",
            dateOfBirth: "",
            occupation: "",
            gender: types_1.Gender.Other,
        }} onSubmit={onSubmit} validate={(values) => {
            const requiredError = "Field is required";
            const errors = {};
            if (!values.name) {
                errors.name = requiredError;
            }
            if (!values.ssn) {
                errors.ssn = requiredError;
            }
            if (!values.dateOfBirth) {
                errors.dateOfBirth = requiredError;
            }
            if (!values.occupation) {
                errors.occupation = requiredError;
            }
            return errors;
        }}>
      {({ isValid, dirty }) => {
            return (<formik_1.Form className="form ui">
            <formik_1.Field label="Name" placeholder="Name" name="name" component={FormField_1.TextField}/>
            <formik_1.Field label="Social Security Number" placeholder="SSN" name="ssn" component={FormField_1.TextField}/>
            <formik_1.Field label="Date Of Birth" placeholder="YYYY-MM-DD" name="dateOfBirth" component={FormField_1.TextField}/>
            <formik_1.Field label="Occupation" placeholder="Occupation" name="occupation" component={FormField_1.TextField}/>
            <FormField_1.SelectField label="Gender" name="gender" options={genderOptions}/>
            <core_1.Grid>
              <core_1.Grid item>
                <core_1.Button color="secondary" variant="contained" style={{ float: "left" }} type="button" onClick={onCancel}>
                  Cancel
                </core_1.Button>
              </core_1.Grid>
              <core_1.Grid item>
                <core_1.Button style={{
                    float: "right",
                }} type="submit" variant="contained" disabled={!dirty || !isValid}>
                  Add
                </core_1.Button>
              </core_1.Grid>
            </core_1.Grid>
          </formik_1.Form>);
        }}
    </formik_1.Formik>);
};
exports.AddPatientForm = AddPatientForm;
exports.default = exports.AddPatientForm;
