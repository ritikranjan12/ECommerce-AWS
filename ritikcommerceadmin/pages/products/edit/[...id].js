import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import EditForm from "@/components/EditForm";

export default function EditProductPage() {
  const [title,setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState();
  const [images, setImages] = useState([]);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/products?id='+id).then(response => {
      console.log(response.data)
      setCategory(response.data.category)
      setDescription(response.data.description)
      setImages(response.data.images)
      setPrice(response.data.price)
      setProperties(response.data.properties)
      setTitle(response.data.title)
    });
  }, [id]);
  
  return (
    <Layout>
      <h1>Edit product</h1>
      {title != '' && (
        <EditForm id={id} title={title} description={description} category={category} images={images} properties={properties} price={price}/>
      )}
    </Layout>
  );
}