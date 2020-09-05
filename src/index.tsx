import React from 'react'
import { render } from 'react-dom'
import { App } from './component/app'

const here = document.querySelector('div')
const app = <App />

render(app, here)
