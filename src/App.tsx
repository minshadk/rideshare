import { BrowserRouter, Routes, Route } from "react-router-dom";

// import AllMessages from "./pages/AllMessages/AllMessages";
import SingleMessage from "./pages/SingleMessage/SingleMessage";

import { registerSW } from "virtual:pwa-register";
function App() {
  if ("serviceWorker" in navigator) {
    registerSW();
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<SingleMessage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
