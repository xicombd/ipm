var li, liSelected;

var options = {
  "tests": {
    "active": false,
    "interval": {
      "start": {
        "hours": 22,
        "minutes": 00,
      },
      "end": {
        "hours": 22,
        "minutes": 00,
      }
    },
    "type": []
  } 
} 

var menuOpen = false;

$(window).load(function(){
  goToMenu("main");

  li = $('li');
  liSelected = li.eq(0).addClass('selected');;;
  $(window).keydown(function(e){

      if(e.which === 40){
        if(menuOpen) {
          if(liSelected){
              liSelected.removeClass('selected');
              next = liSelected.next();
              if(next.length > 0){
                  liSelected = next.addClass('selected');
              }else{
                  liSelected = li.eq(0).addClass('selected');
              }
          }else{
              liSelected = li.eq(0).addClass('selected');
          }
        }else{
          goToMenu("menu");
          $("#path").append('<span>Configurações</span>');
          $("#button").attr("src","img/button3.png");
          menuOpen = true;
        }
      }else if(e.which === 38){
          if(liSelected){
              liSelected.removeClass('selected');
              next = liSelected.prev();
              if(next.length > 0){
                  liSelected = next.addClass('selected');
              }else{
                  liSelected = li.last().addClass('selected');
              }
          }else{
              liSelected = li.last().addClass('selected');
          }
      }else if(e.which === 39){
        if(liSelected) {
          if(liSelected[0].title) {
            var pathText = liSelected[0].textContent;
            pathText = pathText.substring(0, pathText.indexOf(">"));
            $("#path").append('<span>'+pathText+'</span>');
            console.log(liSelected)
            goToMenu(liSelected[0].title);

            if(liSelected[0].children[0].children[0].id === "start-hours") {
              $('#start-hours').html(options.tests.interval.start.hours);
              $('#start-minutes').html(options.tests.interval.start.minutes);
            }else if(liSelected[0].children[0].children[0].id === "end-hours") {
              $('#end-hours').html(options.tests.interval.end.hours);
              $('#end-minutes').html(options.tests.interval.end.minutes);
            }

          } else if(liSelected[0].children[0].children[0].id === "start-hours"){
            if(options.tests.interval.start.hours > 22) options.tests.interval.start.hours = -1;
            $('#start-hours').html(++options.tests.interval.start.hours);
          } else if(liSelected[0].children[0].children[0].id === "start-minutes"){
            if(options.tests.interval.start.minutes > 58) options.tests.interval.start.minutes = -1;
            $('#start-minutes').html(++options.tests.interval.start.minutes);
          } else if(liSelected[0].children[0].children[0].id === "end-hours"){
            if(options.tests.interval.end.hours > 22) options.tests.interval.end.hours = -1;
            $('#end-hours').html(++options.tests.interval.end.hours);
          } else if(liSelected[0].children[0].children[0].id === "end-minutes"){
            if(options.tests.interval.end.minutes > 58) options.tests.interval.end.minutes = -1;
            $('#end-minutes').html(++options.tests.interval.end.minutes);
          } else if(liSelected[0].children[0]){
            if(liSelected[0].children[0].children[0].checked) {
              liSelected[0].children[0].children[0].checked = false;
            } else {
              liSelected[0].children[0].children[0].checked = true;
            }
          }
        }
      }else if(e.which === 37){
        var ul = $('ul');
        if(ul && ul[0].title) {
          goToMenu(ul[0].title);
          $("#path").children().last().remove();
        } else {
          goToMenu("main");
          $("#path").children().last().remove();
          menuOpen = false;
          $("#button").attr("src","img/button1.png");
        }
      }


      //Alterar botao
      if(liSelected[0].children[0].children[0].type === "checkbox"){
        $("#button").attr("src","img/button4.png");
      } else if (liSelected[0].children[0].children[1] && liSelected[0].children[0].children[1].textContent.indexOf('+') != -1) {
        $("#button").attr("src","img/button5.png");
      } else {
        $("#button").attr("src","img/button3.png");
      }

  });
});

function goToMenu(id) {
  var html = getHTML("partials/"+id+".html");

  $('#container').html(html);

  li = $('li');
  liSelected = li.eq(0).addClass('selected');
}

function getHTML(url) {
  var data;
  $.ajax({
    async: false,
    url: url,
    success: function(response) {
      data = response;
    }
  });
  return data;
}