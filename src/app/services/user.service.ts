import {userRepository} from '../database';

type SignupParams = {
  email: string;
  password: string;
  name: string;
};

class UserService {
  private readonly repository = userRepository;
  async signup({email, name, password}: SignupParams) {
    const salt = 'salt';
    return await this.repository.createUser({
      email,
      name,
      password,
      salt,
    });
  }
}

const userService = new UserService();
export default userService;
