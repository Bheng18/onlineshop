// IIFE - Immediately Invoked Function Expression
// Read More: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(function() {
  var notes = [];
  var pageTitle = document.getElementById('pageTitle');
  var notesTable = document.getElementById('notesTable');
  console.log(pageTitle);

  axios.get('http://localhost:3300/api/notes')
    .then(function(res) {
      notes = res.data;
      renderNotes(notes);
    })
    .catch(function(err) {
      notes = [];
    });

  var clearBtn = document.getElementById('clearBtn');
  clearBtn.addEventListener('click', function(event) {
    var inputs = document.getElementsByClassName('form-control');
    for(var i = 0; i < inputs.length; ++i) {
      var item = inputs[i];
      item.value = '';
    }
  });

  var addNoteForm = document.getElementById('addNoteForm');
  addNoteForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var titleInput = document.getElementById('title');
    var descriptionTextarea = document.getElementById('description');
    var payload = {
      title: titleInput.value,
      description: descriptionTextarea.value
    };
    axios.post('http://localhost:3300/api/notes', payload)
      .then(function(res) {
        notes = res.data;
        renderNotes(notes);
      })
      .catch(function(err) {
        notes = [];
      });
  });

  function renderNotes(notes) {
    notesTable.innerHTML = '';
    var headers = ['ID', 'Title', 'Description'];
    var thead = document.createElement('tr');
    headers.forEach(function(header) {
      var td = document.createElement('td');
      td.textContent = header;
      thead.append(td);
    });
    notesTable.append(thead);
    notes.forEach(function(note){
      var tr = document.createElement('tr');
      var tdId = document.createElement('td');
      var tdTitle = document.createElement('td');
      var tdDescription = document.createElement('td');
      tdId.textContent = note.id;
      tdTitle.textContent = note.title;
      tdDescription.textContent = note.description;
      tr.append(tdId);
      tr.append(tdTitle);
      tr.append(tdDescription);
      notesTable.append(tr);
    });
  }

})(); //- end of IIFE