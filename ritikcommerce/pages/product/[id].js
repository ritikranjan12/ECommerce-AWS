import Center from "@/components/Center";
import Title from "@/components/Title";
import styled from "styled-components";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { AllProductsfromDB, DetailedProducts, getReviews, postReview } from "@/db";
import ProductsGrid from "@/components/ProductsGrid";
import toast from "react-hot-toast";
import Testimonial from "@/components/Testimonial";
import Input from "@/components/Input";
import axios from "axios";


const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 20px 20px 20px;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;


export default function ProductPage(props) {
  const [name,setName] = useState('')
  const [review,setReview] = useState('')
  const { addProduct, cartProducts, removeProduct } = useContext(CartContext);
  const product = props.product
  const allproduct = props.products
  const testimonials = props.testimonial
  const [products, setProducts] = useState()
  const keyArray = Object.keys(product.properties);
  const [inCart, setInCart] = useState(false);
  const [desc, setDesc] = useState();
  const [spec, setSpec] = useState();
  function addLineBreak(text) {

    const lines = text.split(".");
    const html = lines.map((line) => (
      <div key={line} style={{ font: 'caption', fontFamily: 'monospace', fontWeight: 'bold', margin: '20px' }}>
        • {line}
      </div>
    ));
    return html;
  };

  useEffect(() => {
    setProducts(allproduct.filter(item => item.category === product.category && item.title !== product.title))
    if (cartProducts.length > 0) {
      // console.log(product.id);
      const cartItem = cartProducts.filter(item => item.id === product.id.toString());
      // console.log(cartItem);
      if (cartItem) {
        setInCart(true);
      } else setInCart(false);
    } else setInCart(false);
    const updatedDesc = addLineBreak(product.description)
    const updatedSpec = addLineBreak(product.specification)
    setDesc(updatedDesc)
    setSpec(updatedSpec)
  }, [allproduct, product, cartProducts])
  const [showSpec, setShowSpec] = useState(false)
  const handleClickSpec = () => {
    setShowSpec(!showSpec)
  }
 const SubmitReview = async () => {
  'use server'
    if(name=== '' || review === '') {
      toast.error("All fields are Required")
      return
    }
    const data = {
      pId: product.id,
      text: review,
      author:name
    }
    await axios.post('/api/review', data)
    toast.success("Review Submitted !")
    setName('')
    setReview('')
    
 }
  return (
    <>

      <ColWrapper>
        <div className="flex flex-row">
          <ProductImages images={product.images} />
        </div>

        <div>
          <small style={{ color: 'green' }}>{product.brand}</small>
          <Title>{product.title}</Title>
          <PriceRow>
            <div style={{ backgroundColor: 'yellow', color: 'black', padding: '4px', borderRadius: '10px' }}>save up to {product.discount}%</div>
            <div style={{ fontWeight: 'bolder' }}>
              <Price>₹{product.price * (100 - product.discount) / 100} </Price>
              <strike style={{ fontSize: '1.4rem' }}>₹{product.price} </strike>
            </div>
            <div>
              {inCart ? <Button added outline onClick={() => {
                toast.success("Removed from Cart")
                removeProduct(product.id)
              }}><CartIcon />Remove from cart</Button> :
                <Button primary outlined css onClick={() => {
                  addProduct(product.id)
                  toast.success("Added in Cart")
                }}>

                  <CartIcon /><span>Add to cart</span></Button>}


            </div>
          </PriceRow>
          {keyArray.map((item) => {
            return <p style={{ fontFamily: 'monospace', fontWeight: 'bolder', color: 'red', margin: '20px', fontSize: '17px' }} key={item}>•
              {' ' + item} : {product.properties[item]}</p>
          })}
          <Title>Description</Title>
          <div>{desc}</div>
          <div style={{ display: 'flex' }}>
            <Title>Specifications</Title>
            <span style={{ color: 'blue', cursor: 'pointer', marginTop: '3.37vh', marginLeft: '10px', fontSize: '15px', textDecoration: 'underline' }} onClick={handleClickSpec}>{showSpec === true ? 'Hide' : 'Show'}</span>
          </div>
          <div>{showSpec && spec}</div>


        </div>
      </ColWrapper>
      <Center>

        <Title>Related Products</Title>
        {products === undefined ? <ProductsGrid products={products} /> : <p>Oops! Nothing Similar Found</p>}
        <ProductsGrid products={products} />
        <Title>Reviews and Feedback</Title>
        <Testimonial testimonials={testimonials.filter(item => item.pId === product.id)} />
        <Box>
        <h2>Give Reviews</h2>
        <Input type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={ev => setName(ev.target.value)} />
                  <Input type="textarea"
                  placeholder="Review"
                  value={review}
                  name="review"
                  onChange={ev => setReview(ev.target.value)} />
                  <Button black half onClick={SubmitReview}>
                  Submit
                </Button>
        </Box>
      </Center>
    </>
  );
}


export async function getServerSideProps(context) {
  const { id } = context.query;

  const product = await DetailedProducts(id);
  const products = await AllProductsfromDB();
  const testimonials = await getReviews();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      products: JSON.parse(JSON.stringify(products)),
      testimonial: JSON.parse(JSON.stringify(testimonials)),
    }
  }
}