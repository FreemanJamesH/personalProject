$(document).ready(function() {

  var pageCount = 0;
  var resultsMax = 5;
  var startPosition = 0;
  var name;
  var greenSearch = "";
  var redSearch = "";
  var blueSearch = "";
  var whiteSearch = "";
  var blackSearch = "";
  var commonSearch = "";
  var uncommonSearch = "";
  var rareSearch = "";
  var mythicalSearch = "";
  var subtype = "";
  var type = "";


  $('#name').on('keyup', function() {
    $('.imageHolder.one').children().remove();
    name = ('name=' + $('#name').val());
    console.log('https://api.deckbrew.com/mtg/cards?' + name + greenSearch + redSearch + blueSearch + whiteSearch + blackSearch + commonSearch + uncommonSearch + rareSearch + mythicalSearch + subtype + type + '&page=' + pageCount)

    ajaxFunc();
  });

  $('.navButton').on('click', function(event) {
    var adder = ((+resultsMax) - startPosition)
    if ($(this).attr('id') == 'next') {
      if ((numberResults < ((+resultsMax) + ((+resultsMax) - startPosition))) && numberResults != 100) {
        resultsMax = numberResults;
      } else {
        resultsMax = ((+resultsMax) + ((+resultsMax) - startPosition));
        startPosition += adder;
      }
    } else {
      resultsMax = ((+resultsMax) - ((+resultsMax) - startPosition));
      startPosition -= adder;
    };

    if (startPosition > 99) {
      pageCount++;
      startPosition = 0;
      resultsMax = adder;
    }
    if (startPosition < 0) {
      if (pageCount == 0) {
        pageCount = 0;
        startPosition = 0;
        resultsMax = adder;
      } else {
        pageCount--
        startPosition = (100 - adder);
        resultsMax = 100;
      }
    }
    console.log(startPosition)
    event.preventDefault();
    $('.imageHolder.one').children().remove();
    ajaxFunc();
  });


  $('button').not('.navButton').on('click', function(e) {
    console.log('yo');
    $('.imageHolder.one').children().remove();
    var currentClass = $(this).attr('class');
    var text = $(this).text();
    if (currentClass == text) {
      $(this).removeClass().addClass('' + currentClass + 'Click');
    } else {
      $(this).removeClass().addClass(text);
    };
    switch (currentClass) {
      case "GreenClick":
        greenSearch = "";
        break;
      case "RedClick":
        redSearch = "";
        break;
      case "BlueClick":
        blueSearch = "";
        break;
      case "BlackClick":
        blackSearch = "";
        break;
      case "WhiteClick":
        whiteSearch = "";
        break;
      case "Black":
        blackSearch = "&color=black";
        break;
      case "Green":
        greenSearch = "&color=green";
        break;
      case "Red":
        redSearch = "&color=red";
        break;
      case "White":
        whiteSearch = "&color=white";
        break;
      case "Blue":
        blueSearch = "&color=blue";
        break;
      case "CommonClick":
        commonSearch = "";
        break;
      case "UncommonClick":
        uncommonSearch = "";
        break;
      case "RareClick":
        rareSearch = "";
        break;
      case "MythicalClick":
        mythicalSearch = "";
        break;
      case "Common":
        commonSearch = "&rarity=common";
        break;
      case "Uncommon":
        uncommonSearch = "&rarity=uncommon";
        break;
      case "Rare":
        rareSearch = "&rarity=rare";
        break;
      case "Mythical":
        mythicalSearch = "&rarity=mythical";
        break;
    }
    e.preventDefault();
    ajaxFunc();
  });

  $('select').not('.resultsCount').on('change', function() {
    resultsMax = ($('.resultsCount > option:selected').val());
    $('.imageHolder.one').children().remove();
    if ($('.subtypes > option:selected').val() == '-Select One-') {
      subtype = "";
    } else {
      subtype = ('&subtype=' + $('.subtypes > option:selected').val()).toLowerCase();
    }
    if ($('.types > option:selected').val() == '-Select One-') {
      type = "";
    } else {
      type = ('&type=' + $('.types > option:selected').val()).toLowerCase();
    };

    pageCount = 0;
    startPosition = 0;
    console.log ('running function')
    ajaxFunc();
  })

  $('.resultsCount').on('change', function() {
    $('.imageHolder.one').children().remove();
    resultsMax = ($('.resultsCount > option:selected').val());
    while (startPosition % ($('.resultsCount > option:selected').val()) != 0) {
      startPosition--
    };
    console.log('yuuuur')

    ajaxFunc();


  })




  function ajaxFunc() {


    $.ajax({


      url: ('https://api.deckbrew.com/mtg/cards?' + name + greenSearch + redSearch + blueSearch + whiteSearch + blackSearch + commonSearch + uncommonSearch + rareSearch + mythicalSearch + subtype + type + '&page=' + pageCount),
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        console.log('ajax is running')
        for (var i = startPosition; i < resultsMax; i++) {
            var j = 0;
            checkForPicture();
            function checkForPicture(){
              console.log('checking')
              console.log ('no. editions =' + response[i].editions.length)
            if ((response[i].editions[j].image_url == 'https://image.deckbrew.com/mtg/multiverseid/0.jpg') && (j < (response[i].editions.length - 1)))  {
              j++;
              checkForPicture();
            } else {
              var imageID = (response[i].editions[j].image_url);
              console.log(response[i])
              $('.imageHolder.one').append('<img src="' + imageID + '">');
              numberResults = response.length;
              j = 0;
            }
          }
        }
      }
    })
  };
})
