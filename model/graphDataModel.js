var GraphApi = GraphApi || {};

GraphApi.DataModel = function() {

  let _formatData = function(jsonData){

    let xKey = Object.keys(jsonData[0])[0];
    let yKey = Object.keys(jsonData[0])[1];
    GraphApi.CONSTANT.CoordinateLabel = {
      'abcissa': xKey.toUpperCase(),
      'ordinate': yKey.toUpperCase()
    };

    if (GraphApi.CONSTANT.CoordinateLabel.abcissa == "DATE") {
      return _getTimeFormattedData(jsonData, xKey, yKey);
    }else{
      return _getNormalFormattedData(jsonData, xKey, yKey);
    }
  };

  let _getTimeFormattedData = function(jsonData, xKey, yKey){

    let parseDate = d3.time.format("%d-%b-%y").parse;

    let formattedData = [];
    for (let ii = 0, n = jsonData.length; ii < n; ii++){
      let element = jsonData[ii];
      let newObj = {
        'x': parseDate(element[xKey]),
        'y': parseInt(element[yKey])
      };
      formattedData.push(newObj);
    }
    return formattedData;
  };

  let _getNormalFormattedData = function(jsonData, xKey, yKey){

    let formattedData = [];
    for (let ii = 0, n = jsonData.length; ii < n; ii++){
      let element = jsonData[ii];
      let newObj = {
        'x': element[xKey],
        'y': parseInt(element[yKey])
      };
      formattedData.push(newObj);
    }
    return formattedData;
  };

  let formatData = function(jsonData){
    return _formatData(jsonData);
  };

  return {
    formatData: formatData
  };
}
