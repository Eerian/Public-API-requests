//Select gallery div
const employeeGallery = document.querySelector('#gallery');
const body = document.querySelector('body');
//Create an array to hold API data pushed to it for later use on the Modal.
var cardInfo = [];


//Fetch the api using given URL
fetch('https://randomuser.me/api/?nat=us&results=12')
    .then(response => response.json())
    .then((data) => {
        console.log(data.results);
        //Assign gallery content to null for now, will update later
        let galleryOutput = ""
            //loop thru the data fetched from api
        data.results.forEach(function(employee) {
            //print the desired data from api using template literals and making it Gallery content
            galleryOutput +=
                `<div class="card">
                                <div class="card-img-container">
                                    <img class="card-img" src="${employee.picture.large}" alt="profile picture">
                                </div>
                                <div class="card-info-container">
                                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                                    <p class="card-text">${employee.email}</p>
                                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                                </div>
                        </div>`
            employeeGallery.innerHTML = galleryOutput;
            //Push desired info from API into the array created at the top, put the info in an object for each employee.
            cardInfo.push({
                'picture': employee.picture.large,
                'firstName': employee.name.first,
                'lastName': employee.name.last,
                'email': employee.email,
                'street': employee.location.street,
                'city': employee.location.city,
                'state': employee.location.state,
                'zipcode': employee.location.postcode,
                'cell': employee.cell,
                'dob': employee.dob.date
            });

            employeeGallery.innerHTML = galleryOutput;
        });
    })