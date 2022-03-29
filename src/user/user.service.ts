import { connection } from '../app/database/mysql';
import { UserModel } from './user.model';

interface GetUserOptions {
  password?: boolean;
}

export const createUser = async (user: UserModel) => {
  const statement = `
    insert into user
    set ?
  `;

  const [data] = await connection.promise().query(statement, user);

  return data;
};

export const getUserByName = async (
  username: string,
  options: GetUserOptions = {}
) => {
  const { password } = options;
  const statement = `
    select
    id,
    name
    ${password ? ', password' : ''}
    from user
    where name = ?
  `;
  const [data] = await connection.promise().query(statement, username);
  return data;
};
