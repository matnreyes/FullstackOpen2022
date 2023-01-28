"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
router.get('/', (_req, res) => {
    const diagnoses = diagnoseService_1.default.getAll();
    res.send(diagnoses);
});
exports.default = router;
