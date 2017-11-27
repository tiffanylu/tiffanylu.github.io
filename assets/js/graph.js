---
---
var width = $('.svg-container').width(),
height = $('.svg-container').height();

var svg = d3.select("svg")
.attr("viewBox", "0 0 " + width + " " + height);

// var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
.force("link", d3.forceLink().id(function(d) { return d.id; }))
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
  .selectAll("circle")
  .data(graph.nodes)
  .enter().append("circle")
  .attr("r", function(d) { return 5 * d.group; })
  .attr("fill", function(d) { return color(d.group); })
  .attr("name", function(d) { return d.id; })
  .on("click", onNodeClicked)
  .attr('data-toggle', 'tooltip')
  .attr("title", function(d) { return d.id; })
  // .attr("data-toggle", "modal")
  // .attr("data-target", function(d) { return d.id; })
  // .on("click", function() {
  //   var node_name = $(this).attr('name');
  //   $('#' + node_name).modal();
  // })
  .call(d3.drag()
  .on("start", dragstarted)
  .on("drag", dragged)
  .on("end", dragended));

  // node.append("title")
  // .text(function(d) { return d.id; });

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
  }
});

function onNodeClicked() {
  showDescription.call($(this));
  highlightEdges.call($(this));
}

function showDescription() {
  $('.description.active').removeClass('active');
  var descriptionId = '#' + $(this).attr('name').replace(/ /g, '');
  $(descriptionId).addClass('active');
}

function highlightEdges() {
  $('circle.active').removeClass('active');
  var $node = $(this);
  $node.addClass('active');
  var edgesArray = $node.data('edges');
  console.log('node name: ' + $node.attr('name') + ' edges: ' + edgesArray);
  if (edgesArray) {
    for (var i = 0; i < edgesArray.length; i++) {
      var $edgeNode = $('circle[name="' + edgesArray[i] + '"]');
      $edgeNode.addClass('active');
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
      return "#ff9226";
      break;
    case 2:
      // return "#7a9bed";
      return "#3564d9";
      break;
    case 3:
      return "#a1e5f5";
      break;
    default:
      return "#000000";
  }
}

$(document).ready(function(){
    $('circle').tooltip({
      'container': 'body',
      'placement': 'right'
    });
});
