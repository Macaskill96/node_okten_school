import { FilterQuery } from "mongoose";

import { ApiError } from "../errors/api.error";
import { User } from "../models/user.model";
import { IPaginationResponse, IQuery } from "../types/pagination.type";
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
  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(params);
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
  public async getMany(query: IQuery): Promise<IPaginationResponse<IUser>> {
    const {
      page = 1,
      limit = 10,
      sortedBy = "createdAt",
      ...searchObject
    } = query;

    const skip = +limit * (+page - 1);

    const users = await User.find(searchObject)
      .sort(sortedBy)
      .limit(limit)
      .skip(skip);

    const itemsFound = await User.countDocuments(searchObject);

    return {
      page: +page,
      limit: +limit,
      items: itemsFound,
      data: users,
    };
  }
}
export const userRepository = new UserRepository();
