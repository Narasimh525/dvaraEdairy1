import logo from '../logo.svg';
import './App.css';
import React, { Component ,useEffect, useState, Fragment } from 'react';
import Tabletop from "tabletop";
import { Grid, Icon, Form, Button, Table, Input } from 'semantic-ui-react';
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
            <a style={{marginLeft:"10%"}} href={data[item].Link} target="_blank"><Button primary icon>{data[item].Title}   <Icon name='send' /> </Button></a>
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

// export default App;
