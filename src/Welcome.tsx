import React from 'react';
import './WelcomePage.css';

interface WelcomeProps {
    moveToStepOne: () => any;
}

export function Welcome(props: WelcomeProps) {
  return (
    <div className='WelcomePage'>
      <h2>Hello There!</h2>
      <p>Let's buy some insurance. It is going to take only a few steps.</p>
      <button className='button' onClick={props.moveToStepOne}>Submit</button>
    </div>
  );
}
