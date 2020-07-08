import React, { useState } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";
import { makeStyles } from "@material-ui/core/styles";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Dash from "./Dash";

const ResponsiveGridLayout = WidthProvider(Responsive);

const sidebarStyle = (theme) => ({
  root: {
    border: "1px solid #ccc",
    background: "#f6f6f6",
    zIndex: 1000,
  },
  item: {
    border: "1px solid #ddd",
    background: "#fff",
  },
});
const useStyles = makeStyles(sidebarStyle);

export default function Dashboard() {
  const [boxes, setboxes] = useState(["1", "2", "3"]);
  const [layouts, setlayouts] = useState(initLayouts);
  const classes = useStyles();

  function onDrop(e) {
    updateLayout(layouts, e);
  }

  const updateLayout = (layouts, newlayout) => {
    const newla = generateLayout(newlayout, "test");
    console.log("newla",newla)
    const beackpoints = Object.keys(layouts);
    beackpoints.forEach((breakpoint) => {
      layouts[breakpoint].push(newla);
    });
    console.log(layouts);
    const newBoxes = [...boxes , "test"]
    setboxes(newBoxes);
    setlayouts(layouts);
  };

  return (
    <div>
      {console.log(layouts)}
      <ResponsiveGridLayout
        autoSize={true}
        className="layout"
        layouts={layouts}
        compactType="vertical"
        className={classes.root}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={200}
        isDroppable={true}
        onDrop={onDrop}
        measureBeforeMount={false}
      >
        {boxes.map((e) => (
          <div className={classes.item} key={e}>
            {e}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}

function generateLayout(layout, key) {
  const { x, y, w, h } = layout;
  return {
    x,
    y,
    w,
    h,
    i: key,
  };
}

const initLayouts = {
  lg: [
    { h: 2, w: 4, x: 0, y: 0, i: "1" },
    { h: 2, w: 2, x: 3, y: 0, i: "2" },
    { h: 2, w: 2, x: 6, y: 0, i: "3" },
  ],
  sm: [
    { h: 2, w: 4, x: 0, y: 0, i: "1" },
    { h: 2, w: 2, x: 3, y: 0, i: "2" },
    { h: 2, w: 2, x: 6, y: 0, i: "3" },
  ],
  md: [
    { h: 2, w: 4, x: 0, y: 0, i: "1" },
    { h: 2, w: 2, x: 3, y: 0, i: "2" },
    { h: 2, w: 2, x: 6, y: 0, i: "3" },
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
