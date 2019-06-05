//Select gallery div
const employeeGallery = document.querySelector('#gallery');
const body = document.querySelector('body');
//Create an array to hold API data pushed to it for later use on the Modal.
var cardInfo = [];

//Fetch the api using given URL
fetch('https://randomuser.me/api/?nat=us&results=12')
    .then(response => response.json())
    .then((data) => {
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
            //Push desired info from API pulls into the array created at the top, put the info in an object for each employee.
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
        const allEmployeeCards = document.getElementsByClassName('card');
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
                                                <img class="modal-img" src="${cardInfo[j].picture}"/125x125" alt="profile picture">
                                                <h3 id="name" class="modal-name cap">${cardInfo[j].firstName} ${cardInfo[j].lastName}</h3>
                                                <p class="modal-text">Email: ${cardInfo[j].email}</p>
                                                <p class="modal-text cap">City: ${cardInfo[j].city}, ${cardInfo[j].state}</p>
                                                <hr>
                                                <p class="modal-text">Cell: ${cardInfo[j].cell}</p>
                                                <p class="modal-text">Address: ${cardInfo[j].street}</p>
                                                <p class="modal-text">${cardInfo[j].city}, ${cardInfo[j].state} ${cardInfo[j].zipcode}</p>
                                                <p class="modal-text">Birthday: ${cardInfo[j].dob}</p>
                                            </div>
                                            
                                            <div class="modal-btn-container">
                                                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                                <button type="button" id="modal-next" class="modal-next btn">Next</button>
                                            </div>
                                        </div>
                                    `;
                            //print the modal to it's container
                            modalContainer.innerHTML = modalContent;
                            //append the Modal container to the gallery div for display
                            body.appendChild(modalContainer);
                            console.log(j);

                            //Add EventListeners to all buttons 
                            const allButtons = document.querySelectorAll('button');
                            const modalInfoContainer = document.querySelector('.modal-info-container');
                            allButtons.forEach(button => button.addEventListener('click', (e) => {
                                //if the button's text is X
                                if (e.target.innerText === 'X') {
                                    //remove the modal
                                    body.removeChild(modalContainer);
                                    //if the previous button is clicked
                                } else if (e.target.innerText === 'NEXT') {
                                    //update modal content to the next employee on the cardInfo array based on index.

                                    modalContent = `

                                            <img class="modal-img" src="${cardInfo[j + 1].picture}"/125x125" alt="profile picture">
                                            <h3 id="name" class="modal-name cap">${cardInfo[j + 1].firstName} ${cardInfo[j + 1].lastName}</h3>
                                            <p class="modal-text">Email: ${cardInfo[j + 1].email}</p>
                                            <p class="modal-text cap">City: ${cardInfo[j + 1].city}, ${cardInfo[j + 1].state}</p>
                                            <hr>
                                            <p class="modal-text">Cell: ${cardInfo[j + 1].cell}</p>
                                            <p class="modal-text">Address: ${cardInfo[j + 1].street}</p>
                                            <p class="modal-text">${cardInfo[j + 1].city}, ${cardInfo[j + 1].state} ${cardInfo[j + 1].zipcode}</p>
                                            <p class="modal-text">Birthday: ${cardInfo[j + 1].dob}</p>

                                            `;

                                    //print the modal to it's container
                                    modalInfoContainer.innerHTML = modalContent;

                                    //increment the current employee Index on the CardInfo array.
                                    j++;
                                    //if the index (cardInfo[] is = to 11 reset it back to -1 because the next one would be (j+1) which goes back to 0 which is also cardInfo[0];
                                    //That would display all 12 employess in a loop as long as Next button is being clicked.
                                    if (j === 11) {
                                        j = -1;
                                    }
                                    //if the previous button is clicked
                                } else if (e.target.innerText === 'PREV') {

                                    //update modal content to the previous employee on the cardInfo array based on index.
                                    modalContent = `

                                            <img class="modal-img" src="${cardInfo[j - 1].picture}"/125x125" alt="profile picture">
                                            <h3 id="name" class="modal-name cap">${cardInfo[j - 1].firstName} ${cardInfo[j - 1].lastName}</h3>
                                            <p class="modal-text">Email: ${cardInfo[j - 1].email}</p>
                                            <p class="modal-text cap">City: ${cardInfo[j - 1].city}, ${cardInfo[j - 1].state}</p>
                                            <hr>
                                            <p class="modal-text">Cell: ${cardInfo[j - 1].cell}</p>
                                            <p class="modal-text">Address: ${cardInfo[j - 1].street}</p>
                                            <p class="modal-text">${cardInfo[j - 1].city}, ${cardInfo[j - 1].state} ${cardInfo[j - 1].zipcode}</p>
                                            <p class="modal-text">Birthday: ${cardInfo[j - 1].dob}</p>

                                              `;

                                    //print the modal to it's container
                                    modalInfoContainer.innerHTML = modalContent;
                                    j--;
                                    //if the index (cardInfo[] is = to 0 reset it back to 12 because the previous one would be (j-1) which goes back to 11 which is also cardInfo[11];
                                    //That would display all 12 employess in a loop as long as Prev button is being clicked.
                                    if (j === 0) {
                                        j = 12;
                                    }
                                }


                            })); //--------End of all buttons EventListeners----

                        }
                    } //-------------End of cardInfo[] for-loop

                }) //-----------End of employee cards EventListener----

        } //-----------End of EmployeeCards For-loop


        // -----------------CREATE THE SEARCH BAR----------------------------------------------------------------------
        const headerContainer = document.querySelector('.header-inner-container');
        const searchContainer = document.querySelector('.search-container');
        const searchInput =
            `
                            <form action="#" method="get">
                                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                                    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                            </form>
                        `
            //put the search bar HTML  inside the search container
        searchContainer.innerHTML = searchInput;
        //append th search bar inside the header container at the top of the page.
        headerContainer.appendChild(searchContainer);

        const searchInputField = document.querySelector('#search-input');
        const searchSubmit = document.querySelector('#search-submit');

        //add an event lister to the search button
        searchSubmit.addEventListener('click', () => {
            //loop thru all the items in the cardInfoArray
            for (let i = 0; i < cardInfo.length; i++) {
                //assign name variable to the text from the full name found in the cardInfo array of objects
                let name = `${cardInfo[i].firstName} ${cardInfo[i].lastName}`;
                //if the search value matches a name on the cardInfo array of objects
                if (searchInputField.value.toUpperCase() == name.toLowerCase()) {
                    //only display that name card.
                    galleryOutput =
                        `<div class="card">
                                 <div class="card-img-container">
                                     <img class="card-img" src="${cardInfo[i].picture}" alt="profile picture">
                                 </div>
                                 <div class="card-info-container">
                                     <h3 id="name" class="card-name cap">${name}</h3>
                                     <p class="card-text">${cardInfo[i].email}</p>
                                     <p class="card-text cap">${cardInfo[i].city}, ${cardInfo[i].state}</p>
                                 </div>
                             </div>
                                     `
                    employeeGallery.innerHTML = galleryOutput;

                }
            }

        });

        //######REAL TIME SEARCH BAR#############################################
        //select all names on display
        const allNames = document.querySelectorAll('#name');
        let nameValue;
        //add an event listener to the search bar
        searchInputField.addEventListener('keyup', () => {
            //loop thru all names
            allNames.forEach(name => {
                //assign the innertext to nameValue 
                nameValue = name.innerText;
                //check is the typed value exists in the names array by checking if it's index is bigger than -1 using indexOf.
                if (nameValue.toLowerCase().indexOf(searchInputField.value) > -1) {
                    //if the name exists select the parent node of the name and then the paren't parent which goes like this:
                    //from #name div > .card-info-container div > .card div 
                    //Then keep the div on display
                    name.parentNode.parentNode.style.display = "";
                } else {
                    //other wise hide the divs that don't match.
                    name.parentNode.parentNode.style.display = "none";
                }
            })

        });
    }) //---------------End of .then(Data) fuction-------------------