import Center from '@/components/Center';
import NewProducts from '@/components/NewProducts';
import { AllProductsfromDB, getAllCategory } from '@/db';
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const category = ({categories,products}) => {
  return (
    <div>
     <Center>
      {categories.map((item) => {
        return <div key={item.id}>

            <NewProducts products={products.filter(p => p.category===item.id)} title={item.category} />

        </div>
      }) || <Skeleton count={15}/>}
      </Center>
    </div>
  )
}
export async function getServerSideProps() {
   
    const categories = await getAllCategory();
    const products = await AllProductsfromDB();
    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  }
export default category
