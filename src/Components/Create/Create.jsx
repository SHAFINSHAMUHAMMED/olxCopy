import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import Header from '../Header/Header';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../firebase/config';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const { auth, storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const date = new Date();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      console.log("User is not logged in");
      alert('Please Login')
      return;
    }

    // Validate inputs
    if (name.trim().length < 3) {
      setErrorMessage('Enter Valid Name');
      return;
    }

    if (category.trim() === '') {
      setErrorMessage('Category is required');
      return;
    }

    if (price.trim() === '') {
      setErrorMessage('Price is required');
      return;
    }

    if (!image) {
      setErrorMessage('Please select an image');
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% complete`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Uploaded
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addDoc(collection(firestore, 'products'), {
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          });
          navigate('/');
        });
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            minLength={3}
            required
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            required
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            required
          />
          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ''}
          ></img>

          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            required
          />
          <br />
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
