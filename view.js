window.onload = function () {
    var loader = document.getElementById('loader-wrapper');
    loader.style.display = 'none'; // Hide the loader once everything is loaded
};

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Get all elements with the class 'toggle-email'
    var toggleButtons = document.querySelectorAll('.toggle-email');

    // Loop through each button
    toggleButtons.forEach(function (button) {
        // Add a click event listener to each button
        button.addEventListener('click', function () {
            // Get the sibling email element
            var emailElement = this.nextElementSibling;

            // Toggle the 'visible' class on the email element
            emailElement.classList.toggle('visible');
        });
    });
});


function toggleMenu() {
    var navbar = document.getElementById("navbar");
    if (navbar.style.left === '0px') {
        navbar.style.left = '-250px'; // Hide
    } else {
        navbar.style.left = '0px'; // Show
    }
}

var imageUrl1;
var imageUrl2;
var imageUrl3;
var url1;
var url2;
var url3;
var description1;
var description2;
var description3;

function rejected() {
    const imageUrl = this.dataset.imageUrl; // Get image URL from data attribute
    alert(`Rejecting document with image URL: ${imageUrl}`); // Use template literal for string interpolation
    const json = {
        url: imageUrl,
        approved: -1,
        date: "2021-02-21",
    };

    console.log(json);

    fetch("https://flask-heroku-server-3.onrender.com/rej", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
    })
    .finally(() => {
        setTimeout(function () {
            location.reload();
            // window.location.href = "view.html"
        }, 100); // Reload the page after 100 milliseconds
    });
}

function fn(x)
{
    return x;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("heelo");

    fetch('https://flask-heroku-server-3.onrender.com/view-doc')
    .then(response => {
        console.log('Response:', response);
        return response.json();
    })
    .then(data => {
        // Get the main container
        var mainContainer = document.getElementById('Parent');

        // Loop through the data and create sections
        // console.log(data.length());
        for (var i = 0; i < data.length; i++) {
            // Create a new section element
            var section = document.createElement('section');
            section.id = 'contentPreview' + i; // You can set a unique ID for each section if needed
            section.className = 'CARDS';
            
            // Create and append the image container
            var NameContainer = document.createElement('div');
            NameContainer.id = 'NameContainer' + i;
            NameContainer.style.color = 'black'; // Example CSS property
            NameContainer.style.fontSize = '25px'; // Another example CSS property
            NameContainer.style.textAlign = 'center'; // Another example CSS property
            NameContainer.style.fontWeight = 'bolder'; // Another example CSS property
            // var nameHeading = document.createElement('h3');
            NameContainer.textContent = data[i].name;
            // NameContainer.appendChild(nameHeading);
            section.appendChild(NameContainer);
            var imageContainer = document.createElement('div');
            imageContainer.id = 'imageContainer';
            var previewImage = document.createElement('img');
            previewImage.id = 'previewImage';
            previewImage.src = data[i].image_url;
            previewImage.alt = 'Preview Image';
            imageContainer.appendChild(previewImage);
            section.appendChild(imageContainer);
        
            // Create and append the text container
            var textContainer = document.createElement('div');
            textContainer.id = 'textContainer' + i;
            var textHeading = document.createElement('h3');
            textHeading.textContent = data[i].description;
            textContainer.appendChild(textHeading);
            section.appendChild(textContainer);
            
            var dateContainer = document.createElement("h3");
            dateContainer.textContent = "Schedule Date: " + data[i].date + "   Scheduled Time: " + data[i].time+":00";
            section.appendChild(dateContainer);
        
            // Create and append the buttons container
            var buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'buttons-container';
            var editButton = document.createElement('button');
            editButton.id = 'editB';
            editButton.textContent = 'Edit';
        
            // Encapsulate the event listener function in another function to create a closure
            (function(index) {
                editButton.addEventListener('click', function () {
                    var dt = index;
                    console.log(dt);
                    var encodedData = encodeURIComponent(dt);
                    window.location.href = "edit2.html?data=" + encodedData;
                });
            })(i);
        
            var rejectButton = document.createElement('button');
            rejectButton.id = 'rejectB';
            rejectButton.addEventListener("click", rejected); // Pass the function reference
            rejectButton.dataset.imageUrl = data[i].url; // Store image URL in a data attribute
            rejectButton.textContent = 'Reject';
            buttonsContainer.appendChild(editButton);
            buttonsContainer.appendChild(rejectButton);
            section.appendChild(buttonsContainer);
        
            // Append the section to the main container
            mainContainer.appendChild(section);
        }
    })
    .catch(error => console.error('Error:', error));
});



// document.getElementById('rejectB').addEventListener('click', function() {
//     console.log('working');
//     alert('Content rejected!'); // Placeholder for rejection logic
    
//     // Additional logic can be added for handling rejection actions or feedback

// });
 
const buttons = document.querySelectorAll('.btn');
const body = document.body;


// Initially call the buttonClickHandler for the default active button

