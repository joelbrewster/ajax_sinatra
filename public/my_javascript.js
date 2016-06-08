$(function(){
  function getNotes(){
    $.get('/notes', function(data){
      console.log(data);
    });
  }
  function createNote(note){
    $.post('/notes', note, function(data){

    });
  }
  getNotes();

  $('form').on("submit", function(event){
    var noteData = $(this).serialize();
    createNote(noteData);
    event.preventDefault();
  });
});
