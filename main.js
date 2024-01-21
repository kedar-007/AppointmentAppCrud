
function validation(){
  const form = document.querySelector('form');
  form.addEventListener('Submit',e =>{
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
  const time = document.getElementById("time").value;
  if (name && email && number && time) {
    const appointmentData = {
      name: name,
      email: email,
      number: number,
      time:time
    };

    // Make a POST request to the CRUD CRUD API to store the appointment
    axios.post('https://crudcrud.com/api/0f5dc5b7cf2845ff97f8c7bae46b2ae7/appointmentData', appointmentData)
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
  axios.get('https://crudcrud.com/api/0f5dc5b7cf2845ff97f8c7bae46b2ae7/appointmentData')
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
          <p><strong>Date and Time:</strong> ${appointment.time}</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-danger float-md" onclick="deleteAppointment('${appointment._id}')">X</buttion>
          <i class="fas fa-trash-alt"></i>
        </div>

      `;
      appointmentListElement.appendChild(appointmentCard);
    });
  }
}
 function deleteAppointment(appointment_id){
  // making delete request
  axios.delete(`https://crudcrud.com/api/0f5dc5b7cf2845ff97f8c7bae46b2ae7/appointmentData/${appointment_id}`)
  .then(res =>{
    console.log(res);
    getAppointments();
  })
  .catch(err =>console.log(err));


 }

getAppointments();
