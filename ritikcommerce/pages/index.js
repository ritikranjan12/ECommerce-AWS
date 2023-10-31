import Header from "@/components/Header";
import {AllFeaturedProductsfromDB,newProductsfromDB} from '../db'
import NewProducts from "@/components/NewProducts";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import NewsLetter from "@/components/NewsLetter";

export default function HomePage({featuredProduct,newProducts}) {
  return (
    <div >
      <Header />
      {<NewProducts products={featuredProduct} title={'Featured Products'} /> || <Skeleton count={5} />}

      {<NewProducts products={newProducts} title={"New Arrivals"} /> || <Skeleton count={5} />}
      <NewsLetter/>
    </div>
  );
}

export async function getServerSideProps() {
   
  const featuredProduct = await AllFeaturedProductsfromDB();
  const newProducts = await newProductsfromDB()
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}