import { connection } from '../app/database/mysql';
import { FileModel } from '../file/file.model';

/**
 * 存储文件信息
 */

export const createFile = async (file: FileModel) => {
  const statement = `
    insert into file 
    set ?
  `;

  const [data] = await connection.promise().query(statement, file);
};

export const findFileById = async (fileId: number) => {
  const statement = `
    SELECT * FROM file
    where id = ?
  `;

  const [data] = await connection.promise().query(statement, fileId);

  return data[0];
};
