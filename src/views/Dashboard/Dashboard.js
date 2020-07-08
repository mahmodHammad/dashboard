import React from "react";

import { Responsive, WidthProvider } from "react-grid-layout";
import { makeStyles } from "@material-ui/core/styles";
const ResponsiveGridLayout = WidthProvider(Responsive);

const sidebarStyle = (theme) => ({
  root: {
    border: "2px solid red",
    zIndex: 1000,
  },
  item: {
    border: "2px solid blue",
  },
});
const useStyles = makeStyles(sidebarStyle);

const layout = [
  { i: "a", x: 5, y: 15, w: 1, h: 12, static: true },
  { i: "b", x: 1, y: 15, w: 3, h: 22, minW: 2, maxW: 4 },
  { i: "c", x: 4, y: 15, w: 11, h: 12 },
];

// import Dash from "./Dash";
export default function Dashboard() {
  const getLayoutsFromSomewhere = () => {
    var layouts = {
      lg: [
        { h: 2, w: 2, x: 0, y: 0, i: "1" },
        { h: 2, w: 2, x: 1, y: 0, i: "2" },
        { h: 2, w: 2, x: 2, y: 0, i: "3" },
      ],
      sm: [
        { h: 2, w: 2, x: 0, y: 0, i: "1" },
        { h: 2, w: 2, x: 1, y: 0, i: "2" },
        { h: 2, w: 2, x: 2, y: 0, i: "3" },
      ],
      md: [
        { h: 2, w: 2, x: 0, y: 0, i: "1" },
        { h: 2, w: 2, x: 1, y: 0, i: "2" },
        { h: 2, w: 2, x: 2, y: 0, i: "3" },
      ],
      xs: [
        { h: 2, w: 2, x: 0, y: 0, i: "1" },
        { h: 2, w: 2, x: 0, y: 1, i: "2" },
        { h: 2, w: 2, x: 0, y: 2, i: "2" },
      ],
      xxs: [
        { h: 2, w: 2, x: 0, y: 0, i: "1" },
        { h: 2, w: 2, x: 0, y: 1, i: "2" },
        { h: 2, w: 2, x: 0, y: 2, i: "3" },
      ],
    };
    return layouts;
  };
  var layouts = getLayoutsFromSomewhere();
  const classes = useStyles();
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      className={classes.root}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >
      <div className={classes.item} key="1">
        1
      </div>
      <div className={classes.item} key="2">
        2
      </div>
      <div className={classes.item} key="3">
        3
      </div>
    </ResponsiveGridLayout>
  );
}
