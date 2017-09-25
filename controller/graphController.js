var GraphApi = GraphApi || {};

GraphApi.Controller = function(){

  let _setGraphDimension = function(graphId, graphHeight, graphWidth) {

    let $graphElement = $("#" + graphId);
    $graphElement.height(graphHeight);
    $graphElement.width(graphWidth);
  };

  let _getSVGContainer = function(graphId, graphHeight, graphWidth){

    $("#" + graphId).empty();
    return d3.select("#" + graphId)
      .append("svg")
      .attr("height", graphHeight)
      .attr("width", graphWidth)
      .append("g");
  };

  let _getOrdinalXScale = function(graphData, graphWidth){

    let GRAPH_MARGIN = GraphApi.CONSTANT.Margin;
    return d3.scale.ordinal()
      .rangeRoundBands([GRAPH_MARGIN.left, graphWidth - GRAPH_MARGIN.right], 0.3)
      .domain(graphData.map(function(d) {
        return d.x;
      }));
  };

  let _getLinearXScale = function(graphData, graphWidth){

    let GRAPH_MARGIN = GraphApi.CONSTANT.Margin;
    return d3.scale.linear()
      .range([GRAPH_MARGIN.left, graphWidth - GRAPH_MARGIN.right])
      .domain([
        d3.min(graphData, function(d) {
          return d.x;
        }),
        d3.max(graphData, function(d) {
          return d.x;
        })
      ]);
  };

  let _getLinearYScale = function(graphData, graphHeight){

    let GRAPH_MARGIN = GraphApi.CONSTANT.Margin;
    return d3.scale.linear()
      .range([graphHeight - GRAPH_MARGIN.top, GRAPH_MARGIN.bottom])
      .domain([ 0,
        d3.max(graphData, function (d) {
          return d.y;
        })
      ]);
  };

  let _setGraphSign = function(graphType){

    let graphSign = "NORMAL";
    if(graphType.indexOf("TIME") != -1){
      graphSign = "TIME";
    }
    return graphSign;
  };

  let _createGraph = function(graphParam) {

    let newDataModel = GraphApi.DataModel();
    let graphData = newDataModel.formatData(graphParam.jsonData);
    let GRAPH_DIMENSION = GraphApi.CONSTANT.Dimension;

    let abscissaLabel = Object.keys(graphParam.jsonData[0])[0];
    let ordinateLabel = Object.keys(graphParam.jsonData[0])[1];

    let graphId = graphParam.graphId;

    let graphType = graphParam.graphType.toUpperCase();
    let graphSign = _setGraphSign(graphType);

    let graphHeight = parseInt(graphParam.graphHeight) ? parseInt(graphParam.graphHeight) : GRAPH_DIMENSION.height;
    let graphWidth = parseInt(graphParam.graphWidth) ? parseInt(graphParam.graphWidth) : GRAPH_DIMENSION.width;

    _setGraphDimension(graphId, graphHeight, graphWidth);
    let svgContainer = _getSVGContainer(graphId, graphHeight, graphWidth);

    let yScale = '', xScale = '';

    var view = new GraphApi.View();

    switch (graphType) {
      case "BAR":
        yScale = _getLinearYScale(graphData, graphHeight);
        xScale = _getOrdinalXScale(graphData, graphWidth);
        view.renderAxes(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign);
        view.renderBarGraph(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign);
        break;

      case "LINE":
        yScale = _getLinearYScale(graphData, graphHeight);
        xScale = _getLinearXScale(graphData, graphWidth);
        view.renderAxes(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign);
        view.renderLineGraph(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign);
        break;

      case "TIME-LINE":
        yScale = _getLinearYScale(graphData, graphHeight);
        xScale = _getOrdinalXScale(graphData, graphWidth);
        view.renderAxes(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign);
        view.renderLineGraph(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign);
        break;

      case "TIME-BAR":
        yScale = _getLinearYScale(graphData, graphHeight);
        xScale = _getOrdinalXScale(graphData, graphWidth);
        view.renderAxes(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign);
        view.renderBarGraph(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale, graphSign);
        break;

      default:

    }
  };

  let createGraph = function(graphParam){
    return _createGraph(graphParam);
  }

  return {
    createGraph: createGraph
  };

}
