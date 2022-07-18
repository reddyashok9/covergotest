import React from 'react';
import './FinalStep.css';

interface FinalProps {
    userData: any;
    moveToStepOne: (e: any) => void;
}

export const FinalStep = (props: FinalProps) => {

  return (
    <div className='FinalStep'>
        <h1>Summary</h1>
                Name: {props.userData.name} <br/>
                Age: {props.userData.age} <br/>
                Where do you live: {props.userData.countryName}<br/>
                Package Selected: {props.userData.packageName}<br/>
                <h2>Tota Premium: {props.userData.totalPremium}{props.userData.countryCode}</h2>

                <button className='buttonBack' onClick={() => {props.moveToStepOne(2)}}>Back</button>
                <button className='button' onClick={() => {props.moveToStepOne(1)}}>Buy</button>
        </div>
  );

};
