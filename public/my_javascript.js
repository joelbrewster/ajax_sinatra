$(function(){
  function getNotes(){
    $.get('/notes', function(data){
      console.log(data);
    });
  }
  function createNote(){
    $.post('/notes', {}, function(data){

    });
  }
  getNotes();

  $('form')>on("submit", function(event){
    event.preventDefault();
  });
});
