var GraphApi = GraphApi || {};

GraphApi.DataModel = {

  CONSTANT: GraphApi.CONSTANT,

  formatData(jsonData){

    let xKey = Object.keys(jsonData[0])[0];
    let yKey = Object.keys(jsonData[0])[1];
    this.CONSTANT.CoordinateLabel = {
      'abcissa': xKey.toUpperCase(),
      'ordinate': yKey.toUpperCase()
    };

    if (this.CONSTANT.CoordinateLabel.abcissa == "DATE") {
      return this.getTimeFormattedData(jsonData, xKey, yKey);
    }else{
      return this.getNormalFormattedData(jsonData, xKey, yKey);
    }
  },

  getTimeFormattedData(jsonData, xKey, yKey){

    let parseDate = d3.time.format("%d-%b-%y").parse;

    let formattedData = [];
    for (let ii = 0, n = jsonData.length; ii < n; ii++){
      let element = jsonData[ii];
      let newObj = {
        'x': parseDate(element[xKey]),
        'y': element[yKey]
      };
      formattedData.push(newObj);
    }
    return formattedData;
  },

  getNormalFormattedData(jsonData, xKey, yKey){

    let formattedData = [];
    for (let ii = 0, n = jsonData.length; ii < n; ii++){
      let element = jsonData[ii];
      let newObj = {
        'x': element[xKey],
        'y': element[yKey]
      };
      formattedData.push(newObj);
    }
    return formattedData;
  }
}
