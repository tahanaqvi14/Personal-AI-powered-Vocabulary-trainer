import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './index.css'
import Viewwords from './Viewwords.jsx'
import App from './App.jsx'
import Quiz from './Quiz.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/Viewwords' element={<Viewwords />} />
      <Route path='/Quiz' element={<Quiz />} />

    </Routes>


  </Router>
  // <Viewwords/>
)
