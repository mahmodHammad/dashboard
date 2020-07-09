import Human from "../views/Dashboard/Human";
import Heat from "../views/Dashboard/TwoDash";
import Tech from "../views/Dashboard/Tech";
import React from "react";

const initCharts = [
  {
    id: "stock",
    label: "Stock(DRAG)",
    active: false,
    layout: { x: 1, y: 0, w: 4, h: 2 },
  },
  {
    id: "heat",
    label: "Heat(DRAG)",
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
    label: "hoh(DRAG)",
    active: true,
    layout: { x: 2, y: 0, w: 1, h: 1 },
  },
];

const components={stock:<Human /> , heat:<Heat /> ,hey:<Tech/> , yes: <h2>who are you</h2>}


export  {initCharts , components} ;
