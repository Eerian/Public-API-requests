# Public API requests
This is an app for a fictional company called Awesome Startup, a distributed company with remote employees working all over the world. They need a smart way for employees to share contact information with each other.

# Uses Fetch
It uses the Random User Generator API (https://randomuser.me/) to grab information using Fetch for x number of random “employees,” and use that data to build a prototype for an Awesome Startup employee directory.

Requests a JSON object from the API and parses the data so that 12 employees are listed in a grid with their thumbnail image, full name, email, and location. Clicking the employee’s image or name will open a modal window with more detailed information, such as the employee’s birthday and address.
