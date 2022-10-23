import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Start, onMoney, onMotor, onCar} from './matter/Animator';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        {/*<Grid container spacing={1}>
        <Grid item xs={4}>
            <TextField
              id="moneyText"
              label="Amount of money"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue='100'
            />
          </Grid>
          <Grid item alignItems={'center'} xs={4}>
            
          </Grid>
        </Grid>*/}
    <Grid container
    spacing={2}
    spacin>
      <Grid item>
        <img src='./emojis/motor.png' height='33' onClick={onMotor}></img>
      </Grid>
      <Grid item>
        <Button
          style={{
            backgroundColor: '#00B9ff',
            color:'#000000',
            fontWeight:'bold',
            width: 321
          }}
          onClick={onMoney}> 
            Add Money
        </Button>
      </Grid>
      <Grid item>
        <img src='./emojis/car.png' height='33' onClick={onCar}></img>
      </Grid>
    </Grid>
    <div onLoad={Start()}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
