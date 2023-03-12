import logo from './logo.svg';
import './App.css';
import img from './img/img1.gif'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { render } from '@testing-library/react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Countdown from 'react-countdown';
import { sendMessageToLine } from './api.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([
    { image: img, machineName: 'เครื่องที่ 1',time: 25, price: 30, status: 1 },
    { image: img, machineName: 'เครื่องที่ 2',time: 25, price: 20, status: 2 },
    { image: img, machineName: 'เครื่องที่ 3',time: 25, price: 40, status: 1 }
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [date]);

  const [sum,setSum] = useState(10)

  const handleSubmit = (price, index) => {
    console.log(`Price : ${price}`)
    console.log(`Sum : ${sum}`)
    setSum(sum + 10)
    if (sum >= price) {
      setSum(0)
      const newData = data.map((item, i) => {
        if (i === index) {
          return { ...item, status: 2 }
        }
        return item
      })
      setData(newData)
      console.log(`Pass`);
      toast.success('Pass', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      sendMessageToLine('Hello, Line user!')
    } else {
      console.log(`Not Pass`);
      toast.error(`ขาดอีก ${price - sum} บาท`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6"
            component="div" sx={{ flexGrow: 1 }}>
            {date.toLocaleString()}
          </Typography>
        </Toolbar>
      </AppBar>
      <ToastContainer />
      <header className="App-header">
        <Box sx={{ flexGrow: 1 }}>
          {data.map((item, index) => (
            <Grid container spacing={2} columns={16}>
              <Grid item xs={8}>
                <Item><img src={item.image} alt={item.label} /></Item>
              </Grid>
              <Grid item xs={8}>
                <Item>{item.status == 1 ? (
                  <div>
                    <Item><label>{item.machineName} : ว่าง</label></Item>
                    <Item><label>ราคา : {item.price}</label></Item>
                    <Item><label>ระยะ : {item.time} นาที</label></Item>
                    <br></br>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={8}>
                        <Item><label>เหรียญ 10</label></Item>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <button onClick={() => { handleSubmit(item.price, index)}}>PUT COIN</button>
                      </Grid>
                    </Grid>
                  </div>
                ) : (
                  <div>
                    <label>{item.machineName} : กำลังใช้งาน</label>
                    <Item><label>ราคา : {item.price}</label></Item>
                    <Item><label>ระยะ : <Countdown date={Date.now() + 10000} /> นาที</label></Item>
                  </div>
                )}</Item>

              </Grid>
            </Grid>
          ))}
        </Box>

      </header>
    </div>
  );
}

export default App;
