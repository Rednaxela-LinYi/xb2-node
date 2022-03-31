import jwt from 'jsonwebtoken';
import { connection } from '../app/database/mysql';
import { PRIVATE_KEY } from '../app/app.config';

interface SignTokenOptions {
  payload?: any;
}

export const signToken = (options: SignTokenOptions) => {
  const { payload } = options;
  const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });
  return token;
};

/**
 * 检查用户是否有指定资源
 */
interface PossessOptions {
  resourceId: number;
  resourceType: string;
  userId: number;
}
export const possess = async (options: PossessOptions) => {
  //准备选项
  const { resourceId, resourceType, userId } = options;

  //准备查询
  const statement = `
    select count(${resourceType}.id) as count
    from ${resourceType}
    where ${resourceType}.id = ? and userId = ?
  `;

  const [data] = await connection
    .promise()
    .query(statement, [resourceId, userId]);

  return data[0].count ? true : false;
};
