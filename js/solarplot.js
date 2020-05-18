// Create the SVG
const width = 550, height = 450;
const svg = d3.select("#solarplot")
    .append("svg")
    .attr("viewBox", "0 0 "+width+" "+height);

// Creating groups of orbits and planets
const orbits = svg.append("g")
    .attr("transform", "translate("+width/2+","+height/2+")");
const planets = svg.append("g")
    .attr("transform", "translate("+width/2+","+height/2+")");
// Loading data
d3.csv("data/data.csv").then( (data) => {

    data.forEach( (d) => {
        d.orbit_radius = +d.orbit_radius;
        d.planet_radius = +d.planet_radius;
        d.period = +d.period;
        d.theta_init = +d.theta_init;
        d.fixed = false;
    });

    orbits.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .style("stroke", "black")
        .style("stroke-dasharray", "3,1")
        .style("fill", "none")
        .attr("r", (d) => {return d.orbit_radius;});

    planets.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .style("stroke", "black")
        // .style("stroke-width", (d) => {if (d.name === "Sun") {return 3;} else {return 1;}})
        .style("fill", (d) => {
            if (d.name === "Sun") {
                return "#F8C987";
            } else if (d.name === "Earth") {
                return "#0D9099";
            } else {return "white";}
        })
        .attr("r", (d) => {return d.planet_radius;})
        .attr("cx", (d) => {return planetX(d);})
        .attr("cy", (d) => {return planetY(d);})
        .on("click", (d) => {
            // Save last theta
            d.theta = planetTheta(d);
        });


});
// Running simulation
const simulation = d3.forceSimulation();
simulation.alphaDecay(0);
let iTick = 0;
let earth = {};
let saturn = {};
simulation.on("tick", () => {
    iTick += 1;
    planets.selectAll("circle")
        .attr("cx", (d) => {
            // Saving earth coord to update sign
            if (d.name === "Earth") {
                earth.x = planetX(d);
                earth.y = planetY(d);
            }
            // Saving saturn coord to update rings
            if (d.name === "Saturn") {
                saturn.x = planetX(d);
                saturn.y = planetY(d);
            }
            return planetX(d);
        })
        .attr("cy", (d) => {return planetY(d);});
    here.select("path")
        .attr("d", () => {return "M275,-145L210,-145L"+earth.x+","+earth.y;});
    rings.select("path")
        .attr("d",() => {return "M"+(saturn.x-20)+","+(saturn.y-10)+"L"+(saturn.x+20)+","+(saturn.y+10) ;});


});
// Sign I'm here!
const here = svg.append("g")
    .attr("transform", "translate("+width/2+","+height/2+")");
here.append("text")
    .text("I'm here")
    .attr("x", "275px")
    .attr("y", "-150px")
    .attr("text-anchor", "end")
    .style("color", "black");
here.append("path")
    .style("fill", "none")
    .style("stroke", "black");

// Saturn rings
const rings = svg.append("g")
    .attr("transform", "translate("+width/2+","+height/2+")");
rings.append("path")
    // .attr("rx", "22px")
    // .attr("ry", "0.1px")
    // .attr("transform","rotate(35)")
    .style("fill", "none")
    .style("stroke", "black")
    .style("stroke-width", "1.5px");


const planetTheta = (d) => {
    if (d.period === 0) return 0;
    return 2*Math.PI / d.period * iTick/100 + d.theta_init;
}

const planetX = (d) => {
    x = d.orbit_radius * Math.cos(planetTheta(d));
    return x;
}

const planetY = (d) => {
    y = d.orbit_radius * Math.sin(planetTheta(d));
    return y;
}
