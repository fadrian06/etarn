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
