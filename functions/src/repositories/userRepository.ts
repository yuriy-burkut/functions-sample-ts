import { db, QueryDocumentSnapshot } from '../firebase';
import { firestore } from 'firebase-admin';
import DocumentReference = firestore.DocumentReference;
import { User } from '../models/user';

/**
 * @class UserRepository
 */
export class UserRepository {
  /**
     * Returns users by given email
     * @param {string} email
     * @return {Promise<Array<QueryDocumentSnapshot<User>>>}
     */
  async findByEmail(email: string) : Promise<Array<QueryDocumentSnapshot<User>>> {
    return (await db
      .collection('users')
      .where('email', '==', email)
      .get())
      .docs as Array<QueryDocumentSnapshot<User>>;
  }

  /**
     * Creates new user
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} email
     * @return {Promise<DocumentReference>} reference for created document
     */
  create(firstName: string, lastName: string, email: string) : Promise<DocumentReference> {
    return db.collection('users').add({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
  }
}

export const userRepository = new UserRepository();
