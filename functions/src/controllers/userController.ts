import { UserRepository } from '../repositories/userRepository';
import { MessagesRepository } from '../repositories/messagesRepository';
import {
  logger,
  onCall,
  onDocumentCreated,
  onDocumentDeleted,
  onDocumentUpdated,
  HttpsError,
} from '../firebase';

export class UserController {
  private userRepository: UserRepository;
  private messageRepository: MessagesRepository;

  constructor(
    userRepository: UserRepository,
    messageRepository: MessagesRepository
  ) {
    this.userRepository = userRepository;
    this.messageRepository = messageRepository;
  }

  onUserCreated = onDocumentCreated('users/{userId}', (event) => {
    logger.log('User created', event.data);
  });

  /**
     * onDocument update function example
     */
  onUserUpdated = onDocumentUpdated('users/{userId}', (event) => {
    logger.log(`User updated from: ${JSON.stringify(event.data?.before.data())} to ${JSON.stringify(event.data?.after.data())}`);
  });

  /**
     * onDocument delete function example
     */
  onUserDeleted = onDocumentDeleted('users/{userId}', async (event) => {
    if (!event.data) {
      logger.error('Received event with empty data');
      return;
    }
    await this.messageRepository.deleteUserMessages(event.data.id);
    console.log(`User deleted ${JSON.stringify(event.data)}`);
  });

  /**
     * Callable function. Invoked when you call regular function from Flutter side
     * Yoy can take token and email from context
     * @type {HttpsFunction & import("./cloud-functions").Runnable<any>}
     */
  createUser = onCall(async (request) => {
    const { firstName, lastName, email } = request.data;
    const auth = request.auth;

    // Todo(Verify token here)
    if (!auth || !auth.token) {
      throw new HttpsError('permission-denied', 'Only for authorised users');
    }

    if (!firstName || !lastName || !email) {
      throw new HttpsError('invalid-argument', 'Data for user creation are missing or invalid');
    }

    const existingUsers = await this.userRepository.findByEmail(email);

    if (existingUsers.length) {
      throw new HttpsError('already-exists', 'user by given email already exist');
    } else {
      await this.userRepository.create(firstName, lastName, email);
    }
  });
}
