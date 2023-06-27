import React,{useEffect,useContext,useState} from 'react';
import { FirebaseContext } from '../../store/Context';
import {useNavigate} from 'react-router-dom'
import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/config';
import { PostContext } from '../../store/PostContext';

function Posts() {
  const { auth } = useContext(FirebaseContext);
  const [products, setProducts] = useState([])
  const navigate=useNavigate()
  const {setPostDetails} = useContext(PostContext)

  useEffect(() => {
   getDocs(collection(firestore,'products')).then((snapshot)=>{
    const allPost = snapshot.docs.map((product)=>{
      return {
        ...product.data(), //in this product have many data so we need to take only product details so we use data() function for it
        id:product.id
      }
    })
    setProducts(allPost)
   })
  }, [])
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {
          products.map(product=>{
            
           return(
            <div onClick={()=>{
              setPostDetails(product)
              navigate('/view')
            }}
            className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          )
          })
         
        }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
