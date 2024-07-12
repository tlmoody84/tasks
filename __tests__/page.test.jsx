// ManagementPage.test.js
import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Page from "../src/app/page"
// import HomePage from '@/app/Page'


describe('Page', () => {
    it('renders a heading', () => {
      render(<Page />)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
    })
  })
  describe('Page', () => {
  it ("renders a list", ()=>{
      render(<Page/>)
      const list = screen.getAllByRole("list");
  })
   })
  describe('Page', () => {
  it ("renders a list", ()=>{
      render(<Page/>)
      const list = screen.getAllByRole("list");
  })
  })
  
  
  
  
  
  
  
  
  
  
  
  
  