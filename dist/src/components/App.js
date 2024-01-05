import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import Eye from "@/assets/eye.svg";
import Home from "@/assets/home.svg";
import sunFlower from "@/assets/Sunflower.jpg";
import virtus from "@/assets/Virtus.proLogo.png";
export var App = function () {
    var _a = useState(0), count = _a[0], setCount = _a[1];
    console.log('__PLATFORM__', __PLATFORM__);
    var handle = function () { return setCount(function (prev) { return prev + 1; }); };
    var showNumber = function (num) {
        console.log(num);
    };
    showNumber('tee');
    return (_jsxs("div", { children: [_jsxs("div", { children: [_jsx("img", { width: 100, src: sunFlower }), " ", _jsx("img", { width: 100, src: virtus }), " ", _jsx(Eye, { className: classes.color, width: 100, height: 100 }), " ", _jsx(Home, { width: 100, height: 100, className: classes.color })] }), _jsx(Link, { to: "/about", children: "About" }), _jsx("br", {}), _jsx(Link, { to: "/shop", children: "Shop" }), _jsx("h1", { className: classes.value, children: count }), _jsx("button", { className: classes.button, onClick: handle, children: "press" }), _jsx(Outlet, {})] }));
};
