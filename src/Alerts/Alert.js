/** @format */

import Swal from "sweetalert2";

export const alertRegistration = () => {
	return Swal.fire({
		icon: "success",
		title: "Регистрация...",
		text: "Вы зарегистрированы в приложении",
	});
};

export const alertLogOut = () => {
	return Swal.fire({
		icon: "warning",
		title: "Выход...",
		text: "Вы покинули приложение ",
	});
};

export const alertSuccess = message => {
	return Swal.fire({
		position: "center",
		icon: "success",
		title: message,
		showConfirmButton: false,
		timer: 2500,
	});
};

export const alertError = message => {
	Swal.fire({
		icon: "error",
		title: "Oops...",
		text: message,
		// footer: '<a href>Why do I have this issue?</a>'
	});
};
export const alertLogin = () => {
	Swal.fire({
		icon: "success",
		title: "Вход...",
		text: "Добро пожаловать в приложение",
		// footer: '<a href>Why do I have this issue?</a>'
	});
};
