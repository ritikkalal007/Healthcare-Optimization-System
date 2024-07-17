const form = document.getElementById('patient-form');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const appointmentType = document.getElementById('appointment-type').value;
  const preferredDate = document.getElementById('preferred-date').value;
  const enableRecording = document.getElementById('recording').checked;
  const notes = document.getElementById('notes').value;

  // Simple form validation (optional)
  if (!name) {
    resultsDiv.textContent = 'Please enter your name.';
    return;
  }

  if (!preferredDate) {
    resultsDiv.textContent = 'Please select a preferred date.';
    return;
  }

  // Prepare user data
  const userData = {
    name: name,
    appointmentType: appointmentType,
    preferredDate: preferredDate,
    recording: enableRecording,
    notes: notes,
  };

  // Simulate sending data to backend (replace with actual fetch)
  try {
    const response = await fetch('/submit-appointment', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    resultsDiv.textContent = data.message;
    resultsDiv.classList.remove('error', 'success'); // Clear previous classes
    if (data.success) {
      resultsDiv.classList.add('success');
    } else {
      resultsDiv.classList.add('error');
    }

  } catch (error) {
    console.error('Error submitting data:', error);
    resultsDiv.textContent = 'An error occurred. Please try again.';
    resultsDiv.classList.add('error');
  }
});
