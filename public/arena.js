$(document).ready(function() {
  var storeCard;
  var deckData;
  var deckArray = [];
  var handArray = [];
  var tableObject = {};


  function tableGenerate() {
    for (var i = 0; i < 45; i++) {
      console.log(tableObject['' + i + '']);
      if (tableObject['' + i + ''] === undefined) {
        $("div[data-index='" + i + "']").children().remove();
      }
    }
  }

  tableGenerate();

  console.log(tableObject[1])

  deckShuffle(convertToArray(getDeckFromLocalStorage()))


  function convertToArray(deckObject) {
    deckArray = [];
    for (var key in deckObject) {
      for (var i = 0; i < deckObject[key][0]; i++)
        deckArray.push([deckObject[key][2], deckObject[key][1]])

    }
    return (deckArray);
  }


  var array = [1, 2, 3, 4, 5, 6, 7]

  function getDeckFromLocalStorage() {
    if (window.localStorage.deckData) {
      deckData = JSON.parse(window.localStorage.deckData);
    }
    return (deckData)
  }

  function deckShuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
  };


  $('#newName').on('click', function() {
    handArray.push(deckArray[0]);
    deckArray.shift();
    turnHandArrayIntoHand();
  })




  $('.handCard').on('click', function() {
    var handPosition = $(this).attr('data-handPosition');
    storeCard = handArray[handPosition];
    handArray.splice(handPosition, 1);
  })

  $('.cardSpace').click(function() {
    var cardSpaceIndex = $(this).attr('data-index');
    if (storeCard.length != 0) {
      tableObject['' + cardSpaceIndex + ''] = storeCard;
      $(this).html('<img class="tableTopImage" src="' + tableObject[cardSpaceIndex][1].image_url + '">');
      storeCard = [];
      turnHandArrayIntoHand();
      tableGenerate();
    }
    else if (tableObject['' + cardSpaceIndex + ''] != undefined) {
      tableGenerate();
      storeCard = tableObject['' + cardSpaceIndex + ''];
      delete(tableObject['' + cardSpaceIndex + ''])
    }
    console.log(tableObject);
  })


  function turnHandArrayIntoHand() {
    $('.handCard').children().remove();
    console.log(handArray.length)
    for (var i = 0; i < handArray.length; i++) {
      ($('#' + '' + i + '')).html('<img src="' + handArray[i][1].image_url + '">')
    }
  }
});
