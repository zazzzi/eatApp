import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import {db} from './firebase'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import Hero from "./components/hero/Hero"
import Login from "./components/login/Login"
import RestaurantMenu from "./components/restaurantMenu/Menu"
import Cart from './components/cart/Cart';
import CreateUser from './components/login/CreateUser';
import Checkout from './components/checkout/Checkout';

 
function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="/menu" element={<RestaurantMenu/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </Router>
    );
}

export default App;


 /* const [newName, setNewName] = useState<string>("")
  const [newNumber, setNewNumber] = useState<any>(0)
  const [users, setUsers] = useState<any>([]);
  const usersCollectionRef = collection(db, 'users') */

  //adds to database
 /*  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, phone: Number(newNumber)})
  }

  const deleteUser = async (id: any) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)

  }

  const updateUser = async (id: any, number: any) => {
    const userDoc = doc(db, "users", id)
    const newFields = {phone: number + 1}
    await updateDoc(userDoc, newFields) }*/
  

  // // fetches all database. THIS FUCKS UP THE READCALLS?!?!?!?
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  //   }
  //   getUsers()
  // }, [users])

//   useEffect(() => {
//     const sayHello = async () => {
//       const response = await fetch("/api/hello");
//       const body = await response.json();
//       console.log(body);
//     };
//     sayHello();
// }, []);


    // test code for testing the Firebase setup. 
    // <div >
    //   <input placeholder="Name" onChange={(event) => {
    //     setNewName(event.target.value)
    //   }}/>
    //   <input type="number" placeholder="Number" onChange={(event) => {
    //     setNewNumber(event.target.value)
    //   }}/>
    //   <button onClick={createUser}>Create User</button>
    //   {
    //     users.map((user: any) => 
    //       <div>
    //         {user.name + " " + user.phone}
    //         <button onClick={() => {updateUser(user.id, user.phone)}}>increase number</button>
    //         <button onClick={() => {deleteUser(user.id)}}>delete</button>
    //       </div>
          
    //     ) 
    //   }
    // </div>