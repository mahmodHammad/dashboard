import React, { useState } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";
import { makeStyles } from "@material-ui/core/styles";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { components } from "../../variables/Charts";

const ResponsiveGridLayout = WidthProvider(Responsive);
const sidebarStyle = (theme) => ({
  root: {
    border: "1px solid #ccc",
    background: "#f6f6f6",
    zIndex: 1000,

    minHeight: "calc(100vh - 120px) ",
  },
  item: {
    border: "1px solid #ddd",
    background: "#fff",
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

export default function Dashboard({ charts , addChart, removeChart}) {
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
            <div className={classes.item} key={e.id} data-grid={e.layout}>
              {console.log(e.component)}
             
              {components[e.id]}
            </div>
          ))}
      </ResponsiveGridLayout>
    </div>
  );
}
