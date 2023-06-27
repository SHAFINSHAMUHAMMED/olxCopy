import React,{useEffect,useState,useContext} from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/config';
function View() {
const [userDetails, setUserDetails] = useState()
const {postDetails} = useContext(PostContext)
const { auth } = useContext(FirebaseContext);

useEffect(() => {
  const {userId} = postDetails
 const getUserDetails = async ()=>{
  const q = query(collection(firestore,'users'),where('id', '==', userId))
  const Snapshot = await getDocs(q)
  Snapshot.forEach(doc=>{
    setUserDetails(doc.data())
  })
 }
 getUserDetails()
},[] );


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;Price : {postDetails.price} </p>
          <span>Name : {postDetails.name}</span>
          <p>Category : {postDetails.category}</p>
          <span>Post Date : {postDetails.createdAt}</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>Owner Name : {userDetails.username}</p>
          <p>Contact : {userDetails.phone}</p>
        </div> }
      </div>
    </div>
  );
}
export default View;
