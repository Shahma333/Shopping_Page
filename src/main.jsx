
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './provider/cartprovider.jsx'
import { Toaster } from 'react-hot-toast';


const root = createRoot(document.getElementById('root'))
root.render(
   <CartProvider>
      <App>
      </App>
      <Toaster position='top-right'></Toaster>
   </CartProvider>
)
