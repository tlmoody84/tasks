import { collection, getDocs, doc, updateDoc, deleteDocument } from "firebase/firestore";

/**
 * Generic that gets all documents from a firestore database and returns an array of objects
 * @param {database} db
 * @param {string} collectionName
 * @returns {array}
 * @returns an array of objects
 */
async function getAllDocuments(db, collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const documents = [];

  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });

  console.log(documents);

  return documents;
}
/**
 * Utility Function that adds a document to a Google Cloud Firestore Database
 * @param {database instance} db An instance of a Cloud Firestore Database
 * @param {string} collectionName The name of a Firestore db collection
 * @param {object} data An object representing a collection document
 */
async function addDocument(db, collectionName, data) {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
/**
 * Updates a Cloud Firestore DB document
 * @param {database instance} db An instance of a Cloud Firestore Database
 * @param {string} collectionName The name of a Firestore db collection
 * @param {string} id id of cloud firestore document
 * @param {*} data object of data to be updated within document
 */

async function updateDocument(db, collectionName, id, data) {
    try {
      const docRef = doc(db, collectionName, id);
  
      if (docRef) {
        await updateDoc(docRef, data);
      } else {
        console.log("NO reference to doc found with id:", id);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  export { getAllDocuments, addDocument, updateDocument, deleteDocument };