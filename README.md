
# Graph Widget built with d3js.

Simple graph widget that can be embeded in html.
It needs 5 parameters to draw graphs **:**
- graphType, type of graph we want to draw.
- graphId, HTML Id where we want to draw the graph.
- graphHeight, Height of the graph.
- graphWidth, Width of the graph.
- jsonData, JSON data, an array of objects with two keys, where *first key* denotes **abcissa** and *second key* denotes **ordinate**.

```javascript
let newGraphLayout = GraphApi.graphController();
newGraphLayout.createGraph({
  graphType: "Bar",
  garphId: "htmlId",
  graphHeight: "auto",
  graphWidth: "auto",
  jsonData: [{key1: value1, key2: value2}, ...]
});
```
