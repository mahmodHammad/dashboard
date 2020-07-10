import React, { useState } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";
import { makeStyles } from "@material-ui/core/styles";

import "./style.css";
import "react-resizable/css/styles.css";

import { components } from "../../variables/Charts";

const ResponsiveGridLayout = WidthProvider(Responsive);
const sidebarStyle = (theme) => ({
  root: {
    border: "1px solid #555",
    borderRadius: 4,
    background: "#333",
    zIndex: 1000,

    minHeight: "calc(100vh - 120px) ",
  },
  item: {
    border: "1px solid #111",
    borderRadius: 4,
    background: "#222",
    "&:active": {
      cursor: "grab",
      opacity: 0.8,
    },
  },
  remove: {
    color: "#700",
    position: "absolute",
    top: 0,
    right: 1,
    width: 0,
    height: 0,
    padding: "0px 15px 25px 5px",
    zIndex: 1000,
    "&:hover": {
      cursor: "pointer",
    },
  },
});
const useStyles = makeStyles(sidebarStyle);

export default function Dashboard({ charts, addChart, updateCharts }) {
  const classes = useStyles();

  function onDrop(e) {
    const getTriggeredID = e.e.dataTransfer.getData("text/html");
    const chart = getchart(getTriggeredID);
    const isExist = checkExist(chart);
    if (isExist) return;
    else {
      addChart(chart, e, getTriggeredID);
    }
  }

  function getchart(id) {
    let chart = charts.filter((e) => e.id == id)[0];
    return chart;
  }

  function checkExist(chart) {
    return chart.active;
  }

  function updateLocalstorage(e) {
    let newCharts = [...charts];
    e.forEach((c) => {
      newCharts.forEach((cc, i) => {
        if (c.i === cc.id) {
          newCharts[i].layout = c;
        }
      });
    });
    if (e.length) {
      localStorage.setItem("charts", JSON.stringify(newCharts));
    }
  }

  function handleMouseLeave(e) {
    e.hover = false;
    updateCharts(e, false);
  }
  function handleMouseEnter(e) {
    e.hover = true;
    updateCharts(e, false);
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
        onLayoutChange={(e) => updateLocalstorage(e)}
        // onBreakpointChange={(e) => setbreakpoint(e)}
      >
        {charts
          .filter((c) => c.active)
          .map((e) => (
            <div
              onMouseEnter={() => handleMouseEnter(e)}
              onMouseLeave={() => handleMouseLeave(e)}
              className={classes.item}
              key={e.id}
              data-grid={e.layout}
            >
              {components[e.id]}
            </div>
          ))}
      </ResponsiveGridLayout>
    </div>
  );
}
