import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {
  const [title, setTitle] = useState('');
  useEffect(()=> {
      (async () => {
        const response = await fetch('http://localhost:5010/api/v1.0.0/');
        const body = await response.json();
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        setTitle(body.express);
      })();
  }, []);
  return (
    <Card className={classes.home}>
      <h1>{title}</h1>
    </Card>
  );
};

export default Home;
