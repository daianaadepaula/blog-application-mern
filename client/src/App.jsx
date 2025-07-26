import { BrowserRouter, Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import ShowBlogPage from './Pages/ShowBlogPage';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/create" element={<CreatePage />} />
					<Route path="/blog/:slugId" element={<ShowBlogPage />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App