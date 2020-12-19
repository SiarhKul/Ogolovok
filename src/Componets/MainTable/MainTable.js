/** @format */
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Wave } from "react-preloading-component";
// import { db } from "../../Firebase/Firebase.js";
import { alertSuccess, alertError } from "../../Alerts/Alert.js";

import { nameHeaderTable } from "../../Database/database_header_table.js";
import TableRowMainTable from "./TableRowMainTable";
import classes from "./MainTable.module.css";
import {
	setPosition,
	addToTable,
	fetchDataFormServer,
	sendDataToServer,
	updateDataToServer
} from "../../Redux/Redux-actions/actionsCreators.js";


// import { createSelector } from 'reselect'
// const rowsDataSelector = state => state.rowsData
// const subTotalSelector = createSelector(
// 	rowsDataSelector,
// 	rowsData=>rowsData
// )

export default function MainTable() {
	const { register, errors, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const id = uuidv4();
	const initRow = {
		id: id,
		amount: "0",
		gab1: "0",
		gab2: "0",
		gab3: "0",
		gab4: "0",
		gab5: "0",
		gab6: "0"
	};
	const rowsData = useSelector(state => state.rowsData || [initRow]);
	const position = useSelector(state => state.position);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isPostToServer, setIsPostToServer] = useState(false);

	// --------------------------------------------ПОЛУЧЕНИЕ ПОЗИЦИИ
	const getPosition = useCallback(({ target: { value } }) => {
		dispatch(setPosition(value));
	});

	// --------------------------------------------ДОБАВЛЕНИЕ СТРОКИ
	const createRow = useCallback(() => {
		dispatch(addToTable([...rowsData, initRow]));
	});

	// -----------------------------------------------УДАЛЕНИЕ СТРОКИ
	const removeRow = idRow => {
		const newRow = rowsData.filter(row => {
			return row.id !== idRow;
		});
		dispatch(addToTable(newRow));
	};
	// --------------------------------------------ОБНОВЛЕНИЕ ДАННЫХ В ТАБЛИЦЕ

	const updateValueInput = ({ target }, idRow) => {
		const updatedRowsData = rowsData.map(el =>
			(el.id === idRow ? { ...el, [target.name]: target.value } : el));
		dispatch(addToTable(updatedRowsData));
	};

	// --------------------------------------------ОТПРАВКА НА СЕРВЕР ДАННЫХ С ТАБЛИЦЫ
	const onSubmit = () => {
		if (isPostToServer) {
			const afterUpdateDataToServer = new Promise(() => {
				dispatch(updateDataToServer(rowsData));
			});
			afterUpdateDataToServer
				.then(
					alertSuccess("Вы успешно обновили данные"),
					setIsLoaded(true)
				);

		} else {
			const afterSendDataToServer = new Promise(() => {
				dispatch(sendDataToServer(position, rowsData));
			});
			afterSendDataToServer
				.then(
					alertSuccess("Вы успешно создали базу"),
					setIsPostToServer(true),
					setIsLoaded(true)
				)
				.catch(error => alertError(error.message));
		}
	};

	// --------------------------------------------ПОДТЯГИВАНИЕ ДАННЫХ С СЕРВЕРА
	useEffect(() => {
		const afterFetchDataFormServer = new Promise(() => {
			dispatch(fetchDataFormServer());
		});
		afterFetchDataFormServer
			.then(
				setIsLoaded(true)
			)
			.catch(error => alertError(error.message));
	}, []);

	return (
		<div>
			<div className="text-center">
				<h2 className="p-2">ДКС-1 заполярного НГКМ</h2>
			</div>

			<div className="container p-5 border border-info rounded">
				<div className=" row ">
					<div className="input-group mb-3">
						<input ref={register({ required: true })}
							name="namePosition"
							type="text"
							className="form-control"
							placeholder="Назначить позицию"
							onChange={getPosition}
							value={position} />
						<div className="input-group-prepend">
							<button type="button" className=" text-left btn btn-info">
								Позиция
							</button>
						</div>

					</div>
					{errors.namePosition && <p className={classes.error}>Введите позицию</p>}

					{isLoaded ? null : <Wave color="blue" />}

					<table className="table table-bordered  rounded table-responsive ">
						<thead>
							<tr>
								{nameHeaderTable.map((h, i) => {
									return <th key={i} className="align-top">
										<p className={`m-0 m-auto ${classes.verticalText}`}>{h}</p>
									</th>;
								})}
							</tr>
						</thead>
						<tbody>
							{rowsData.map(({ ...rowDataAllProps }, i) => {
								return (
									<TableRowMainTable
										key={i}
										className={classes.inputIcon}
										updateValueInput={updateValueInput}
										removeRow={removeRow}
										{...rowDataAllProps}
									/>
								);
							})}
						</tbody>
					</table>


				</div>

				<div className="row justify-content-between">
					<div className="col-auto mr-auto ">

						<button
							type="button"
							className=" text-left btn btn-primary"
							onClick={createRow}>
							Добавить строку
						</button>

					</div>
					<div className="col-auto ">

						<button
							type="button"
							className=" text-left btn btn-info"
							onClick={handleSubmit(onSubmit)}>
							Создать таблицу
						</button>

					</div>
				</div>
			</div>
		</div>
	);
}
