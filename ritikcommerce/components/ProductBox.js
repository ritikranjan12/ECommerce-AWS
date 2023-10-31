import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import {useContext, useEffect,useState} from "react";
import {CartContext} from "@/components/CartContext";
import toast from "react-hot-toast";

const ProductWrapper = styled.div`
  
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

export default function ProductBox({id,title,description,price,images,featured,discount}) {
  const {addProduct,cartProducts,removeProduct} = useContext(CartContext);
  const [inCart,setInCart] = useState(false);
  
  const url = '/product/'+id;
  useEffect(() => {
    if (cartProducts.length > 0) {
      // console.log(cartProducts);
      const cartItem = cartProducts.filter(item => item.id === id.toString());
      // console.log(cartItem);
      if(cartItem){
        setInCart(true);
      } else setInCart(false);
    } else setInCart(false);
  },[cartProducts, id]);
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt=""/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        {!featured ? <Title href={url}>{title}</Title> : ''}
        <PriceRow>
              <div style={{fontWeight:'normal', color:'red'}}>
              {featured ? <div style={{fontSize: '14px', marginLeft:'35px'}} >Save up to {discount}%</div>: <Price><div>₹ {price}</div> </Price>} 
                
              </div>
              {!featured ? 
              <div>
              {inCart ? <Button added outline onClick={() => {
                toast.success("Removed from Cart")
                removeProduct(id)
              }}><CartIcon />Remove from cart</Button> :
                <Button primary outlined css onClick={() => {
                  addProduct(id)
                  toast.success("Added in Cart")}}>
                  
                  <CartIcon /><span>Add to cart</span></Button>}
                  
                
              </div> : ''}
            </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}