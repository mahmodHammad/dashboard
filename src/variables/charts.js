import Stock from "../views/Dashboard/Dash";
import Heat from "../views/Dashboard/TwoDash";
import React from "react";

const Charts = [
  {
    id: "stock",
    label: "Stock(DRAG)",
    active: false,
    component: <Stock />,
    layout: { x: 1, y: 0, w: 4, h: 2 },
  },
  {
    id: "heat",
    label: "Heat(DRAG)",
    active: false,
    component: <Heat />,
    layout: { x: 0, y: 0, w: 1, h: 1 },
  },
  {
    id: "hey",
    label: "Heat(DRAG)",
    active: false,
    component: <h2>Hello</h2>,
    layout: { x: 1, y: 0, w: 1, h: 1 },
  },
  {
    id: "yes",
    label: "hoh(DRAG)",
    active: true,
    component: <h2>who are you</h2>,
    layout: { x: 2, y: 0, w: 1, h: 1 },
  },
];

export default Charts;
