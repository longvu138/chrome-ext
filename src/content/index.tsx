import React from 'react'
import { createRoot } from 'react-dom/client'
import Content from './Content'
const extension = document.createElement('div')
document.body.append(extension)
const root = createRoot(extension)
root.render(
  <React.StrictMode>
    <Content />
  </React.StrictMode>,
)

export {}

// @ts-ignore
