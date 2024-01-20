
function validation(){
  const form = document.querySelector('form');
  form.addEventListener('Submit',(e)=>{
    if(!form.checkValidity()){
      e.preventDefault();
    }
    form.classList.add('was-validated')
  })
}
validation();
function bookAppointment() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;

  if (name && email && number) {
    const appointmentData = {
      name: name,
      email: email,
      number: number
    };

    // Make a POST request to the CRUD CRUD API to store the appointment
    axios.post('https://crudcrud.com/api/e65264e3b5544c32ba35d1553421f5b2/appointmentData', appointmentData)
      .then(res => {
        console.log(res.data);

        // Refresh the appointments list after booking
        getAppointments();
      })
      .catch(err => console.error(err));
  } else {
    alert('Please fill in all the details.');
  }
}

function getAppointments() {
  // Make a GET request to the CRUD CRUD API to retrieve appointments
  axios.get('https://crudcrud.com/api/e65264e3b5544c32ba35d1553421f5b2/appointmentData')
    .then(res => {
      const appointments = res.data;
      displayAppointments(appointments);
    })
    .catch(err => console.error(err));
}

function displayAppointments(appointments) {
  const appointmentListElement = document.getElementById("appointmentList");
  appointmentListElement.innerHTML = '';

  if (appointments.length === 0) {
    appointmentListElement.innerHTML = 'No appointments scheduled.';
  } else {
    appointments.forEach(appointment => {
      const appointmentCard = document.createElement("div");
      appointmentCard.classList.add("card");
      appointmentCard.innerHTML = `
        <div class="card-header bg-success">
          Appointment
        </div>
        <div class="card-body">
          <p><strong>Name:</strong> ${appointment.name}</p>
          <p><strong>Email:</strong> ${appointment.email}</p>
          <p><strong>Number:</strong> ${appointment.number}</p>
        </div>
      `;
      appointmentListElement.appendChild(appointmentCard);
    });
  }
}

// Initial load of appointments when the page loads
getAppointments();
