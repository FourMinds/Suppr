import * as d3 from "d3";

export function renderStar(finalValue) {
  
  if (d3.select("svg")) {
    d3.select("svg").remove()
  }

  let vis = d3.select('#star').append("svg")
          .attr("width", 80)
          .attr("height", 80)
          .style("overflow", "hidden");

  //coordinate data for pathing the two stars
  let data1 = [
    {x: 40.000, y: 20.000},
    {x: 63.511, y: 32.361},
    {x: 59.021, y: 6.180},
    {x: 78.042, y: -12.361},
    {x: 51.756, y: -16.180},
    {x: 40.000, y: -40.000},
    {x: 28.244, y: -16.180},
    {x: 1.958, y: -12.361},
    {x: 20.979, y: 6.180},
    {x: 16.489, y: 32.361},
    {x: 40.000, y: 20.000}
  ];

  let data2 = [
    {x: 40.000, y: 18.000},
    {x: 61.160, y: 29.125},
    {x: 57.119, y: 5.562},
    {x: 74.238, y: -11.125},
    {x: 50.580, y: -14.562},
    {x: 40.000, y: -36.000},
    {x: 29.420, y: -14.562},
    {x: 5.762, y: -11.125},
    {x: 22.881, y: 5.562},
    {x: 18.840, y: 29.125},
    {x: 40.000, y: 18.000}
  ];

  let lineMap = d3.line()
              .x(function(d) { return d.x; })
              .y(function(d) { return d.y; });

  //the following groups are "appended" in order of their z-indices
  let innerStar = vis.append("g")
              .attr("transform", "translate(0, 43)");

  let revealGroup = vis.append("g")
              .attr("transform", "translate(0, 0)")
              .style("overflow", "hidden")

  let outerStar = vis.append("g")
              .attr("transform", "translate(0, 43)");

  let textGroup = vis.append("g")
              .attr("transform", "translate(40, 48)");

  let revealBox = revealGroup.append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", 80)
              .attr("height", 80)
              .attr("fill", "#f8f8ff")
              .style("overflow", "hidden")
              
  let text = textGroup.append("text")
              .text(0)
              .style("font-family", "Helvetica")
              .style("fill", "#474747")
              .attr("text-anchor", "middle")

  outerStar.selectAll("path")
      .data([data1])
      .enter()
      .append("path")
        .attr("d", lineMap)
        .attr("fill", "none")
        .attr("stroke", "#24a866")
        .attr("stroke-width", 2);

  innerStar.selectAll("path")
      .data([data2])
      .enter()
      .append("path")
        .attr("d", lineMap)
        .attr("fill", "#24a866")
        .attr("stroke", "#f8f8ff")
        .attr("stroke-width", 2);

  let numberFormat = function(number, precision) {
      let factor = Math.pow(10, precision);
      let tempNumber = number * factor;
      let roundedTempNumber = Math.round(tempNumber);
      return roundedTempNumber / factor;
  };

  let textTween = function() {
        let that = this;
        let i = d3.interpolateRound(that.textContent);
        return function(t) {
          d3.select(that).text(numberFormat((t * finalValue), 1));
        };
      }

  revealBox.transition()
      .duration(1500)
      .delay(500)
      .attr("y", -(finalValue * 14.2)); //max 71

  text.transition()
      .duration(1500)
      .delay(500)
      .tween("text", textTween)

}