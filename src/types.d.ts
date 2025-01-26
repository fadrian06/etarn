import type icons from "bootstrap-icons/font/bootstrap-icons.json";

type IconName = keyof typeof icons;

export interface ComponentWithIcon {
	iconName: IconName;
}

export interface User {
	readonly id: string;
	readonly name: string;
	readonly email: string;
	readonly password: string;
	readonly admin: boolean;
	readonly userId?: User['id'];
	readonly phonePersonal?: string
	readonly phoneJob?: string
	readonly phoneHome?: string
}
