"use client";

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #3498db;
    --secondary: #2ecc71;
    --danger: #e74c3c;
    --warning: #f39c12;
    --dark: #2c3e50;
    --light: #ecf0f1;
    --sidebar-width: 250px;
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f6f8fa;
    color: #333;
    line-height: 1.6;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  button, input, select {
    font-family: inherit;
  }
`;
