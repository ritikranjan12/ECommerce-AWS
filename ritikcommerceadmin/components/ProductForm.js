import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm() {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [specification,setSpecification] = useState('')
  const [Category, setCategory] = useState('');
  const [Featured,setFeatured] = useState(false);
  const [productProperties, setProductProperties] = useState([]);
  const [Price, setPrice] = useState('');
  const [Brand,setBrand] = useState('')
  const [Images, setImages] = useState([]);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [discount,setDiscount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    })
    }, []);
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title:Title,
      description: Description,
      price:Price,
      images: Images,
      category: Category,
      properties: productProperties,
      specification: specification,
      brand:Brand,
      featured:Featured,
      discount:discount
    };
    await axios.post('/api/products', data);
    
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/products');
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages(oldImages => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  function updateImagesOrder(Images) {
    setImages(Images);
  }
  function setProductProp(propName, value) {
    setProductProperties(prev => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && Category) {
    let catInfo = [];
    categories.forEach((item) => {
      if (item.id === Category) {
        catInfo.push({ id: item.id, name: item.name, parentCategory: item.parentCategory, properties: item.properties });
      }
    });
    catInfo.forEach((CategoryInfo) => {
      propertiesToFill.push(...CategoryInfo.properties);
    });
    while(catInfo?.parent?.id) {
      const parentCat = categories.find(({id}) => id === catInfo?.parent?.id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={Title}
        onChange={ev => setTitle(ev.target.value)} />
      <label>Category</label>
      <select value={Category}
        onChange={ev => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 && categories.map(c => (
          <option key={c.id} value={c.id}>{c.category}</option>
        ))}
      </select>
      {propertiesToFill.length > 0 && propertiesToFill.map(p => (
        <div key={p.name} className="">
          <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
          <div>
            <select value={productProperties[p.name]}
              onChange={ev =>
                setProductProp(p.name, ev.target.value)
              }
            >
              {p.values.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <label>
        Photos
      </label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={Images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}>
          {!!Images?.length && Images.map(link => (
            <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
              <img src={link} alt="" className="rounded-lg" />
            </div>
          ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div>
            Add image
          </div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
      <label>Brand</label>
      <textarea
        placeholder="Brand"
        value={Brand}
        onChange={ev => setBrand(ev.target.value)}
      />
      <label>Discount</label>
      <input
      type="number"
        placeholder="Discount"
        value={discount}
        onChange={ev => setDiscount(ev.target.value)}
      />
      <label>Featured</label>
      
      <input
        type="checkbox"
        checked={Featured}
        onChange={ev => setFeatured(!Featured)}
      />
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={Description}
        onChange={ev => setDescription(ev.target.value)}
      />
      <label>Specification</label>
      <textarea
        placeholder="specification"
        value={specification}
        onChange={ev => setSpecification(ev.target.value)}
      />
      <label>Price (in Rs)</label>
      <input
        type="number" placeholder="Price"
        value={Price}
        onChange={ev => setPrice(ev.target.value)}
      />
      <button
        type="submit"
        className="btn-primary">
        Save
      </button>
    </form>
  );
}
