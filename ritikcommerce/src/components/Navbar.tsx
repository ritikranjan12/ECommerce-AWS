'use client';
import React from 'react'
import Image from 'next/image';
import { Button, Navbar } from 'flowbite-react';

const NavbarComponent = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <Image width={36} height={18} src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">NazCommerce</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button className="hidden md:block">Sign In / Sign Up</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" >
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Category</Navbar.Link>
        <Button className='block md:hidden'>Sign In / Sign Up</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent
