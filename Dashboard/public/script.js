
function getHumidity() {
  fetch('/getHumidity') 
    .then(response => response.json())
    .then(data => {
      document.getElementById('humidity').textContent = `Humidity: ${data.humidity}%`;
    })
    .catch(error => console.error('Error:', error));
}


function generateRandomFloat() {
  return (Math.random() * 100).toFixed(2);
}


function updateHumidity() {

  fetch('/deleteHumidity', {
    method: 'DELETE',
  })
    .then(() => {
      const newHumidity = generateRandomFloat();


      fetch(`/updateHumidity/${newHumidity}`, {
        method: 'POST',
      })
        .then(() => {
          console.log(`Humidity updated to ${newHumidity}`);
          getHumidity();
        })
        .catch(error => console.error('Error updating humidity:', error));
    })
    .catch(error => console.error('Error deleting humidity:', error));
}


//--------------------------------------------------------------------------------------------------------


function getAcidity() {
  fetch('/getAcidity') 
    .then(response => response.json())
    .then(data => {
      document.getElementById('acidity').textContent = `Soil Acidity (pH): ${data.acidity}`;
    })
    .catch(error => console.error('Error:', error));
}


function updateAcidity() {
  fetch('/deleteAcidity', {
    method: 'DELETE',
  })
    .then(() => {
      const newAcidity = generateRandomAcidity();

      fetch(`/updateAcidity/${newAcidity}`, {
        method: 'POST',
      })
        .then(() => {
          console.log(`Soil Acidity updated to ${newAcidity}`);
          getAcidity();
        })
        .catch(error => console.error('Error updating acidity:', error));
    })
    .catch(error => console.error('Error deleting acidity:', error));
}

function startUpdating() {
  updateHumidity();
  updateAcidity();
  setInterval(() => {
    updateHumidity();
    updateAcidity();
  }, 10000); 
}

function generateRandomAcidity() {
  return (Math.random() * 14).toFixed(2);
}

startUpdating();