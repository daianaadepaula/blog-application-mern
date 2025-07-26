import axios from "axios"
import { useState } from "react"

const UpdateForm = ({ post, closeModal }) => {
	const [title, setTitle] = useState(post.title)
	const [description, setDescription] = useState(post.description)
	const [content, setContent] = useState(post.content)

	const handleUpdate = async (e) => {
		e.preventDefault()
		try {
			await axios.patch(`${import.meta.env.VITE_API_URL}/update/${post._id}`, {
				title,
				description,
				content
			})
			closeModal()
		} catch (error) {
			console.error("Erro ao atualizar:", error.message)
		}
	}

	return (
		<>
			<form onSubmit={handleUpdate}>
				<div className="mb-3">
					<label htmlFor="title">Título</label>
					<input
						type="text"
						className="form-control"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="description">Descrição</label>
					<textarea
						className="form-control"
						rows={3}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>
				<div className="mb-3">
					<label htmlFor="content">Conteúdo</label>
					<textarea
						className="form-control"
						rows={5}
						value={content}
						onChange={(e) => setContent(e.target.value)}
					></textarea>
				</div>
				<div className="d-grid">
					<button type="button" className="btn btn-secondary mb-1" data-bs-dismiss="modal" onClick={closeModal}>Fechar</button>
					<button type="submit" className="btn btn-success">Atualizar</button>
				</div>
			</form>
		</>
	)
}

export default UpdateForm