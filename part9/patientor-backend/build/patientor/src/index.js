"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const App_1 = __importDefault(require("./App"));
const state_1 = require("./state");
react_dom_1.default.render(<state_1.StateProvider reducer={state_1.reducer}>
    <App_1.default />
  </state_1.StateProvider>, document.getElementById('root'));
