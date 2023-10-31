import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components/CartContext";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/SideBar';
import Footer from '@/components/Footer';
import { useState } from "react"; 

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;


export default function App({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <div><Toaster/></div>

      <GlobalStyles />
      <CartContextProvider>
        <NextTopLoader/>
        <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
        <Component style={{marginTop: '20px'}} {...pageProps}  />
        <Footer/>
      </CartContextProvider>
    </>
  );
}
