import Human from "../views/Dashboard/Human";
import Heat from "../views/Dashboard/TwoDash";
import Tech from "../views/Dashboard/Tech";
import Building from "../views/Dashboard/Building";
import Stocks from "../views/Dashboard/Stocks";
import Demo from "../views/Dashboard/Demo";
import PI from "../views/Dashboard/PI";
import Clock from "../views/Dashboard/Clock";
import RealStock from "../views/Dashboard/RealStock";
import React from "react";

const initCharts = [
  {
    id: "stock",
    label: "Human Body composition ",
    active: false,
    layout: { x: 1, y: 0, w: 2, h: 2 },
  },
  {
    id: "realstock",
    label: "Egypt's exports",
    active: true,
    layout: { x: 0, y: 0, w: 2, h: 3 },
  },
  {
    id: "heat",
    label: "RealTime stock price",
    active: false,
    layout: { x: 0, y: 0, w: 1, h: 1 },
  },
  {
    id: "hey",
    label: "Top 5 richest peoples",
    active: false,
    layout: { x: 1, y: 0, w: 2, h: 2 },
  },
  {
    id: "exchanges",
    label: "Egypt's imports",
    active: true,
    layout: { x: 2, y: 0, w: 2, h: 3 },
  },
  {
    id: "yes",
    label: "Highest Buildings",
    active: false,
    layout: { x: 2, y: 0, w: 1, h: 2 },
  },
  {
    id: "stocker",
    label: "company’s capital",
    active: false,
    layout: { x: 1, y: 0, w: 1, h: 2 },
  },
  {
    id: "demo",
    label: "Demographics",
    active: false,
    layout: { x: 0, y: 0, w: 1, h: 3 },
  },
  {
    id: "clocker",
    label: "Classical Clock",
    active: false,
    layout: { x: 0, y: 0, w: 1, h: 2 },
  },
];

const components = {
  stock: <Human />,
  heat: <Heat />,
  hey: <Tech />,
  yes: <Building />,
  stocker: <Stocks />,
  demo: <Demo />,
  exchanges: <PI />,
  clocker:<Clock/>,
  realstock:<RealStock/>
};

export { initCharts, components };
