$(document).ready(function() {
  var storeCard;
  var deckData;
  var deckArray = [];
  var handArray = [];

  // $('button').on('click', function() {


  deckShuffle(convertToArray(getDeckFromLocalStorage()))

  // getDeckFromLocalStorage();
  // convertToArray(deckData)

  // });


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
    console.log(sourceArray)
  };

  // deckShuffle(array)

  $('#library').on('click', function() {
    console.log('Clicked the library div');
    handArray.push(deckArray[0]);
    deckArray.shift();
    console.log('This is your hand array: ' + handArray);
    turnHandArrayIntoHand();
  })




  $('.hand').on('click', function() {
    var handPosition = $(this).attr('data-handPosition');
    // console.log('this hand position is: ' + handPosition);
    storeCard = handArray[handPosition];
    handArray.splice(handPosition, 1);
    console.log('Storing: ' + storeCard);
    console.log(storeCard[1].image_url)

  })

  $('td').click(function() {

    console.log('whoooo');
    $(this).html('<img class="tableTopImage" src="' + storeCard[1].image_url + '">');
    storeCard = [];
    turnHandArrayIntoHand();
  })


  function turnHandArrayIntoHand() {
    for (var i = 0; i < handArray.length; i++) {
      ($('#hand' + '' + i + '')).html('<img src="' + handArray[i][1].image_url + '">')
      console.log('whoooo')
    }
  }

});
