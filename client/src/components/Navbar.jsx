import { useState, useEffect } from "react"
import { Link, NavLink, useNavigate, useLocation } from "react-router"

const Navbar = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [searchTerm, setSearchTerm] = useState("")

	useEffect(() => {
		const params = new URLSearchParams(location.search)
		setSearchTerm(params.get("q") || "")
	}, [location.search])

	const handleSearch = (e) => {
		e.preventDefault()
		navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`)
	}

	return (
		<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">Blog Website</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" to="/">Início</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/create">Criar</NavLink>
						</li>
					</ul>
					<form className="d-flex" onSubmit={handleSearch}>
						<input
							className="form-control me-2"
							type="search"
							placeholder="Pesquisar"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button className="btn btn-outline-success" type="submit">Pesquisar</button>
					</form>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
