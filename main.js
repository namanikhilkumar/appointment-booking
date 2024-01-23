function register() {
    const name = document.getElementById('signupName').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
  
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, password }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }
  
  function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.message === 'Login successful') {
          showBookingForm();
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(error => console.error(error));
  }
  
  function showBookingForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('booking-form').style.display = 'block';
    populateTimings();
  }
  
  function populateTimings() {
    fetch('/slots')
      .then(response => response.json())
      .then(data => {
        const timingsList = document.getElementById('slots-list');
        data.slots.forEach(timing => {
          const li = document.createElement('li');
          li.textContent = timing;
          timingsList.appendChild(li);
        });
      })
      .catch(error => console.error(error));
  }
  
  function bookSlot() {
    const selectedSlot = prompt('Enter the selected slot:');
    if (selectedSlot) {
      confirmBooking(selectedSlot);
    }
  }
  
  function confirmBooking(selectedSlot) {
    const username = document.getElementById('loginUsername').value;
  
    fetch('/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, slot: selectedSlot }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        show
  