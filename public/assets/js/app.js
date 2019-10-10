//USED FROM CLASS ACTIVITY - NEED TO MODIFY TO FIT THE ASSIGNMENT

// Grab the articles as a json
$.getJSON("/blogs", function(data) {
    // For each one
    for (let i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      
      $("#blogs").append(
        "<div id='blogs' class='card'><div class='card-header'><h3><a id='blogs' class='article-link' target='_blank' rel='noopener noreferrer' data-id='" + data[i]._id + "' href='" + data[i].link +"'>" + data[i].title + "</a><a class='btn btn-success save'>Save Article</a></h3></div><div class='card-body'>Blog Article text</div></div>");
    }
  });
  
  
  // Whenever someone clicks a h3 tag
  $(document).on("click", "h3", function() {
    // Empty the notes from the note section
    $("#comments").empty();
    // Save the id from the h3 tag
    const thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/blogs/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#comments").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#comments").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.comment) {
          // Place the commentor's name in the input
          $("#userNameInput").val(data.comment.userName);
          // Place the body of the note in the body textarea
          $("#commentInput").val(data.comment.comment);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#save-comment", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/blogs/" + thisId,
      data: {
        // Value taken from title input
        name: $("#userNameInput").val(),
        // Value taken from note textarea
        comment: $("#commentInput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#comments").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#userNameInput").val("");
    $("#commentInput").val("");
  });