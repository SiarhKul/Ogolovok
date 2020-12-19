/** @format */

import React, { useState, useEffect } from "react";

import { Wave } from "react-preloading-component";
import KerchifmarkersForm from "./KerchifmarkersForm";
import { alertError } from "../../Alerts/Alert";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFormServer } from "../../Redux/Redux-actions/actionsCreators.js";

export default function Kerchifmarkers() {
	const position = useSelector(state => state.position);
	const cardsPile = useSelector(state => state.rowsData);
	const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const afterFetchDataFormServer = new Promise(() => dispatch(fetchDataFormServer()));
		afterFetchDataFormServer
			.then(
				setIsLoaded(true)
			)
			.catch(error => alertError(error.message));
	}, []);

	return (
		<div>
			<div className="container">
				<div className="text-center">
					<h2 className="p-2">Позиция:{position}</h2>
				</div>
				<div className="container-inner row  justify-content-center   border-info">
					{isLoaded ? null : <Wave color="blue" />}
					{cardsPile.map(({ id, ...allProps }) => {
						return (
							<KerchifmarkersForm
								{...allProps}
								key={id}
								id={id}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
