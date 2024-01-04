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
}

const userRepository = new UserRepository();
export default userRepository;
