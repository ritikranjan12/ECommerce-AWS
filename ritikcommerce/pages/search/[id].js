import Center from '@/components/Center';
import NewProducts from '@/components/NewProducts';
import Title from '@/components/Title';
import { AllProductsfromDB, getAllCategory } from '@/db';
import React, { useEffect,useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SearchResults = (props) => {
    const {queries,categories,products} = props;
    const [serachedData,setSearchedData] = useState([]);
    const [serachedCat,setSearchedCat] = useState([]);
    useEffect(() => {
      const lowerCaseQuery = queries.toString().toLowerCase();
      const tokens = lowerCaseQuery.split(/\s+/).map(token => token.replace(/[^\w\s]/g, ''));

      const filtered = products.filter((product) => {
        // You can customize this search logic based on your product structure
        return tokens.some(token => (
            product.title.toLowerCase().includes(token) ||
            product.brand.toLowerCase().includes(token)
          ));
        })
      setSearchedData(filtered);
      const filteredCategory = categories.filter((catItem) => {
        // You can customize this search logic based on your product structure
        return tokens.some(token => (
             catItem.category.toLowerCase().includes(token) ||
        catItem.parentCategory.toLowerCase().includes(token)));
      });
      setSearchedCat(filteredCategory);
    },[categories, products, queries])
    console.log(serachedData);
  return (
    <div>
        <Center> 
            {serachedData.length > 0 ? <NewProducts products={serachedData} title={`Searched Products for ${queries}`} /> || <Skeleton count={15}/> : <Title>Ooops! No Products Found</Title>}
                
                {serachedCat.length > 0 ? serachedCat.map((item) => {
        return <div key={item.id}>
                <NewProducts products={products.filter(p => p.category===item.id)} title={`Category - ${item.category}`} />

        </div>
      }) || <Skeleton count={15}/> : <Title>Ooops! No Category Found</Title>}
            
        </Center>
      
    </div>
  )
}

export async function getServerSideProps(context) {
    const {id} = context.query;
    const categories = await getAllCategory();
    const products = await AllProductsfromDB();

    return {
      props: {
        queries: JSON.parse(JSON.stringify(id)),
        categories: JSON.parse(JSON.stringify(categories)),
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  }

export default SearchResults
