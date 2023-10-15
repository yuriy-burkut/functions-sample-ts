import { db, QueryDocumentSnapshot } from '../firebase';
import { chunks } from '../utils/arrayUtils';

/**
 * @class MessagesRepository
 */
export class MessagesRepository {
  /**
     * deletes all messages for given user
     * @param {string} userId
     * @return {Promise<void>}
     */
  async deleteUserMessages(userId: string) {
    const userMessages: Array<QueryDocumentSnapshot> = (await db
      .collection('messages')
      .where('userId', '==', userId).get())
      .docs;

    for (const chunk of chunks(userMessages, 500)) {
      const batch = db.batch();
      chunk.forEach((message) => {
        batch.delete(message.ref);
      });
      await batch.commit();
    }
  }
}

export const messageRepository = new MessagesRepository();
