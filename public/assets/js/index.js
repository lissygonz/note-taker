var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNotebtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");


//activeNote keeps track of the note
var activeNote = {};

//a function to get all notes notes
var getNotes = function () {
    return $.ajax({
        url: "/api/notes",
        method : "GET"
    });
};

//a function to save the note
var saveNote = function(note){
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST"
    });






    var renderActiveNote = function() {
        $saveNotebtn.hide();

        if(activeNote.id) {
            $noteTitle.attr("readonly", true);
            $noteText.attr("readonly", true);
            $noteTitle.val(activeNote.title);
            $noteText.value(activeNote.text);
        } else {
            $noteTitle.attr("readonly", false);
            $noteText.atrr("readonly", false);
            $noteTitle.val("");
            $noteText.val("");

        }
    };

    //Get the note data and save it to the db and then updates
    var handleNoteSave = function() {
        var newNote ={
            title: $noteTitle.val(),
            text: $noteText.val()
        };



        saveNote(newNote).then(function(data) {
            getAndRenderNotes();
            renderActiveNote();
        });
    }
};

//BONUS DELETE
var handleNoteDelete = function(event) {
    event.stopPropagation();


var note = $(this)
    .parent(".list-group-item")
    .data();

if(activeNote.id === noted.id) {
    activeNote = {};
}

deleteNote(note.id).then(function(){
getAndRenderNotes();
renderActiveNote();
});
};

//sets the note and displays it

var handleNoteView = function() {
    activeNote = $(this).data();
    renderActiveNote();
};

//allows the user to add a new note
var handleNoteView = function() {
    activeNote = {};
    renderActiveNote();
};

//shows or hides the button depending if the note title or text is empty
var handleRenderSaveBtn = function() {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()){
        $saveNotebtn.hide();
    } else {
        $saveNotebtn.show();
    }
};

//note titles

var renderNoteList = function(notes) {
    $noteList.empty();

    var noteListItems = [];

    for(var i=0; i <notes.length; i++) {
        var note = notes[i];

        var $li = $("<li class='list-group-item'>").data(note);
        var $span = $("<span>").text(note.title);
        var $delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-note'>");


        $li.append($span, $delBtn);
        noteListItems.push($li);
    }

    $noteList.append(noteListItems);
};

//get notes and puts them to the side bar

var getAndRenderNotes = function() {
    return getNotes().then(function(data){
        renderNoteList(data);
    });
};

$saveNotebtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNoteView);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.om("keyup", handleRenderSaveBtn);

//displauys the initial list of notes
getAndRenderNotes();
