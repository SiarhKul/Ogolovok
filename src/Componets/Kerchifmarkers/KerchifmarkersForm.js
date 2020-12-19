/** @format */

import React from "react";
import classes from "./Kerchifmarkers.module.css";
import { useForm } from "react-hook-form";
import { alertSuccess, alertError } from "../../Alerts/Alert";
import { fixWelderData } from "../../Redux/Redux-actions/actionsCreators";
import { useDispatch } from "react-redux";

export default function KerchifmarkersForm(props) {
	const dispatch = useDispatch();
	const { gab1, gab2, gab3, gab4, gab5, gab6, pile } = props;
	const { register, errors, handleSubmit } = useForm();

	const onSubmit = dataCardPile => {
		const amountKerchif = Object.values(dataCardPile).filter(Number).length;
		const merged = { ...props, ...dataCardPile, amount: amountKerchif };
		const afterfixWelderData = new Promise(() => dispatch(fixWelderData(merged)));

		afterfixWelderData
			.then(alertSuccess("Вы успешно обновили данные"))
			.catch(error => alertError(error.message));
	};

	return (
		<div className="item  m-1 justify-content-center">
			<button
				className={`btn btn-primary btn-block mb-3 ${classes.btnSize}`}
				type="button"
				data-toggle="collapse"
				data-target={`#collapseExample${pile}`}
				aria-expanded="false"
				aria-controls={`collapseExample${pile}`}>
				Свая №{pile}
			</button>

			<div className="collapse border rounded border-info" id={`collapseExample${pile}`}>
				<div className="card card-body">
					<form className="form justify-content-center" method="post" onSubmit={handleSubmit(onSubmit)}>

						<div className="form-group">
							<input
								type="number"
								name="gab1"
								className="edge1 form-control"
								placeholder={gab1}
								ref={register({ required: true })} />
							{errors.gab1 && <p className={classes.error}>Заполните поля</p>}
						</div>

						<div className="form-group">
							<input
								type="number"
								name="gab2"
								className="edge2 form-control"
								placeholder={gab2}
								ref={register({ required: true })} />
							{errors.gab2 && <p className={classes.error}>Заполните поля</p>}
						</div>

						<div className="form-group">
							<input
								type="number"
								name="gab3"
								className="edge3 form-control"
								placeholder={gab3}
								ref={register({ required: true })} />
							{errors.gab3 && <p className={classes.error}>Заполните поля</p>}
						</div>
						<div className="form-group">
							<input type="number"
								name="gab4"
								className="edge4 form-control"
								placeholder={gab4}
								ref={register({ required: true })} />
							{errors.gab4 && <p className={classes.error}>Заполните поля</p>}
						</div>
						<div className="form-group">
							<input
								type="number"
								name="gab5"
								className="edge5 form-control"
								placeholder={gab5}
								ref={register({ required: true })} />
							{errors.gab5 && <p className={classes.error}>Если отсутствует косынка, установите 0 </p>}
						</div>
						<div className="form-group">
							<input
								type="number"
								name="gab6"
								className="edge6 form-control"
								placeholder={gab6}
								ref={register({ required: true })} />
							{errors.gab6 && <p className={classes.error}>Если отсутствует косынка, установите 0 </p>}
						</div>
						<div>
							<button className="btn-post shadow-lg btn btn-info btn-block"> Отправить №{pile} </button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
