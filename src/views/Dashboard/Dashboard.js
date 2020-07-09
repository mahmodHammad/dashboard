import React, { useState } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";
import { makeStyles } from "@material-ui/core/styles";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Stock from "./Dash";
import Heat from "./TwoDash";

const ResponsiveGridLayout = WidthProvider(Responsive);

const sidebarStyle = (theme) => ({
  root: {
    border: "1px solid #ccc",
    background: "#f6f6f6",
    zIndex: 1000,

    minHeight: "calc(100vh - 200px) ",
  },
  item: {
    border: "1px solid #ddd",
    background: "#fff",
  },
});
const useStyles = makeStyles(sidebarStyle);

const charts = {
  heat: <Heat />,
  stock: <Stock />,
};

export default function Dashboard() {
  const [boxes, setboxes] = useState([
    // { key: "testing", layout: { x: 1, y: 0, w: 1, h: 2 } },
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
    return charts[key];
  }

  return (
    <div>
      <ResponsiveGridLayout
        autoSize={true}
        className={`layout ${classes.root}`}
        compactType="vertical"
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
