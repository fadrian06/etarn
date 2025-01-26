export function capitalize(text: string): string {
	const firstLetter = text.charAt(0);
	const textWithoutFirstLetter = text.slice(1);

	return firstLetter.toUpperCase() + textWithoutFirstLetter.toLowerCase();
}
