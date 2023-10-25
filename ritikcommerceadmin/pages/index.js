import Layout from "@/components/Layout";
import {useSession} from "next-auth/react";
import Link from 'next/link'

export default function Home() {
  const {data: session} = useSession();
   
  return <Layout>
    <>
    <div className="text-blue-900 flex justify-between pt-2.5 border-b-4 border-b-blue-500 pb-4">
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex  gap-1 text-black rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="" className="w-6 h-6 rounded-full mx-1.5"/>
        <span className="px-2">
          {session?.user?.name}
        </span>
      </div>
    </div>
    <div className="block text-center lg:flex lg:items-center lg:justify-between lg:my-2">
      <Link href={"/products"} >
      <div className="p-4 my-12  mb-4 border-1 border-gray-400 rounded-full w-36 h-36 shadow-2xl shadow-red-700 mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 my-3 text-black mx-auto">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>

          <span>Total Products</span>
          </div>
      </Link>
      <Link href={"/products"} >
      <div className="p-4 my-12  mb-4 border-1 border-gray-400 rounded-full w-36 h-36 shadow-2xl shadow-green-700 mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 my-2 text-black mx-auto">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>

          <span>Total Categories</span></div>
                </Link>
                <Link href={"/products"} >
      <div className="p-4 my-12  mb-4 border-1 border-gray-400 rounded-full w-36 h-36 shadow-2xl shadow-green-700 mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 my-3 text-black mx-auto">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>

          <span>Total Orders</span>
          </div>
      </Link>
      
      
    </div>
    
    </>

  </Layout>
}
