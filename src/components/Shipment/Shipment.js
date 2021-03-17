import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);
const [loggedinUser, setLoggedinUser] = useContext(UserContext)

  console.log(watch("example")); 

  return (
   
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedinUser.name} ref={register({ required: true })} placeholder="Your Name"/>
      {errors.exampleRequired && <span className="error">Name is required</span>}

      <input name="email" defaultValue={loggedinUser.email} ref={register({ required: true })} placeholder="Email"/>
      {errors.exampleRequired && <span className="error">Email is required</span>}

      <input name="adress" ref={register({ required: true })} placeholder="Adress"/>
      {errors.exampleRequired && <span className="error">Adress is required</span>}

      <input name="phone" ref={register({ required: true })} placeholder="Phone number" />
      {errors.exampleRequired && <span className="error">Phone number is required</span>}
      
      <input name="zip" ref={register({ required: true })} placeholder="Zip code"/>
      {errors.exampleRequired && <span className="error">Zip code is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;