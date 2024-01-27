import { ApiError } from "../errors/api.error";
import { User } from "../models/user.model";
import { IUser } from "../types/user.type";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find({});
  }
  public async getById(id: string): Promise<IUser> {
    const user = User.findOne({ _id: id });
    if (!user) {
      throw new ApiError("user not found", 422);
    }
    return user;
  }
  public async updateById(id: string, body: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(id, body, { returnDocument: "after" });
  }
  public async deleteById(id: string): Promise<void> {
    await User.deleteOne({ _id: id });
  }
  public async create(body: Partial<IUser>): Promise<IUser> {
    return await User.create(body);
  }
}
export const userRepository = new UserRepository();
