import * as d3 from "d3";
import React, { useState, useEffect, useRef } from "react";
import "./Barchart.css";

const Barchart = () => {

  const barchart = useRef()

  useEffect(() => {
    d3.json(
      "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json"
    ).then((data) => {
      console.log(data);
      let margin = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 80,
      };
    
      let width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
      let svg = d3
        .select(barchart.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
      let x = d3
        .scaleLinear()
        .range([0, width])
        .domain([
          0,
          d3.max(data, function (d) {
            return d.value;
          }),
        ]);
    
      let y = d3
        .scaleBand()
        .rangeRound([height, 0])
        .padding(0.1)
        .domain(
          data.map(function (d) {
            return d.name;
          })
        );
    
      let yAxis = d3
        .axisLeft()
        .scale(y)
        //no tick marks
        .tickSize(0);
    
      let gy = svg.append("g").attr("class", "y axis").call(yAxis);
    
      let bars = svg.selectAll(".bar").data(data).enter().append("g");
    
      bars
        .append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
          return y(d.name);
        })
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", function (d) {
          return x(d.value);
        });

        bars.append("text")
            .attr("class", "label")
            .attr("y", function (d) {
                return y(d.name) + y.bandwidth() / 2 + 4;
            })
            .attr("x", function (d) {
                return x(d.value) + 3;
            })
            .text(function (d) {
                return d.value;
            });
      
    });
  });


  return <div ref={barchart}>
  </div>;
};

export default Barchart;
