"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const recoil_1 = require("recoil");
const Login_1 = __importDefault(require("./Components/Login"));
const Signup_1 = __importDefault(require("./Components/Signup"));
const TodoList_1 = __importDefault(require("./Components/TodoList"));
const react_router_dom_2 = require("react-router-dom");
const recoil_2 = require("recoil");
const authState_js_1 = require("./store/authState.js");
const swr_1 = __importDefault(require("swr"));
function App() {
    return (<recoil_1.RecoilRoot>
            <react_router_dom_1.BrowserRouter>
                <InitState />
                <react_router_dom_1.Routes>
                    <react_router_dom_1.Route path='/login' element={<Login_1.default />}/>
                    <react_router_dom_1.Route path='/signup' element={<Signup_1.default />}/>
                    <react_router_dom_1.Route path='/todos' element={<TodoList_1.default />}/>
                    <react_router_dom_1.Route path='/' element={<Login_1.default />}/>
                </react_router_dom_1.Routes>
            </react_router_dom_1.BrowserRouter>
        </recoil_1.RecoilRoot>);
}
const fetcher = ({ url }) => fetch(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
}).then((res) => res.json());
function InitState() {
    const { data, error, isLoading } = (0, swr_1.default)({ url: 'http://localhost:3000/auth/me' }, fetcher);
    console.log(data);
    return <></>;
}
function InitState2() {
    const setAuth = (0, recoil_2.useSetRecoilState)(authState_js_1.authState);
    const navigate = (0, react_router_dom_2.useNavigate)();
    const init = () => __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem("token");
        try {
            const response = yield fetch('http://localhost:3000/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = yield response.json();
            if (data.username) {
                setAuth({ token: data.token, username: data.username });
                navigate("/todos");
            }
            else {
                navigate("/login");
            }
        }
        catch (e) {
            navigate("/login");
        }
    });
    (0, react_1.useEffect)(() => {
        init();
    }, []);
    return <></>;
}
exports.default = App;
