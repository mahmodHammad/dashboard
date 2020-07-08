import React, { useState } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";
import { makeStyles } from "@material-ui/core/styles";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Dash from "./Dash";

const ResponsiveGridLayout = WidthProvider(Responsive);
const getLayoutsFromSomewhere = () => {
  var layouts = {
    lg: [
      { h: 2, w: 4, x: 0, y: 0, i: "1" },
      { h: 2, w: 2, x: 3, y: 0, i: "2" },
      { h: 2, w: 2, x: 6, y: 0, i: "3" },
      { h: 2, w: 2, x: 6, y: 0, i: "4" },
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
  return layouts;
};

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
  console.log(boxes);
  var layouts = getLayoutsFromSomewhere();
  const classes = useStyles();
  function onDrop(e) {
    let newBoxes=[...boxes,"4"]
    setboxes(newBoxes)
    console.log("boxes",boxes)
  }
  return (
    <div>
      <div
        className="droppable-element"
        draggable={true}
        unselectable="on"
        // this is a hack for firefox
        // Firefox requires some kind of initialization
        // which we can do by adding this attribute
        // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
      >
        Droppable Element (Drag me!)
      </div>
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
