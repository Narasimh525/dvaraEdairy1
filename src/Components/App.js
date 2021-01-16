import logo from '../logo.svg';
import './App.css';
import React, { Component ,useEffect, useState, Fragment } from 'react';
import Tabletop from "tabletop";
import { Grid, Icon, Form, Button, Table, Input } from 'semantic-ui-react';
import downloadCsv from 'download-csv';

import TopHeader from './TopHeader';
export default function App() {

    const [data, setData]=useState([]);

    useEffect(() => {
      Tabletop.init({
        key: "1tA9ol6gXAp9mVC7HfWbbbba94-hpAcnlbXMoQDZ4h_c",
        simpleSheet: true
      })
        .then((data) => setData(data))
        .catch((err) => console.warn(err));
    }, [])
    
    var links= Object.keys(data).map(item=>
        <Grid.Row centered columns = {2}  relaxed = "very" stackable  >
              
          <Grid.Column >
          <Input iconPosition='left' style={{width:"100%"}}>
            <Icon name='globe' />
            <input disabled value={data[item].Link}/>
          </Input>
          </Grid.Column>
          <Grid.Column>
            <a style={{marginLeft:"10%"}} href={data[item].Link} target="_blank"><Button style={{width:"23%"}} primary icon>{data[item].Title}   <Icon name='send' /> </Button></a>
            <Button style={{width:"23%"}} onClick={async()=>{await downloadAllData()}} color='facebook' disabled={data[item].Title!="IffcoTokio"?true:false} icon>All Data </Button>
            <Button style={{width:"23%"}} onClick={async()=>{await downloadDailyCount();}} color='vk' disabled={data[item].Title!="IffcoTokio"?true:false} icon>Daily Count </Button>
          </Grid.Column>
        </Grid.Row >
      )
    return(
      <Grid padded className = "app-home">
        <TopHeader />
        {/* <Form> */}
          {links}
        {/* </Form> */}
           
      </Grid>
    )
  }
  async function downloadDailyCount(){
    var sd;
    await fetch("https://edairy-backend.herokuapp.com/iffcotokioxl?type=daily",{
      method:'POST',
    })
    .then(res=>res.json())
    .then(data=>{
      sd = data['one'];
        const columns = { date: 'Date', count: 'Count' };
         
        downloadCsv(sd, columns,"IffcoTokio_Daily_Count.csv");
    })
  }
  function downloadAllData(){
    var sd;
    fetch("https://edairy-backend.herokuapp.com/iffcotokioxl?type=all",{
      method:'post',
    })
    .then(res=>res.json())
    .then(data=>{
        sd = data['one'];
        const columns = { cattleId: 'CattleId', rfid: 'RFID', farmerID:'farmerID', farmerMobileNumber : 'farmerMobileNumber' , farmerName: 'Farmer Name' , village: 'Village' , agentMobileNo: 'Agent mobile Number' , agentName: 'Agent Name', muzzle0: 'Front View ' , muzzle1: 'muzzle1' , muzzle2: 'muzzle2' , muzzle3: 'muzzle3' , leftSideView: 'Left Side View' , backsideView: 'Backside View' , rightSideView: 'Right Side View' , gps: 'GPS' , timeStamp: 'Time Stamp'};
        downloadCsv(sd, columns,"IffcoTokio_data.csv");
    })
  }
// export default App;
