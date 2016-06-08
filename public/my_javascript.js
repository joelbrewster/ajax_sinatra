$(function(){
  function getNotes(){
    $.get('/notes', function(data){
      for(var i = 0; i < data.length; i++){
        var noteDiv = $('<div>').addClass('note').text(data[i].note_text);
        $('#notes').append(noteDiv);
      }
    });
  }
  function createNote(note){
    $.post('/notes', note, function(data){
      var noteDiv = $('<div>').addClass('note').text(data.note_text);
      $('#notes').append(noteDiv);
    });
  }
  getNotes();

  $('form').on("submit", function(event){
    var noteData = $(this).serialize();
    createNote(noteData);
    event.preventDefault();
  });
});
