import React from "react";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import DashboardPage from "views/Dashboard/Dashboard.js";
import { initCharts } from "../variables/Charts";
let ps;

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [charts, setcharts] = React.useState([initCharts]);
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    let storedCharts = localStorage.getItem("charts");
    if (storedCharts !== null) {
      storedCharts = JSON.parse(storedCharts);
      setcharts(storedCharts);
    } else {
      localStorage.setItem("charts", JSON.stringify(initCharts));
    }

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);

  const addLayout = (chart, newlayout) => {
    function generateLayout(chart, newlayout) {
      const { w, h } = chart.layout;
      const { x, y } = newlayout;
      return {
        x,
        y,
        w,
        h,
      };
    }
    const newla = generateLayout(chart, newlayout, chart.id);
    chart.layout = newla;
    chart.active = true;

    updateCharts(chart);
  };

  function handelremove(id) {
    function getchart(id) {
      let chart = charts.filter((e) => e.id == id)[0];
      return chart;
    }
    let chart = getchart(id);
    chart.active = false;
    updateCharts(chart);
  }

  function updateCharts(chart) {
    let newCharts = [...charts];
    newCharts.map((c) => {
      if (charts.id === chart.id) {
        return chart;
      } else return c;
    });
    localStorage.setItem("charts", JSON.stringify(charts));

    setcharts(newCharts);
    console.log("woowowowo", newCharts);
  }

  return (
    <div className={classes.wrapper}>
      <Sidebar
        charts={charts}
        routes={routes}
        logoText={"Your Dashboard"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        removeChart={handelremove}
        addChart={addLayout}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        {/* <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        /> */}

        <div className={classes.content}>
          <div className={classes.container}>
            <DashboardPage
              charts={charts}
              setcharts={setcharts}
              removeChart={handelremove}
              addChart={addLayout}
            />
          </div>
        </div>

        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </div>
  );
}
