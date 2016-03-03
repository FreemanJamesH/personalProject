$(document).ready(function() {

  var deckData;
  var deckArray = [];

  // $('button').on('click', function() {


    deckShuffle(convertToArray(getDeckFromLocalStorage()))

    // getDeckFromLocalStorage();
    // convertToArray(deckData)

  // });


  function convertToArray(deckObject) {
    deckArray =[];
    for (var key in deckObject) {
      for (var i = 0; i < deckObject[key][0]; i++)
      deckArray.push(deckObject[key][2])

    }
    return (deckArray);
  }


  var array = [1, 2, 3, 4, 5, 6, 7]

  function getDeckFromLocalStorage() {
    if (window.localStorage.deckData) {
      deckData = JSON.parse(window.localStorage.deckData);
    }
    return(deckData)
  }

  function deckShuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
    console.log(sourceArray)
  };

  // deckShuffle(array)




});
