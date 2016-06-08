$(function(){
  function getNotes(){
    $.get('/notes', function(data){
      for(var i = 0; i < data.length; i++){
        var tRow = $('<tr>');
        tRow.append(
          $('<td>').text(data[i].id),
          $('<td>').text(data[i].note_text),
          $('<td>').text(data[i].note_category),
          $('<td>').text('ACTIONS')
          );
        $('#notes').append(tRow);
      }
    });
  }
  function createNote(note){
    $.post('/notes', note, function(data){
      var noteDiv = $('<div>').addClass('note').text(data.note_text);
      $('#notes').append(tRow);
    });
  }
  getNotes();

  $('form').on("submit", function(event){
    var noteData = $(this).serialize();
    createNote(noteData);
    event.preventDefault();
  });
});
