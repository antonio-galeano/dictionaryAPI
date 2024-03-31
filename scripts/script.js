// Execute this code once the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {

  // Retrieve necessary DOM elements
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const definitionDiv = document.getElementById("definition");
  const clearButton = document.getElementById("clearButton");

  // Function to search for a word
  function searchWord() {
    // Get the trimmed and lowercase version of the input word
    const word = searchInput.value.trim().toLowerCase();

    // Check if the input is empty
    if (word === "") {
      alert("Please enter a word to search for.");
      return;
    }

    // Fetch word definitions from the API
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => {
        // Check for response errors
        if (!response.ok) {
          throw new Error("The word could not be retrieved.");
        }
        return response.json();
      })
      .then((data) => {
        // Extract word and its definitions from the API response
        const word = data[0].word;
        const firstMeaningDefinitions = data[0].meanings[0].definitions.map(
          (definition) => definition.definition
        );
        // Display the definitions on the webpage
        displayDefinitions(word, firstMeaningDefinitions);
      })
      .catch((error) => {
        // Log and alert if an error occurs during fetching or processing
        console.error(
          "The server returned the following response:",
          error.message
        );
        alert(
          "This word could not be retrieved. Please try again with another word."
        );
      });
  }

  // Event listeners for search button click and Enter key press in search input
  searchButton.addEventListener("click", searchWord);
  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchWord();
    }
  });

  // Function to display word definitions
  function displayDefinitions(word, definitions) {
    // Construct HTML to display definitions
    let html = `<h2 class="text-start">Definitions for "${word}":</h2>`;
    html += `<ul class="list-group">`;
    definitions.forEach((definition, index) => {
      html += `<li class="list-group-item">${definition}</li>`;
    });
    html += `</ul>`;
    // Render HTML in definition div
    definitionDiv.innerHTML = html;
  }

  // Event listener for clear button click
  clearButton.addEventListener("click", function () {
    // Clear definition div and search input
    definitionDiv.innerHTML = "";
    searchInput.value = "";
  });
});
