import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class App extends Component {
  componentDidMount() {
    // create chart
    let chart = am4core.create("clock", am4charts.GaugeChart);
    chart.exporting.menu = new am4core.ExportMenu();
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.startAngle = -90;
    chart.endAngle = 270;

    let axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 12;
    axis.strictMinMax = true;

    axis.renderer.line.strokeWidth = 8;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.minLabelPosition = 0.05; // hides 0 label
    axis.renderer.inside = true;
    axis.renderer.labels.template.radius = 35;
    axis.renderer.axisFills.template.disabled = true;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.ticks.template.disabled = false;
    axis.renderer.ticks.template.length = 12;
    axis.renderer.ticks.template.strokeOpacity = 1;

    // serves as a clock face fill
    let range = axis.axisRanges.create();
    range.startValue = 0;
    range.endValue = 12;
    range.grid.visible = false;
    range.tick.visible = false;
    range.label.visible = false;

    let axisFill = range.axisFill;
    axisFill.fillOpacity = 1;
    axisFill.disabled = false;
    axisFill.fill = new am4core.InterfaceColorSet().getFor("fill");

    // hands
    let hourHand = chart.hands.push(new am4charts.ClockHand());
    hourHand.radius = am4core.percent(60);
    hourHand.startWidth = 10;
    hourHand.endWidth = 10;
    hourHand.rotationDirection = "clockWise";
    hourHand.pin.radius = 8;
    hourHand.zIndex = 0;

    let minutesHand = chart.hands.push(new am4charts.ClockHand());
    minutesHand.rotationDirection = "clockWise";
    minutesHand.startWidth = 7;
    minutesHand.endWidth = 7;
    minutesHand.radius = am4core.percent(78);
    minutesHand.zIndex = 1;

    let secondsHand = chart.hands.push(new am4charts.ClockHand());
    secondsHand.fill = am4core.color("#DD0000");
    secondsHand.stroke = am4core.color("#DD0000");
    secondsHand.radius = am4core.percent(85);
    secondsHand.rotationDirection = "clockWise";
    secondsHand.zIndex = 2;
    secondsHand.startWidth = 1;

    updateHands();

    setInterval(function () {
      updateHands();
    }, 1000);

    function updateHands() {
      // get current date
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      // set hours
      hourHand.showValue(hours + minutes / 60, 0);
      // set minutes
      minutesHand.showValue((12 * (minutes + seconds / 60)) / 60, 0);
      // set seconds
      secondsHand.showValue((12 * date.getSeconds()) / 60, 300);
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="clock" style={{ width: "100%", height: "100%" }}></div>;
  }
}

export default App;
