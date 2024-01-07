const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();


const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'humidity_monitor'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.use(express.static(path.join(__dirname, 'public')));


app.get('/getHumidity', (req, res) => {
  connection.query('CALL GetHumidity()', (error, results) => {
    if (error) {
      console.error('Error fetching humidity:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const humidity = results[0][0].humidity;
    res.json({ humidity });
  });
});


app.post('/updateHumidity/:value', (req, res) => {
  const newHumidity = req.params.value;
  connection.query('CALL UpdateHumidity(?)', [newHumidity], (error) => {
    if (error) {
      console.error('Error updating humidity:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Humidity updated successfully' });
  });
});


app.delete('/deleteHumidity', (req, res) => {
  connection.query('CALL DeleteHumidity()', (error) => {
    if (error) {
      console.error('Error deleting humidity:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Humidity data deleted successfully' });
  });
});

//---------------------------------------------------------------------------------

app.get('/getAcidity', (req, res) => {
  connection.query('CALL GetAcidity()', (error, results) => {
    if (error) {
      console.error('Error fetching acidity:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const acidity = results[0][0].acidity;
    res.json({ acidity });
  });
});


app.post('/updateAcidity/:value', (req, res) => {
  const newAcidity = req.params.value;
  connection.query('CALL UpdateAcidity(?)', [newAcidity], (error) => {
    if (error) {
      console.error('Error updating acidity:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Soil Acidity updated successfully' });
  });
});


app.delete('/deleteAcidity', (req, res) => {
  connection.query('CALL DeleteAcidity()', (error) => {
    if (error) {
      console.error('Error deleting acidity:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Soil Acidity data deleted successfully' });
  });
});

//--------------------------------------------------------------------------------

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
