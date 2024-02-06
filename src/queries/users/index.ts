import createQuery from './create.query';
import deleteOneQuery from './deleteOne.query';
import findAllQuery from './findAll.query';
import findByIdQuery from './findById.query';
import findByIdAndUpdateQuery from './findByIdAndUpdate.query';
import findOneQuery from './findOne.query';
import findOneAndUpdateQuery from './findOneAndUpdate.query';
import updateOneQuery from './updateOne.query';

const usersQueries = {
  createQuery,
  updateOneQuery,
  deleteOneQuery,

  findAllQuery,
  findByIdQuery,
  findByIdAndUpdateQuery,
  findOneQuery,
  findOneAndUpdateQuery,
};

export default usersQueries;
