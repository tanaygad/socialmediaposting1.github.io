var recieved_data;
var url_item;
var selected;

function getDataFromURL() {
    // Get the data parameter from the URL
    var urlParams = new URLSearchParams(window.location.search);
    var data = urlParams.get('data');

    // Display the data on the page
    recieved_data = decodeURIComponent(data);
    // document.getElementById("form_caption_id").value = decodeURIComponent(data);
    
}


function convertToTimeObject(timeString) {
    // Split the time string into hours, minutes, and am/pm indicator
    var timeParts = timeString.split(":");
    var hours = parseInt(timeParts[0], 10);
    // var minutes = parseInt(timeParts[1].split(" ")[0], 10); // Extract minutes and remove am/pm
    // var isPM = timeParts[1].split(" ")[1] === "pm" || timeParts[1].split(" ")[1] === "PM";

    // // Adjust hours for PM times
    // if (isPM && hours < 12) {
    //     hours += 12;
    // } else if (!isPM && hours === 12) { // Handle 12am
    //     hours = 0;
    // }

    return hours;
}

getDataFromURL()

function updateData() {
    var capt=document.getElementById('form_caption_id');
    var date1=document.getElementById('start');
    // var time1=document.getElementById('timeInput');
    // console.log(time1);
    const json = {
        caption:capt.value,
        url:url_item,
        date: date1.value,
        time: convertToTimeObject(selected),
    };

    console.log(json);

    return fetch("http://localhost:5000/edit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
    })
    .finally(() => {
        setTimeout(function () {
            // location.reload();
            window.location.href = "view.html";
        }, 100); // Reload the page after 100 milliseconds
    });
}

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
    var dropdownBtn = document.querySelector('#myDropdown .dropbtn');
    var options = document.querySelectorAll('#myDropdown .dropdown-content a');
    options.forEach(function(option) {
        option.addEventListener('click', function() {
            selected = option.textContent;
            dropdownBtn.textContent = "Time: " + selected;
            console.log("Selected option:", selected);
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


document.addEventListener('DOMContentLoaded', function() {
    console.log("heelo");

    fetch('http://localhost:5000/view-doc')
    .then(response => {
        console.log('Response:', response);
        return response.json();
    })
    .then(data => {
        // Get the main container

        // Loop through the data and create sections
        // console.log(data.length());
        console.log(recieved_data);
        for (var i = 0; i < data.length; i++) 
        {
            // Create a new section element
            if(i==recieved_data)
            {
                var ImgContainer = document.getElementById('previewImage');
                ImgContainer.src=data[i].image_url;
                document.getElementById("form_caption_id").value =data[i].description;
                document.getElementById("start").value=data[i].date;
                // document.getElementById("timeInput").value=data[i].time;
                selected=data[i].time;
                var dropdownBtn = document.querySelector('#myDropdown .dropbtn');
                dropdownBtn.textContent = "Time: " + selected+":00";
                url_item=data[i].url; 
                break;
            }
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

