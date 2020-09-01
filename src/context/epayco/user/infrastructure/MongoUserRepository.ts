import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { UserId } from '../../shared/domain/UserId';
import { UserDocument } from '../domain/attributes/UserDocument';
import { UserPhone } from '../domain/attributes/UserPhone';
import { Nullable } from '../../../shared/domain/Nullable';
import { MongoUserModel, IUserMongo } from './MongoUserModel';

export class MongoUserRepository implements UserRepository {

  async save(user: User): Promise<void> {
    const { id: _id, ...otherProps } = user.toPrimitives();
    const userMongoDocument = new MongoUserModel({ _id, ...otherProps });
    await userMongoDocument.save();
  }

  async update(user: User): Promise<void> {
    const { id: _id, balance } = user.toPrimitives();
    await MongoUserModel.findByIdAndUpdate(_id, { balance });
  }

  async search(id: UserId): Promise<Nullable<User>> {
    const userMongo = await MongoUserModel.findById(id.value);
    if (!userMongo) return null;
    return this.dataModelToUser(userMongo.toJSON());
  }

  async searchByDocument(document: UserDocument): Promise<Nullable<User>> {
    const userMongoDocument = await MongoUserModel.findOne({ document: document.value });
    if (!userMongoDocument) return null;
    return this.dataModelToUser(userMongoDocument.toJSON());
  }


  async searchByDocumentAndPhone(document: UserDocument, phone: UserPhone): Promise<Nullable<User>> {
    const userMongoDocument = await MongoUserModel.findOne({ document: document.value, phone: phone.value });
    if (!userMongoDocument) return null;
    return this.dataModelToUser(userMongoDocument.toJSON());
  }

  private dataModelToUser(dataModel: IUserMongo): User {
    const { _id, document, name, email, phone, secret, balance } = dataModel;
    return User.fromPrimitives(_id, document, name, email, phone, secret, balance);
  }

}