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

const charts = {
  dragg: <Dash />,
};

export default function Dashboard() {
  const [boxes, setboxes] = useState([
    { key: "testing", layout: { x: 1, y: 0, w: 1, h: 2 } },
  ]);
  const classes = useStyles();

  function onDrop(e) {
    const getTriggeredID = e.e.dataTransfer.getData("text/html");
    const isExist = checkExist(getTriggeredID);
    console.log("isExist", isExist);
    if (isExist) return;
    else {
      updateLayout(boxes, e, getTriggeredID);
    }
  }

  const updateLayout = (layouts, newlayout, getTriggeredID) => {
    const newla = generateLayout(newlayout, `${getTriggeredID}`);
    let updater = { key: `${getTriggeredID}`, layout: newla };

    const newBoxes = [...boxes, updater];
    setboxes(newBoxes);
  };

  function checkExist(key) {
    let isExist = false;
    boxes.forEach((e) => {
      if (e.key === key) {
        isExist = true;
      }
    });
    return isExist;
  }

  function renderComponent(key) {
    return (
      <div>
        {charts[key]}
      </div>
    );
  }

  return (
    <div>
      <ResponsiveGridLayout
        autoSize={true}
        className="layout"
        compactType="vertical"
        className={classes.root}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 4, md: 3, sm: 2, xs: 2, xxs: 1 }}
        rowHeight={200}
        isDroppable={true}
        onDrop={onDrop}
        measureBeforeMount={false}
        // onLayoutChange={(e) => console.log(e)}
        // onBreakpointChange={(e) => setbreakpoint(e)}
      >
        {boxes.map((e) => (
          <div className={classes.item} key={e.key} data-grid={e.layout}>
            {renderComponent(e.key)}
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
    { h: 4, w: 4, x: 6, y: 6, i: "test" },
  ],
  sm: [
    { h: 2, w: 4, x: 0, y: 0, i: "1" },
    { h: 2, w: 2, x: 3, y: 0, i: "2" },
    { h: 2, w: 2, x: 6, y: 0, i: "3" },
    { h: 4, w: 4, x: 6, y: 6, i: "test" },
  ],
  md: [
    { h: 2, w: 4, x: 0, y: 0, i: "1" },
    { h: 2, w: 2, x: 3, y: 0, i: "2" },
    { h: 2, w: 2, x: 6, y: 0, i: "3" },
    { h: 4, w: 4, x: 6, y: 6, i: "test" },
  ],
  xs: [
    { h: 2, w: 2, x: 0, y: 0, i: "1" },
    { h: 2, w: 2, x: 0, y: 1, i: "2" },
    { h: 2, w: 2, x: 0, y: 2, i: "2" },
    { h: 4, w: 4, x: 6, y: 6, i: "test" },
  ],
  xxs: [
    { h: 2, w: 2, x: 0, y: 0, i: "1" },
    { h: 2, w: 2, x: 0, y: 1, i: "2" },
    { h: 2, w: 2, x: 0, y: 2, i: "3" },
    { h: 4, w: 4, x: 6, y: 6, i: "test" },
  ],
};
