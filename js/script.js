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

        });


        //Select all the employee cards displayed
        const allEmployeeCards = document.querySelectorAll('.card');
        //loop thru the cards and add click event listener
        for (let i = 0; i < allEmployeeCards.length; i++) {
            allEmployeeCards[i].addEventListener('click', function() {
                    //when an employee card is clicked create a new container for the modal content, give class "modal-container".
                    const modalContainer = document.createElement('div');
                    modalContainer.classList.add('modal-container');

                    //Loop thru the cardInfo array that contains all the objects pushed from API
                    for (let j = 0; j < cardInfo.length; j++) {
                        //when a card is clicked, get it's index then print the object contents on the corresponding index on the cardInfo array
                        //this can be seen as allEmployeeCards[i] === cardInfo[j]
                        if (i === j) {
                            //create the content of the modal				
                            let modalContent = `
                            <div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                                    <h3 id="name" class="modal-name cap">name</h3>
                                    <p class="modal-text">email</p>
                                    <p class="modal-text cap">city</p>
                                    <hr>
                                    <p class="modal-text">(555) 555-5555</p>
                                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                                    <p class="modal-text">Birthday: 10/21/2015</p>
                                </div>
                            `;
                            //print the modal to it's container
                            modalContainer.innerHTML = modalContent;
                            //append the Modal container to the gallery div for display
                            body.appendChild(modalContainer);

                        }

                    } //-------------End of cardInfo[] for-loop



                }) //-----------End of employee cards EventListener----











        } //-----------End of EmployeeCards For-loop

    }) //----End of .then(Data) fuction----