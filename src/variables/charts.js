import Stock from "../views/Dashboard/Dash";
import Heat from "../views/Dashboard/TwoDash";
import React from 'react'

const Charts = [
  { id: "stock", label: "Stock(DRAG)", active: true, component: <Stock /> },
  { id: "heat", label: "Heat(DRAG)", active: false, component: <Heat /> },
  {
    id: "hey you",
    label: "Heat(DRAG)",
    active: false,
    component: <h2>Hello</h2>,
  },
  {
    id: "yes you",
    label: "hoh(DRAG)",
    active: true,
    component: <h2>who are you</h2>,
  },
];

export default Charts;
