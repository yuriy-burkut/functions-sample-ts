import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {getFunctions} from "firebase-admin/functions";
import {getAuth} from "firebase-admin/auth";
import {getStorage} from "firebase-admin/storage";

initializeApp();

export const functions = getFunctions();
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

export {logger} from "firebase-functions";

export {
    DocumentReference,
    QueryDocumentSnapshot,
    WriteResult,
    Timestamp,
    DocumentSnapshot,
    FieldValue,
    Query,
    WriteBatch,
    Transaction
} from '@google-cloud/firestore';

export {HttpsError, onCall} from "firebase-functions/v2/https";
export {onDocumentCreated, onDocumentDeleted, onDocumentUpdated} from "firebase-functions/v2/firestore";
