$(document).ready(
    () => {

        const width = 900, height = 600;
        const svg = d3.select("#voronoi")
            .append("svg")
            .attr("viewBox", "0 0 "+width+" "+height);

        const voronoi = svg.append("g");
        const labels = svg.append("g");
        const defs = svg.append('svg:defs');
        const div = d3.select("#voronoi")
            .append("div")
            .classed("tooltip", true)
            .style("opacity", 0);

        d3.json("./data/projects.json").then( (data) => {
            // Data prep
            const nestedData = nestByCategories(data);
            const hierarchicalData = d3.hierarchy(nestedData, d => d.values)
                .sum(d => d.weight);

            // let seed = new Math.seedrandom(42);
            const box = [[0,0],[0,height],[width,height],[width,0]];
            const voronoiTreeMap = d3.voronoiTreemap()
                .clip(box);

            voronoiTreeMap(hierarchicalData);
            colorHierarchy(hierarchicalData);

            const allNodes = hierarchicalData.descendants()
                .sort((a, b) => b.depth - a.depth)
                .map((d, i) => Object.assign({}, d, {id: i}));


            defs.selectAll("pattern")
                .data(allNodes.filter(d => d.depth === 2))
                .enter()
                .append("pattern")
                .attr("id", d => d.data.name)
                .attr("width", '100%')
                .attr("height", '100%')
                // .attr("patternUnits", "userSpaceOnUse")
                .append("image")
                .attr("xlink:href", d => d.data.image)
                .attr("opacity", 0.5)
                .attr("width", '600px')
                .attr("height", '400px')
                .attr('x', '-20%')
                .attr('y', '0%');

            voronoi.selectAll('path')
                .data(allNodes)
                .enter()
                .append('a')
                .attr('xlink:href', d => d.data.url)
                .append('path')
                .attr('class', d => `polygon-${d.id}`)
                .attr('d', d => "M" + d.polygon.join("L") + "Z")
                .attr("stroke", d => d.depth === 2 ? 'white' : 'white')
                .attr("stroke-width", d => d.depth === 2 ? 7 : 7)
                .attr('pointer-events', d => d.depth > 0 ? 'fill' : 'none')
                .style('fill', d => d.depth === 2 ? 'url(#'+d.data.name+')': d.color)
                .style('fill-opacity', d => d.depth > 0 ? 1 : 0)
                .on('mouseover', (d) => {
                    if (d.depth === 1) {
                        let poly = voronoi.select(`.polygon-${d.id}`);
                            poly.style('fill-opacity', 0)
                                .attr('pointer-events', 'none');
                        let label = labels.select(`.label-${d.id}`);
                            label.attr('opacity', 0);
                    }
                    if (d.depth === 2) {
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);
                        div.html(d.data.name)
                            .style("left", getTooltipXposition(div))
                            .style("top", d3.event.clientY - svg.node().getBoundingClientRect().y + height/2 + "px");
                    }
                })
                .on('mousemove', () => {
                    div.transition()
                        .duration(0)
                        .style("opacity", 1);
                    div.style("left", getTooltipXposition(div))
                        .style("top", d3.event.clientY - svg.node().getBoundingClientRect().y + height/2 + "px");
                })
                .on('mouseout', (d) => {
                    div.style("opacity", 0);
                    div.html("")
                        .style("left", "-500px")
                        .style("top", "-500px");
                    if (d.depth === 2) {
                        voronoi.selectAll('path')
                            .data(allNodes)
                            .style('fill-opacity', d => d.depth > 0 ? 1 : 0)
                            .attr('pointer-events', d => d.depth > 0 ? 'fill' : 'none')
                        labels.selectAll('text')
                            .data(allNodes)
                            .attr('opacity', 1);
                    }
                })

            labels.selectAll('text')
                .data(allNodes.filter(d => d.depth === 1))
                .enter()
                .append('text')
                .attr('class', d => `label-${d.id}`)
                .attr('text-anchor', 'middle')
                .attr('cursor', 'default')
                .attr('pointer-events', 'none')
                .attr('fill', 'black')
                .attr('font-size', '30px')
                .attr('x', d => d.polygon.site.x)
                .attr('y', d => d.polygon.site.y)
                .text(d => d.data.key);
        })

        const nestByCategories = (data) => {
            let groups = d3.nest()
                .key(d => d.category)
                .entries(data);
            return {key: "groups", values: groups}
        }

        const colorHierarchy = (hierarchy) => {
            if(hierarchy.depth === 0) {
                hierarchy.color = 'black';
            } else if(hierarchy.depth === 1){
                hierarchy.color = colors[hierarchy.data.key];
            } else {
                hierarchy.color = hierarchy.parent.color;
            }
            if(hierarchy.children) {
                hierarchy.children.forEach( child => colorHierarchy(child))
            }
        }

        const colors = {
            "Web": "#0666B9",
            "Python": "#FFCB47  ",
            "3D Printing": "#f97f67",
            "DataViz": "#0D9099",
            "Deep Learning": "#6a4c93"
        };

        function getTooltipXposition(div){
          if (div.node().getBoundingClientRect().width + d3.event.clientX < (window.innerWidth - 50) ) {
            return (d3.event.clientX - svg.node().getBoundingClientRect().x + 20 + "px");
          }
          else {
            return (window.innerWidth - 50 - div.node().getBoundingClientRect().width - svg.node().getBoundingClientRect().x + 20 + "px");
          }
        };
    }
)
