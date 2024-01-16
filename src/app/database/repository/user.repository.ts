import {ObjectId} from 'mongodb';
import {userModal} from '../models';

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
  private readonly modal = userModal;

  async createUser({email, name, password, salt}: CreateUserParams) {
    const result = await this.modal.insertOne({
      email,
      name,
      password,
      salt,
      created_at: new Date(),
      is_verified: false,
    });
    if (!result.acknowledged) {
      throw new Error('Failed to create user');
    }
    return {
      id: result.insertedId,
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
        is_verified: true,
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

  async markUserAsVerified({userID}: {userID: ObjectId}) {
    return await this.modal.findOneAndUpdate(
      {_id: userID},
      {$set: {is_verified: true}}
    );
  }
}

const userRepository = new UserRepository();
export default userRepository;
