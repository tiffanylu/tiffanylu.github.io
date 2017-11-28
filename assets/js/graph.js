---
---
var width = $('.svg-container').width(),
height = $('.svg-container').height();

var svg = d3.select("svg")
.attr("viewBox", "0 0 " + width + " " + height);

// var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
.force("link", d3.forceLink()
  .id(function(d) { return d.id; })
  .distance(function(d) {return d.value}).strength(0.03))
.force("charge", d3.forceManyBody())
.force("center", d3.forceCenter(width / 2, height / 2));

d3.json("data/portfolio-meta.json", function(error, graph) {
  if (error) throw error;

  var link = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(graph.links)
  .enter().append("line")
  .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.append("g")
  .attr("class", "nodes")
  .selectAll(".myText")
  .data(graph.nodes)
  .enter().append("circle")
  .attr("r", function(d) {
    switch(d.group) {
      case 1:
        return 12;
        break;
      default:
        return 6;
    }
  })
  .attr("fill", function(d) { return color(d.group); })
  .attr("name", function(d) { return d.id; })
  .on("click", onNodeClicked)
  .call(d3.drag()
  .on("start", dragstarted)
  .on("drag", dragged)
  .on("end", dragended));

  var label = svg.append("g")
  .attr("class", "labels")
  .selectAll("circle")
  .data(graph.nodes)
  .enter().append("text")
            .text(function (d) { return d.id; })
            .style("text-anchor", "right")
            .style("fill", "#555")
            .style("font-size", 12);

  simulation
  .nodes(graph.nodes)
  .on("tick", ticked);

  simulation.force("link")
  .links(graph.links);

  (function addEdgesData() {
    for (var i = 0; i < graph.links.length; i++) {
      var elem = graph.links[i];
      var sourceId = elem['source']['id'];
      var targetId = elem['target']['id'];
      var $node = $('circle[name="' + sourceId + '"]');
      var edges = $node.data('edges');
      if (!edges) {
        $node.data('edges', [targetId]);
      } else {
        $node.data('edges', edges.concat(targetId));
      }
    }
  })();

  function ticked() {
    link
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

    node
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });

    label
    .attr("x", function(d){ return d.x; })
    .attr("y", function (d) {return d.y - 10; });
  }
});

function onNodeClicked() {
  var $this = $(this);
  showDescription.call($this);
  // var radius = $this.attr('r');
  // if (radius === '10') {
    highlightEdges.call($this);
  // }
}

function showDescription() {
  $('.description.active').removeClass('active');
  var descriptionId = '#' + $(this).attr('name').replace(/\W+/g, '');
  // console.log(descriptionId);
  $(descriptionId).addClass('active');
  $('.description-container').animate({ scrollTop: 0 }, 0);
}

function highlightEdges() {
  $('circle.active-node').removeClass('active-node');
  $('circle.active-children').removeClass('active-children');
  var $node = $(this);
  $node.addClass('active-node');
  var edgesArray = $node.data('edges');
  // console.log('node name: ' + $node.attr('name') + ' edges: ' + edgesArray);
  if (edgesArray) {
    for (var i = 0; i < edgesArray.length; i++) {
      var $edgeNode = $('circle[name="' + edgesArray[i] + '"]');
      $edgeNode.addClass('active-children');
    }
  }
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function color(i) {
  switch (i) {
    case 1:
      // projects
      return "#d5d5d5";
      break;
    case 2:
      // tech
      return "#2c6fb2";
      break;
    case 3:
      // design
      return "#fbd05b";
      break;
    case 4:
      // communication
      return "#fd6c7e";
      break;
    case 5:
      // activism
      return "#d1e9c9";
      break;
    default:
      return "#000000";
  }
}
