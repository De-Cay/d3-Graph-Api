var GraphApi = GraphApi || {};

GraphApi.Controller = {

  CONSTANT: GraphApi.CONSTANT,

  setGraphDimension: function(graphId, graphHeight, graphWidth) {

    let $graphElement = $("#" + graphId);
    $graphElement.height(graphHeight);
    $graphElement.width(graphWidth);
  },

  getSVGContainer: function(graphId, graphHeight, graphWidth){

    $("#" + graphId).empty();
    return d3.select("#" + graphId)
      .append("svg")
      .attr("height", graphHeight)
      .attr("width", graphWidth)
      .append("g");
  },

  getOrdinalXScale(graphData, graphWidth){

    let GRAPH_MARGIN = this.CONSTANT.Margin;
    return d3.scale.ordinal()
      .rangeRoundBands([GRAPH_MARGIN.left, graphWidth - GRAPH_MARGIN.right], 0.3)
      .domain(graphData.map(function(d) {
        return d.x;
      }));
  },

  getLinearXScale(graphData, graphWidth){

    let GRAPH_MARGIN = this.CONSTANT.Margin;
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
  },

  getLinearYScale(graphData, graphHeight){

    let GRAPH_MARGIN = this.CONSTANT.Margin;
    return d3.scale.linear()
      .range([graphHeight - GRAPH_MARGIN.top, GRAPH_MARGIN.bottom])
      .domain([ 0,
        d3.max(graphData, function (d) {
          return d.y;
        })
      ]);
  },

  setGraphSign(graphType){

    if(graphType.indexOf("TIME") != -1){
      this.CONSTANT.GraphSign = "TIME";
    }
  },

  initialize: function(graphParam) {

    let graphData = GraphApi.DataModel.formatData(graphParam.jsonData);
    let GRAPH_DIMENSION = this.CONSTANT.Dimension;

    let abscissaLabel = Object.keys(graphParam.jsonData[0])[0];
    let ordinateLabel = Object.keys(graphParam.jsonData[0])[1];

    let graphId = graphParam.graphId;

    let graphType = graphParam.graphType.toUpperCase();
    this.setGraphSign(graphType);

    let graphHeight = parseInt(graphParam.graphHeight) ? parseInt(graphParam.graphHeight) : GRAPH_DIMENSION.height;
    let graphWidth = parseInt(graphParam.graphWidth) ? parseInt(graphParam.graphWidth) : GRAPH_DIMENSION.width;

    this.setGraphDimension(graphId, graphHeight, graphWidth);
    let svgContainer = this.getSVGContainer(graphId, graphHeight, graphWidth);

    let yScale = '', xScale = '';

    switch (graphType) {
      case "BAR":
        yScale = this.getLinearYScale(graphData, graphHeight);
        xScale = this.getOrdinalXScale(graphData, graphWidth);
        GraphApi.View.renderAxes(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale);
        GraphApi.View.renderBarGraph(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale);
        break;

      case "LINE":
        yScale = this.getLinearYScale(graphData, graphHeight);
        xScale = this.getLinearXScale(graphData, graphWidth);
        GraphApi.View.renderAxes(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale);
        GraphApi.View.renderLineGraph(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale);
        break;

      case "TIME-LINE":
        yScale = this.getLinearYScale(graphData, graphHeight);
        xScale = this.getOrdinalXScale(graphData, graphWidth);
        GraphApi.View.renderAxes(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale);
        GraphApi.View.renderLineGraph(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale);
        break;

      case "TIME-BAR":
        yScale = this.getLinearYScale(graphData, graphHeight);
        xScale = this.getOrdinalXScale(graphData, graphWidth);
        GraphApi.View.renderAxes(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale);
        GraphApi.View.renderBarGraph(svgContainer, graphData, graphWidth, graphHeight, xScale, yScale);
        break;

      default:

    }
  },
}
