import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import UpdateForm from '../components/UpdateForm'
import BlogCard from '../components/BlogCard'

const HomePage = () => {
	const [data, setData] = useState([])
	const [refetch, setRefetch] = useState(false)
	const [searchParams] = useSearchParams()
	const searchQuery = searchParams.get("q") || ""

	const [selectedPost, setSelectedPost] = useState(null)

	const fetchAllBlogs = async () => {
		try {
			const url = import.meta.env.VITE_API_URL + "/"
			const response = await axios.get(url)
			const allData = response.data

			if (searchQuery.trim()) {
				const filtered = allData.filter(post =>
					post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					post.description.toLowerCase().includes(searchQuery.toLowerCase())
				)
				setData(filtered)
			} else {
				setData(allData)
			}
		} catch (error) {
			console.error(error.message)
		}
	}

	useEffect(() => {
		fetchAllBlogs()
	}, [refetch, searchQuery])

	const handleEditClick = (post) => {
		setSelectedPost(post)
	}

	return (
		<>
			{data && data.length > 0 ? (
				<div className="row px-3">
					{data.map((curr, index) => (
						<div key={index} className="col-12 col-md-6 col-lg-4 d-flex">
							<BlogCard
								data={curr}
								refetch={() => setRefetch(!refetch)}
								onEditClick={handleEditClick}
							/>
						</div>
					))}
				</div>
			) : (
				<div className="card mx-auto py-3 mt-3">
					<p className="text-center mt-5">Nenhum post encontrado.</p>
				</div>
			)}

			{selectedPost && (
				<div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
					<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Editar Post</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setSelectedPost(null)}
								></button>
							</div>
							<div className="modal-body">
								<UpdateForm post={selectedPost} closeModal={() => {
									setSelectedPost(null)
									setRefetch(!refetch)
								}} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default HomePage
