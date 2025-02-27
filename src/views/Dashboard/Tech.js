import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/material";

am4core.useTheme(am4themes_animated);

class App extends Component {
  componentDidMount() {
 
var chart = am4core.create("human", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.paddingBottom = 30;

chart.data = [{
    "name": "Jeff Bezos",
    "steps": 113,
    "href": "https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg"
}, {
    "name": "Bill Gates",
    "steps": 98,
    "href": "https://s3-us-west-1.amazonaws.com/gtvcdn/image/channel_logo_636572480135692098.jpg"
}, {
    "name": "Mark Zuckerberg",
    "steps": 78.6,
    "href": "https://pbs.twimg.com/profile_images/685770502531497984/jHRmKJpP_400x400.jpg"
}, {
    "name": "Bernard Arnault",
    "steps": 76,
    "href": "https://www.textilwirtschaft.de/news/media/8/Bernard-Arnault-78271-detail.jpeg"
}, {
    "name": "Warren Buffett",
    "steps": 67.5,
    "href": "https://pbs.twimg.com/profile_images/654862902650732544/okPLbY9A_400x400.jpg"
}];

var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "name";
categoryAxis.renderer.grid.template.strokeOpacity = 0;
categoryAxis.renderer.minGridDistance = 10;
categoryAxis.renderer.labels.template.dy = 35;
categoryAxis.renderer.tooltip.dy = 35;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inside = true;
valueAxis.renderer.labels.template.fillOpacity = 0.3;
valueAxis.renderer.grid.template.strokeOpacity = 0;
valueAxis.min = 0;
valueAxis.cursorTooltipEnabled = false;
valueAxis.renderer.baseGrid.strokeOpacity = 0;

var series = chart.series.push(new am4charts.ColumnSeries);
series.dataFields.valueY = "steps";
series.dataFields.categoryX = "name";
series.tooltipText = "{valueY.value}";
series.tooltip.pointerOrientation = "vertical";
series.tooltip.dy = - 6;
series.columnsContainer.zIndex = 100;

var columnTemplate = series.columns.template;
columnTemplate.width = am4core.percent(50);
columnTemplate.maxWidth = 66;
columnTemplate.column.cornerRadius(60, 60, 10, 10);
columnTemplate.strokeOpacity = 0;

series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueY", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
series.mainContainer.mask = undefined;

var cursor = new am4charts.XYCursor();
chart.cursor = cursor;
cursor.lineX.disabled = true;
cursor.lineY.disabled = true;
cursor.behavior = "none";

var bullet = columnTemplate.createChild(am4charts.CircleBullet);
bullet.circle.radius = 30;
bullet.valign = "bottom";
bullet.align = "center";
bullet.isMeasured = true;
bullet.mouseEnabled = false;
bullet.verticalCenter = "bottom";
bullet.interactionsEnabled = false;

var hoverState = bullet.states.create("hover");
var outlineCircle = bullet.createChild(am4core.Circle);
outlineCircle.adapter.add("radius", function (radius, target) {
    var circleBullet = target.parent;
    return circleBullet.circle.pixelRadius + 10;
})

var image = bullet.createChild(am4core.Image);
image.width = 60;
image.height = 60;
image.horizontalCenter = "middle";
image.verticalCenter = "middle";
image.propertyFields.href = "href";

image.adapter.add("mask", function (mask, target) {
    var circleBullet = target.parent;
    return circleBullet.circle;
})

var previousBullet;
chart.cursor.events.on("cursorpositionchanged", function (event) {
    var dataItem = series.tooltipDataItem;

    if (dataItem.column) {
        var bullet = dataItem.column.children.getIndex(1);

        if (previousBullet && previousBullet != bullet) {
            previousBullet.isHover = false;
        }

        if (previousBullet != bullet) {

            var hs = bullet.states.getKey("hover");
            hs.properties.dy = -bullet.parent.pixelHeight + 30;
            bullet.isHover = true;

            previousBullet = bullet;
        }
    }
})
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="human" style={{ width: "100%", height: "100%" }}></div>;
  }
}

export default App;
