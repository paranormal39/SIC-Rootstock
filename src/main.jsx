import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThirdwebProvider
  } from "@thirdweb-dev/react";

  import { RootstockTestnet } from "@thirdweb-dev/chains";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThirdwebProvider 
    activeChain={RootstockTestnet}
    clientId="c15d986d453b0d57a9f7b540afc6daa9">
    <App />
    </ThirdwebProvider>
  </React.StrictMode>,
)
