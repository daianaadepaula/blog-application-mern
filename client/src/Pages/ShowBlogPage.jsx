import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const ShowBlogPage = () => {
	const { slugId } = useParams()
	const id = slugId?.split('-')[0]
	const [loading, setLoading] = useState(true)
	const [blog, setBlog] = useState({})

	const fetchBlog = async (id) => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`)
			const data = await response.data
			setBlog(data)
		} catch (error) {
			console.log(error.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (id) {
			fetchBlog(id)
		}
	}, [id])

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<div className="container card col-sm-10 mx-auto py-3 mt-3" >
			<div className="mb-3 card-header">
				<h4 className="card-title">{blog.title}</h4>
			</div>
			<div className="mb-3 card-body">
				<p className="card-text">{blog.description}</p>
				<p className="card-text">{blog.content}</p>
			</div>
			<div className="card-footer">
				<span className="text-muted">
					Criado em {format(new Date(blog.createdAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
				</span>
			</div>
		</div>
	)
}

export default ShowBlogPage
