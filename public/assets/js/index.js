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
            $noteTitle.attr("readonly", true)
        }
    }
}