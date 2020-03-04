var width = 960;
var height = 500;
var adj = 20;
var padding = 100;
var margin = 5;
var xAxis, yAxis;
// we are appending SVG first
var svg = d3.select("div#my-chart").append("svg")
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "-" + adj + " -"+ adj + " " + (width + adj) + " " + (height + adj))
.style("padding", padding)
.style("margin", margin)
.classed("svg-content", true);


var dataset = d3.csv("../data/course_grades.csv").then(function(data) {
    var dict = {};

    data.map(function(d) {
        if (d["Term"] == "1410") {
            if (dict[d["Course"]] != null) {
                dict[d["Course"]] += 1
            } else {
                dict[d["Course"]] = 0
            }
        }
    })
 
    var keys = Object.keys(dict);
    var dlist = d3.entries(dict);
    var positions = [];
    for (i=0;i<keys.length + 1;i++) {
        positions[i] = i * 21
    }
    console.log(dlist);
    var maxVal = d3.max(dlist, function(d) {return d.value})
    var xScale = d3.scaleOrdinal().domain(keys).range(positions);
    var yScale = d3.scaleLinear().domain([0, maxVal]).nice().range([height - padding, padding]);
    xAxis = d3.axisBottom(xScale),
    yAxis = d3.axisLeft(yScale);
    return dlist;
});

var dataScale = 3.3;
dataset.then(function(data) {
    svg.selectAll("div")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d, i) {
        for (i>0; i < data.length; i++) {
            return i * 21;
        }
    })
    .attr("y", function (d) {
        return height - (d.value * dataScale);
    })
    .attr("width", 20)
    .attr("height", function (d) {
        return d.value * dataScale;
    });
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width/2 -  75)
    .attr("y", height + 65)
    .text("Course name");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", -30)
    .attr("x", -height/2 - 100)
    .attr("transform", "rotate(-90)")
    .text("Enrollment");
    svg.append("g")
        .attr("class", "xaxis axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "0em")
            .attr("dy", "1em")
            .attr("transform", "rotate(-65)");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(-2,"+ padding +")")
        .call(yAxis);
});
