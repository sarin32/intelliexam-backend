import {ObjectId} from 'mongodb';
import {userModel} from '../models';

type CreateUserParams = {
  email: string;
  name: string;
  password: string;
  salt: string;
};

type findUserByEmailParams = {
  email: string;
};

type findUserByIdParams = {
  id: ObjectId;
};

class UserRepository {
  private readonly modal = userModel;

  async createUser({email, name, password, salt}: CreateUserParams) {
    const result = await this.modal.insertOne({
      email,
      name,
      password,
      salt,
    });
    if (!result.acknowledged) {
      throw new Error('Failed to create user');
    }
    return {
      userId: result.insertedId,
    };
  }

  async findUserByEmail({email}: findUserByEmailParams) {
    const result = await this.modal.findOne({
      email,
    });
    return result;
  }

  async isUserExistsWithEmail({email}: findUserByEmailParams) {
    const result = await this.modal.findOne(
      {
        email,
      },
      {projection: {_id: 1}}
    );
    return Boolean(result);
  }

  async findUserById({id}: findUserByIdParams) {
    const result = await this.modal.findOne(
      {
        _id: id,
      },
      {projection: {password: 0, salt: 0}}
    );
    return result;
  }
}

const userRepository = new UserRepository();
export default userRepository;
