import { UserId } from "../../shared/domain/UserId";
import { User } from "./User";
import { Nullable } from '../../../shared/domain/Nullable';
import { UserDocument } from "./attributes/UserDocument";
import { UserPhone } from "./attributes/UserPhone";

export interface UserRepository {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  search(id: UserId): Promise<Nullable<User>>;
  searchByDocument(document: UserDocument): Promise<Nullable<User>>;
  searchByDocumentAndPhone(document: UserDocument, phone: UserPhone): Promise<Nullable<User>>;
}