import { User } from "../models/user.model";
import { IUser } from "../types/user.type";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find({});
  }
  public async getById(id): Promise<IUser> {
    return await User.findOne(id);
  }
  public async updateById(id, body: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(id, body, { returnDocument: "after" });
  }
  public async deleteById(id): Promise<void> {
    return await User.deleteOne(id);
  }
  public async create(body: Partial<IUser>): Promise<IUser> {
    return await User.create(body);
  }
}
export const userRepository = new UserRepository();
