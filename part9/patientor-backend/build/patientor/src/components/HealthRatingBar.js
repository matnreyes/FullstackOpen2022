"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const lab_1 = require("@material-ui/lab");
const Favorite_1 = __importDefault(require("@material-ui/icons/Favorite"));
const core_1 = require("@material-ui/core");
const StyledRating = (0, core_1.withStyles)({
    iconFilled: {
        color: "#ff6d75",
    },
    iconHover: {
        color: "#ff3d47",
    },
})(lab_1.Rating);
const HEALTHBAR_TEXTS = [
    "The patient is in great shape",
    "The patient has a low risk of getting sick",
    "The patient has a high risk of getting sick",
    "The patient has a diagnosed condition",
];
const HealthRatingBar = ({ rating, showText }) => {
    return (<div className="health-bar">
      <StyledRating readOnly value={4 - rating} max={4} icon={<Favorite_1.default fontSize="inherit"/>}/>

      {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
    </div>);
};
exports.default = HealthRatingBar;
