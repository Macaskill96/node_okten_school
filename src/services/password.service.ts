import bcrypt from "bcrypt";
class PasswordService {
  public hash(password: string): Promise<string> {
    console.log("here");
    return bcrypt.hash(password, 2);
  }
  public compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

export const passwordService = new PasswordService();
