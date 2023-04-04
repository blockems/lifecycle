// Get the canvas element and its context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Define an empty array to store the objects
var objects = [];

// Fetch the JSON data from the URL endpoint
fetch("/canvas")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Loop through the list of items and create objects with IDs
    data.items.forEach(function(item, index) {
      if (item.image) {
        // Create an image element for the object
        var img = new Image();
        img.onload = function() {
          // When the image is loaded, create the object
          var object = {
            id: item.id,
            x: item.x,
            y: item.y,
            image: img,
            // add more properties as needed
          };
          objects.push(object);

          // Redraw the canvas when all images are loaded
          if (objects.length === data.items.length) {
            redrawCanvas();
          }
        };
        img.src = "/img/" + item.image;
      } else {
        // Create a regular object
        var object = {
          id: item.id,
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
          radius: item.radius,
          // add more properties as needed
        };
        objects.push(object);
      }
    });
  })
  .catch(function(error) {
    console.error("Error fetching data:", error);
  });

// Function to redraw the canvas with all objects
function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  objects.forEach(function(object) {
    if (object.image) {
      // Draw the image
      ctx.drawImage(object.image, object.x, object.y);
    } else if (object.width && object.height) {
      // Draw the rectangle
      ctx.fillRect(object.x, object.y, object.width, object.height);
    } else if (object.radius) {
      // Draw the circle
      ctx.beginPath();
      ctx.arc(object.x, object.y, object.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

// Add a click event listener to the canvas
canvas.addEventListener("click", function(event) {
  // Get the mouse coordinates relative to the canvas
  var x = event.offsetX;
  var y = event.offsetY;

  // Check which object was clicked
  objects.forEach(function(object) {
    if (object.image) {
      if (x > object.x && x < object.x + object.image.width &&
          y > object.y && y < object.y + object.image.height) {
        // The mouse click is inside the object, do something
        alert("You clicked object with ID " + object.id);
      }
    } else if (object.width && object.height) {
      if (x > object.x && x < object.x + object.width &&
          y > object.y && y < object.y + object.height) {
        // The mouse click is inside the object, do something
        alert("You clicked object with ID " + object.id);
      }
    } else if (object.radius) {
      var distance = Math.sqrt((x - object.x) * (x - object.x) + (y - object.y) * (y - object.y));
      if (distance < object.radius) {
        // The mouse click is inside the object, do something
        alert("You clicked object with ID " + object.id);
      }
    }
  });
});
