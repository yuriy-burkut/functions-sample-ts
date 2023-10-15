require('./firebase');
import {UserController} from "./controllers/userController";
import {userRepository} from "./repositories/userRepository";
import {messageRepository} from "./repositories/messagesRepository";
export const {
    onUserCreated,
    onUserUpdated,
    onUserDeleted,
    createUser
} = new UserController(userRepository, messageRepository);
