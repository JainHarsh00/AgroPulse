
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from '../pages/landingPage.jsx'
import ChatBotUI from '../pages/chatbot.jsx'
import Blogs from '../pages/blogs.jsx'
import ExplorePage from '../pages/explorePage.jsx'
import Marketplace from '../pages/marketplace.jsx'

function App() {

  return (
     <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chatbot" element={<ChatBotUI />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </Router>
  )
}

export default App
