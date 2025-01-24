import db from '@/database/db'
import type { User } from '@/types'

export function getUserByEmail(email: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    db.get<User>(
      'select id, email, password, admin, user_id as userId from users where email = ?',
      email,
      (err, user) => {
        if (err) {
          reject(err)
        }

        resolve(user)
      }
    )
  })
}

export function getUsers(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    db.all<User>(
      'select id, email, password, admin, user_id as userId from users',
      (err, users) => {
        if (err) {
          reject(err)
        }

        resolve(users)
      }
    )
  })
}

export function deleteUserById(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('delete from users where id = ?', id, err => {
      if (err) {
        reject(err)
      }

      resolve()
    })
  })
}

export function saveUser(user: User): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      'insert into users (id, email, password, admin, user_id) values ($id, $email, $password, $admin, $userId)',
      {
        $id: user.id,
        $email: user.email,
        $password: user.password,
        $admin: user.admin,
        $userId: user.userId
      },
      err => {
        if (err) {
          reject(err)
        }

        resolve()
      }
    )
  })
}
