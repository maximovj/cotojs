import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><a href="/" className="underline">Home</a></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
