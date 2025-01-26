import db from "@/database/db";
import type { User } from "@/types";

export function getUserByEmail(email: User["email"]): Promise<User | null> {
	return new Promise((resolve, reject) => {
		db.get<User>(
			`
				select id, name, email, password, admin, user_id as userId, phone_personal as phonePersonal, phone_job as phoneJob, phone_home as phoneHome
				from users
				where email = ?
			`,
			email,
			(err, user) => {
				if (err) {
					return reject(err);
				}

				resolve(user);
			},
		);
	});
}

export function getUserById(id: User["id"]): Promise<User | null> {
	return new Promise((resolve, reject) => {
		db.get<User>(
			`
				select id, name, email, password, admin, user_id as userId, phone_personal as phonePersonal, phone_job as phoneJob, phone_home as phoneHome
				from users
				where id = ?`,
			id,
			(err, user) => {
				if (err) {
					return reject(err);
				}

				resolve(user);
			},
		);
	});
}

export function getUsers(): Promise<User[]> {
	return new Promise((resolve, reject) => {
		db.all<User>(
			`
				select id, name, email, password, admin, user_id as userId, phone_personal as phonePersonal, phone_job as phoneJob, phone_home as phoneHome
				from users
			`,
			(err, users) => {
				if (err) {
					return reject(err);
				}

				resolve(users);
			},
		);
	});
}

export function deleteUserById(id: User["id"]): Promise<void> {
	return new Promise((resolve, reject) => {
		db.run("delete from users where id = ?", id, (err) => {
			if (err) {
				return reject(err);
			}

			resolve();
		});
	});
}

export function saveUser(user: User, password?: string): Promise<void> {
	return new Promise((resolve, reject) => {
		getUserById(user.id).then((userFound) => {
			const sql = userFound
				? `
					update users
					set name = $name, email = $email, password = $password, admin = $admin, user_id = $userId, phone_personal = $phonePersonal, phone_job = $phoneJob, phone_home = $phoneHome
					WHERE id = $id
				`
				: `
					insert into users (id, name, email, password, admin, user_id, phone_personal, phone_job, phone_home)
					values ($id, $name, $email, $password, $admin, $userId, $phonePersonal, $phoneJob, $phoneHome)
				`;

			db.run(
				sql,
				{
					$id: user.id,
					$name: user.name,
					$email: user.email,
					$password: user.password,
					$admin: user.admin,
					$userId: user.userId,
					$phonePersonal: user.phonePersonal,
					$phoneJob: user.phoneJob,
					$phoneHome: user.phoneHome,
				},
				(err) => {
					if (err) {
						return reject(err);
					}

					resolve();
				},
			);
		});
	});
}
