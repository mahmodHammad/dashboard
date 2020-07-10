import Human from "../views/Dashboard/Human";
import Heat from "../views/Dashboard/TwoDash";
import Tech from "../views/Dashboard/Tech";
import Building from "../views/Dashboard/Building";
import Stocks from "../views/Dashboard/Stocks";
import Demo from "../views/Dashboard/Demo";
import React from "react";

const initCharts = [
  {
    id: "stock",
    label: "Human Body",
    active: false,
    layout: { x: 1, y: 0, w: 2, h: 2 },
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
    id: "yes",
    label: "Highest Buildings",
    active: true,
    layout: { x: 2, y: 0, w: 1, h: 2 },
  },
  {
    id: "stocker",
    label: "company’s capital",
    active: true,
    layout: { x: 1, y: 0, w: 1, h: 2 },
  },
  {
    id: "demo",
    label: "Demographics",
    active: true,
    layout: { x: 0, y: 0, w: 1, h: 3},
  },
];

const components = {
  stock: <Human />,
  heat: <Heat />,
  hey: <Tech />,
  yes: <Building />,
  stocker: <Stocks />,
  demo:<Demo/>
  
};

export { initCharts, components };
