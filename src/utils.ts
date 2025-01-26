import Swal from "sweetalert2";

export function capitalize(text: string): string {
	const firstLetter = text.charAt(0);
	const textWithoutFirstLetter = text.slice(1);

	return firstLetter.toUpperCase() + textWithoutFirstLetter.toLowerCase();
}

export function getToast() {
	return Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
	});
}
