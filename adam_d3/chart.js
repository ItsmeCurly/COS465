var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// var svg = d3.select("body")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");

d3.csv('..\\data\\course_grades.csv')
    .then(function (data) {
        data.forEach(function (d) {
            d._term = "20" + d.Term.slice(0,2) + "_" + d.Term.slice(2,3)
            d._grade = parseGrade(d.Grade)
        });
        
        var selectedData = data.filter(function(d) {
            return d["Course ID"] == "022541";
        })

        selectedData.forEach(function(d) {
            new_data = selectedData.filter(function (d1) { return d1._term == d._term })
            d._totalgrade = d3.mean(new_data, function (d1) { return d1._grade })
        })

        selectedData.sort(function (x, y) {
            return d3.ascending(x._term, y._term);
        })
        // var dict = {}

        var map = d3.map(selectedData, function(d) {return d._term});

        // map.keys().forEach(key => {
        //     new_data = selectedData.filter(function (d) {return d._term == key && d.Grade != "W"})
        //     var mean = d3.mean(new_data, function(d) {return d._grade});
        //     dict[key] = mean;
        // });

        console.log(selectedData)

        var y = d3.scaleLinear().domain((d3.extent(data, function (d) { return d._grade }))).range([height, 0])

        var x = d3.scalePoint().domain(map.keys()).range([0,width]);

        // append the svg object to the body of the page
        var svg = d3.select("div")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        svg.append("g")
            .call(d3.axisLeft(y));

        console.log(selectedData)

        // Add the line
        svg.append("path")
            .datum(selectedData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 3.0)
            .attr("d", d3.line()
                .x(function (d) {
                    return x(d._term) 
                })
                .y(function (d) {
                    console.log(d._term + " " +  d._totalgrade)
                    return y(d._totalgrade) }
                )
                .curve(d3.curveBasis));

        //console.log(d3.mean(selectedData, function(d) {return d._grade}))
        // d3.select("body")
        //     .selectAll("p")
        //     .data(data)
        //     .enter()
        //     .filter(function (d) { return d._term == '2014_1' && d["Course ID"] == '022541' })
        //     .append("p")
        //     .text(function (d) {
        //         console.log(d3.mean(data), function(d) {g._grade})
        //         return d3.mean(data, function(d) {d._grade});
        //     });
    })
    .catch(function (error) {
        console.log(error)
    });

function parseGrade(grade) {
    if(grade == 'F') {
        return 0;
    }
    else if(grade == 'D-') {
        return .7;
    }
    else if (grade == 'D') {
        return 1.0;
    }
    else if (grade == 'D+') {
        return 1.3;
    }
    else if (grade == 'C-') {
        return 1.7;
    }
    else if (grade == 'C') {
        return 2.0;
    }
    else if (grade == 'C+') {
        return 2.3;
    }
    else if (grade == 'B-') {
        return 2.7;
    }
    else if (grade == 'B') {
        return 3.0;
    }
    else if (grade == 'B+') {
        return 3.3;
    }
    else if (grade == 'A-') {
        return 3.7;
    }
    else if (grade == 'A') {
        return 4.0;
    }
    else {
        return 0;
    }
}