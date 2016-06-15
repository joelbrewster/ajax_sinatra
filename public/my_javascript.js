$(function(){
  $('form').on('submit', function(e){
    e.preventDefault();
  });

  $('#save-note').on('click', function(){
    var formData = $('#edit').serialize();
    var noteId = $('#edit').attr('data-note-id');

    $.ajax({
      url: '/note/' + $('#edit').attr('data-note-id'),
      data: formData,
      method: 'PATCH',
      success: function(data){
        $('tr[data-note-id="'+noteId+'"] td:eq(1)').text(data.note_text);
        $('tr[data-note-id="'+noteId+'"] td:eq(2)').text(data.note_category);
        $('#edit').trigger('reset');
        $('#edit').hide();
      }
    });
  });

  $('#cancel-edit').on('click', function(event){
    $('#edit').hide();
    event.preventDefault();
  });
  function editNote(){
    var noteId = $(this).data('note-id');

    var noteRow = $('tr[data-note-id="'+noteId+'"]');
    var noteText = noteRow.find('td:eq(1)').text();
    var noteCategory = noteRow.find('td:eq(2)').text();
    $('#edit input:eq(0)').attr('value', noteText);
    $('#edit input:eq(1)').attr('value', noteCategory);
    $('#edit').attr('data-note-id', noteId);
    $('#edit').show();
  }
  function deleteNote(){
    var noteId = $(this).data('note-id');
    var del = confirm('Are you sure you want to delete this note?');
    if(del){
      $.ajax({
        url: '/note/'+noteId,
        method: 'DELETE',
        success: function(data){
          $('tr[data-note-id="'+noteId+'"]').remove();
        },
        error: function(data){

        }
      });
    }
  }

  function getNotes(){
    $.get('/notes', function(data){
      for(var i = 0; i < data.length; i++){
        var tRow = $('<tr>').attr('data-note-id', data[i].id);
        tRow.append(
          $('<td>').text(data[i].id),
          $('<td>').text(data[i].note_text),
          $('<td>').text(data[i].note_category),
          $('<td>').append(
            $('<button>').data('note-id', data[i].id).text('Edit').on('click', editNote),
            $('<button>').data('note-id', data[i].id).text('Delete').on('click', deleteNote)
            )
          );
          $('#notes').append(tRow);
        }
      });
    }
    function createNote(note){
      $.post('/notes', note, function(data){
        var tRow = $('<tr>').attr('data-note-id', data.id);
        tRow.append(
          $('<td>').text(data.id),
          $('<td>').text(data.note_text),
          $('<td>').text(data.note_category),
          $('<td>').append(
            $('<button>').data('note-id', data.id).text('Edit').on('click', editNote),
            $('<button>').data('note-id', data.id).text('Delete').on('click', deleteNote)
            )
          );
          $('#notes').append(tRow);
        });
      }
      getNotes();

      $('form:first-of-type').on("submit", function(event){
        var noteData = $(this).serialize();
        createNote(noteData);
        event.preventDefault();
      });
    });
