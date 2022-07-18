import React, { useEffect, useState } from 'react';
import './UserForm.css';
import { currencyCodeAndRate, packages, premiumBasePrice} from './App';

interface UserFormProps {
    goToFinal: (e: any) => void;
}

export function UserFrom(props: UserFormProps) {
  const [userForm, setUserForm] = useState({
      name: "",
      age: 25,
      country: "3",
      packa: ""
  });

  const [totalPremium, setTotalPremium] = useState(0);

  const [ageError, setAgeError] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<any>) => {
      let value = e.target.value;
      let name = e.target.name;

      if(name === 'age') {
        setAgeError(parseInt(value) > 100 ? "Age Can't be more then 100" : '')
      } 

      setUserForm((preValue) => {
          return {
              ...preValue,
              [name]: value
          }
      })
  }

  useEffect(() => {
    console.log(userForm)
    let amount: any = premiumBasePrice * userForm?.age * parseInt(userForm.country);
    if(userForm.packa != "0") {
       setTotalPremium(amount + (amount % parseInt(userForm.packa)))
    } else {
       setTotalPremium(amount)
    }
  }, [userForm])

  const submitForm = (e: any) => {
      e.preventDefault();
      if(userForm.name && userForm.age && userForm.country && userForm.packa) {
        setErrorMessage("");
        props.goToFinal({
            ...userForm, 
            countryName: currencyCodeAndRate.find((o: any) => o.rate == userForm.country)?.name,
            countryCode: currencyCodeAndRate.find((o: any) => o.rate == userForm.country)?.code,
            packageName: packages.find((o: any) => o.premiumPercentageOnBase == userForm.packa)?.name,
            totalPremium: totalPremium
        })
      } else {
          setErrorMessage("Please Fill All the fields")
      }
  }
  


  return (<div className='UserForm'>
    <h1>Tell us about yourself</h1>
    <form>
      <div className='form-control'>
        <label>Name</label>
        <input type="text" name="name" value={userForm.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
      </div>
      <div className='form-control'>
        <label>Age</label>
        <input type="number" name="age" value={userForm.age} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
        <div className='errorMessage'>{ageError}</div>
      </div>
      <div className='form-control'>
        <label>Where do you live</label>
        <select name="country" id="country" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)} >
          {currencyCodeAndRate.map((country) => {
            return <option value={country.rate} >{country.name}</option>;
          })}
        </select>
      </div>

      <div className='form-control'>
        {
            packages.map((pack: any) => {
                return <div><input type="radio" id={pack.name} name="packa" value={pack.premiumPercentageOnBase} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}/>
                <label >{pack.name}</label>
                </div>
            })
        }
      </div>
      <h1>Your premium is: {totalPremium}{currencyCodeAndRate.find((o: any) => o.rate == userForm.country)?.code} </h1>
      <div className='errorMessage'>{errorMessage}</div>
      <div>
          <button className='button' onClick={(e) => submitForm(e)} >Next</button>
      </div>
    </form>
    

  </div>);
}
