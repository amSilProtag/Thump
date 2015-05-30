// Code goes here

var svg = d3.select("body").append("svg")
            .attr("width", 400)
            .attr("height", 350);

/*svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "pink");*/

var world = new World();
world.createPlayer();
world.loadMap();
window.requestAnimationFrame(world.update.bind(world));

