import axios from "axios";
import { useState } from "react";

const CreatePage = () => {
	const [states, setStates] = useState({
		title: '',
		description: '',
		content: ''
	})
	const [error, setError] = useState({
		isShow: false,
		msg: ""
	})
	const [message, setMessage] = useState({
		isShow: false,
		msg: ""
	})
	const [fieldErrors, setFieldErrors] = useState({});

	const onChangeHandler = (e) => {
		setStates({ ...states, [e.target.name]: e.target.value })
	}

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(import.meta.env.VITE_API_URL + "/create", states);
			const data = response.data;

			setError({ isShow: false, msg: '' });
			setMessage({ isShow: true, msg: data.message || "Post criado com sucesso!" });

			setStates({ title: '', description: '', content: '' });
			setFieldErrors({});

		} catch (err) {
			console.error(err);
			setMessage({ isShow: false, msg: '' });

			if (
				err.response &&
				err.response.status === 422 &&
				Array.isArray(err.response.data.details)
			) {
				const fieldErrors = {};
				err.response.data.details.forEach((e) => {
					fieldErrors[e.field] = e.message;
				});
				setFieldErrors(fieldErrors);
			} else {
				setFieldErrors({});
				setError({
					isShow: true,
					msg: err.response?.data?.error || err.message || "Algo deu errado",
				});
			}
		}
	};

	return (
		<>
			<form onSubmit={onSubmitHandler} className='card col-sm-10 mx-auto py-4 mt-5 px-3'>
				<div className="card-header mb-3 text-center">
					<h4 className="card-title">Criar Post</h4>
				</div>
				{error.isShow &&
					<div className="mb-3 alert alert-danger" style={{ whiteSpace: "pre-line" }}>
						{error.msg}
					</div>
				}
				{message.isShow &&
					<div className="mb-3 alert alert-success">
						{message.msg}
					</div>
				}
				<div className="card-body">
					<div className="mb-3">
						<label htmlFor="title">Título</label>
						<input onChange={onChangeHandler} value={states.title} type="text" name='title' id='title' className="form-control" placeholder='Escreva um título' />
						{fieldErrors.title && (
							<small className="text-danger">{fieldErrors.title}</small>
						)}
					</div>
					<div className="mb-3">
						<label htmlFor="description">Descrição</label>
						<textarea onChange={onChangeHandler} value={states.description} rows={3} name='description' id='description' className="form-control" placeholder='Escreva uma breve descrição' />
						{fieldErrors.description && (
							<small className="text-danger">{fieldErrors.description}</small>
						)}
					</div>
					<div className="mb-3">
						<label htmlFor="content">Conteúdo</label>
						<textarea onChange={onChangeHandler} value={states.content} rows={5} name='content' id='content' className="form-control" placeholder='Escreva o conteúdo do seu post' />
						{fieldErrors.content && (
							<small className="text-danger">{fieldErrors.content}</small>
						)}
					</div>
				</div>
				<div className="card-footer">
					<button style={{ width: "100%" }} className="btn btn-primary mt-3">Criar o post</button>
				</div>
			</form>
		</>
	)
}

export default CreatePage