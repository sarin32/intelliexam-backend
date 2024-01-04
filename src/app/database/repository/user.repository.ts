import { userModel } from "../models";

type CreateUserParams = {
	email: string,
	name: string,
	password: string,
	salt: string
}

class UserRepository {

	private readonly modal = userModel

	async createUser({ email, name, password, salt }: CreateUserParams) {
		return await this.modal.insertOne({
			email, name, password, salt
		})
	}
}

const userRepository = new UserRepository()
export default userRepository