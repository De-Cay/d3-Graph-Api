var GraphApi = GraphApi || {};

GraphApi.View = function (){

  let _renderAxes = function(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign){

    let GRAPH_MARGIN = GraphApi.CONSTANT.Margin;

    let COORDINATE_LABEL = GraphApi.CONSTANT.CoordinateLabel;

    let yAxis = d3.svg.axis()
      .scale(yScale)
      .ticks(10)
      .orient("left");

    let xAxis = '';
    if(graphSign == "TIME"){
      xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .tickFormat(d3.time.format("%b-%d"));
    }else {
      xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");
    }

    svgContainer
      .append("g")
        .attr("transform", "translate(0," + (graphHeight - GRAPH_MARGIN.bottom) + ")")
      .call(xAxis)
        .attr("fill", "none")
        .attr("stroke", "#cccccc")
        .attr("stroke-width", "1.5");

        //NOTE: rotate labels on x-axis
        //.selectAll("text")
        //  .attr("y", 0)
        //  .attr("x", 9)
        //  .attr("dy", ".35em")
        //  .attr("transform", "rotate(90)")
        //  .style("text-anchor", "start");

    svgContainer
      .append("g")
        .attr("transform", "translate(" + (GRAPH_MARGIN.left) + ",0)")
      .call(yAxis)
        .attr("fill", "none")
        .attr("stroke", "#cccccc")
        .attr("stroke-width", "1.5");

    svgContainer.selectAll("text")
      .attr("fill", "steelblue")
      .attr("stroke", "none")
      .attr("stroke-width", "0.5");

    svgContainer
      .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ (GRAPH_MARGIN.left / 3) +","+(graphHeight / 2)+")rotate(-90)")
      .text(COORDINATE_LABEL.ordinate)
        .attr("fill", "grey")
        .attr("font-family", "Helvetica Neue");

    svgContainer
      .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ (graphWidth/2) +","+(graphHeight-(GRAPH_MARGIN.left/6))+")")
      .text(COORDINATE_LABEL.abcissa)
        .attr("fill", "grey")
        .attr("font-family", "Helvetica Neue");
  };

  let _renderBarGraph = function(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign){

    let GRAPH_MARGIN = GraphApi.CONSTANT.Margin;

    svgContainer.selectAll("rect")
      .data(graphData)
    .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d){
        return xScale(d.x);
      })
      .attr("y", function (d) {
			  return graphHeight - GRAPH_MARGIN.bottom;
		  })
      .attr("width", xScale.rangeBand())
      .attr("height", 0)
      .attr("fill", "steelblue")
      .attr("stroke", "none")
    .transition()
      .duration(900)
      .attr("y", function(d){
        return yScale(d.y);
      })
      .attr("height", function(d) {
        return ((graphHeight - GRAPH_MARGIN.bottom) - yScale(d.y));
      });

    _showToolTip(svgContainer, graphData, "rect");

    svgContainer.selectAll(".text")
  	  .data(graphData)
  	 .enter()
  	  .append("text")
  	  .attr("class","label")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-family", "Helvetica Neue")
  	  .attr("x", (function(d) { return xScale(d.x) + xScale.rangeBand() / 2 ;}))
  	  .attr("y", function(d) { return yScale(d.y) - 20 })
  	  .attr("dy", ".75em")
  	  .text(function(d) { return d.y; });
  };

  let _renderLineGraph = function(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign){

    let lineFunc = d3.svg.line()
      .x(function(d) {
        return xScale(d.x);
      })
      .y(function(d) {
        return yScale(d.y);
      })
      .interpolate('linear');

    let path = svgContainer.append('svg:path')
      .attr('d', lineFunc(graphData))
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    let totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(900)
        .ease("linear")
        .attr("stroke-dashoffset", 0);


    svgContainer.selectAll("dot")
      .data(graphData)
    .enter()
      .append("circle")
      .attr("fill", "steelblue")
      .attr("r", 10)
      .attr("cx", function(d) { return xScale(d.x); })
      .attr("cy", function(d) { return yScale(d.y); })

    _showToolTip(svgContainer, graphData, "circle")

  };

  let _showToolTip = function(svgContainer, graphData, shape, graphSign){

    let div = d3.select("body").append("div")
      .attr("class", "toolTip")
      .style("font-family", "Helvetica Neue")
      .style("position", "absolute")
      .style("font-weight", "bold")
      .style("display", "none")
      .style("width", "auto")
      .style("height", "auto")
      .style("background", "none repeat scroll 0 0 white")
      .style("border", "0 none")
      .style("border-radius", "8px 8px 8px 8px")
      .style("box-shadow", "-3px 3px 15px #888888")
      .style("color", "black")
      .style("font", "12px sans-serif")
      .style("padding", "5px")
      .style("text-align", "center");

    let timeFormate = d3.time.format('%a, %b %d %Y');

    svgContainer.selectAll(shape)
      .data(graphData)
      .on("mouseover", function(d) {
        div.style("left", d3.event.pageX+10+"px");
        div.style("top", d3.event.pageY-25+"px");
        div.style("display", "inline-block");
        div.style("font-weight","bold");
        d3.select(this)
        .attr("fill", "red");

        graphSign == "TIME" ? div.html((timeFormate(d.x))+" - "+(d.y))
          : div.html( (d.x)+" - "+(d.y));
      })
      .on("mouseout", function() {
        div.style("display", "none");
        d3.select(this)
        	.attr("fill", "steelblue");
      })
  };

  let renderLineGraph = function(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign){
    return _renderLineGraph(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign);
  };

  let renderBarGraph = function(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign){
    return _renderBarGraph(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign);
  };

  let renderAxes = function(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign){
    return _renderAxes(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign);
  };

  return{
    renderLineGraph: renderLineGraph,
    renderBarGraph: renderBarGraph,
    renderAxes: renderAxes
  };
}
