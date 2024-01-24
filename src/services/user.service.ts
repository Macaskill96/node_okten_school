import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";
class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }
  public async getById(id) {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("user not found", 422);
    }
    return user;
  }
  public async deleteById(id): Promise<void> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("User not found", 422);
    }
    await userRepository.deleteById(id);
  }
  public async updateById(id, body: Partial<IUser>) {
    const user = await userRepository.getAll();
    if (!user) {
      throw new ApiError("User not found", 422);
    }
    return await userRepository.updateById(id, body);
  }
}
export const userService = new UserService();
