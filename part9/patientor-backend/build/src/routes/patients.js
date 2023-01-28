"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const patientsService_1 = __importDefault(require("../services/patientsService"));
const helpers_1 = __importDefault(require("../utils/helpers"));
router.get('/', (_req, res) => {
    const patients = patientsService_1.default.getAll();
    res.send(patients);
});
router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = (0, helpers_1.default)(req.body);
        const addedPatient = patientsService_1.default.addPatient(newPatient);
        res.json(addedPatient).status(201);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error:' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
