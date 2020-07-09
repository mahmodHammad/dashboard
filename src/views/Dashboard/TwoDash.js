import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

/* Create chart instance */

export default class TwoDash extends Component {
  componentDidMount() {
    var chart = am4core.create("chart", am4charts.XYChart);
    chart.paddingRight = 25;

    /* Add data */
    chart.data = [
      {
        category: "Research",
        value: 45,
        target: 80,
      },
      {
        category: "Marketing",
        value: 60,
        target: 75,
      },
      {
        category: "Distribution",
        value: 92,
        target: 96,
      },
    ];

    /* Create axes */
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.grid.template.disabled = true;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.labels.template.adapter.add("text", function (text) {
      return text + "%";
    });

    /* Create ranges */
    function createRange(axis, from, to, color) {
      var range = axis.axisRanges.create();
      range.value = from;
      range.endValue = to;
      range.axisFill.fill = color;
      range.axisFill.fillOpacity = 0.8;
      range.label.disabled = true;
    }

    createRange(valueAxis, 0, 20, am4core.color("#19d228"));
    createRange(valueAxis, 20, 40, am4core.color("#b4dd1e"));
    createRange(valueAxis, 40, 60, am4core.color("#f4fb16"));
    createRange(valueAxis, 60, 80, am4core.color("#f6d32b"));
    createRange(valueAxis, 80, 100, am4core.color("#fb7116"));

    /* Create series */
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "value";
    series.dataFields.categoryY = "category";
    series.columns.template.fill = am4core.color("#000");
    series.columns.template.stroke = am4core.color("#fff");
    series.columns.template.strokeWidth = 1;
    series.columns.template.strokeOpacity = 0.5;
    series.columns.template.height = am4core.percent(25);

    var series2 = chart.series.push(new am4charts.StepLineSeries());
    series2.dataFields.valueX = "target";
    series2.dataFields.categoryY = "category";
    series2.strokeWidth = 3;
    series2.noRisers = true;
    series2.startLocation = 0.15;
    series2.endLocation = 0.85;
    series2.tooltipText = "{valueX}";
    series2.stroke = am4core.color("#000");

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    valueAxis.cursorTooltipEnabled = false;
  }
  render() {
    return <div id="chart" style={{ width: "100%", height: "100%" }}></div>;
  }
}
