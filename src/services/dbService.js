//crear usauario en la base de datos con las credenciales que se registró
import { db } from '@/firebase'
import User from '@/models/user';
import Department from '@/models/departament';
import Employee from '@/models/employee';
//import Document from '@/models/document';
import { setDoc, doc, collection, getDocs, getDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

//import Swal from 'sweetalert2'



export default {
  async addUser(user) {
    // Add a new user in collection "users"
    await setDoc(doc(db, "users", user.uid),
      new User(user).toJson()
    );
  },

  //Direcciones
  async getDepartments() {
    const departments = [];
    const querySnapshot = await getDocs(collection(db, "departments"));
    querySnapshot.forEach((doc) => {
      const departmentData = doc.data();
      departments.push(new Department(departmentData));
    });
    return departments;
  },
  async addDepartment(department) {
    // Create a new document reference with a generated ID
    const newDepRef = doc(collection(db, "departments"));
    // Assign the generated ID to the department object's uid property
    department.uid = newDepRef.id;
    // Set the document with the updated department object (including uid)
    await setDoc(newDepRef, department);
    return newDepRef; // Return the document reference for potential future use

  },

  async updateDepartment(updatedDepartment) {
    try {
      const departmentRef = doc(db, "departments", updatedDepartment.uid);
      await updateDoc(departmentRef, updatedDepartment);
      console.log("Departamento actualizado correctamente");
      return true; // Indicar que la actualización fue exitosa
    } catch (error) {
      console.error("Error al actualizar el departamento:", error);
      return false; // Indicar que ocurrió un error
    }
  },

  async deleteDepartment(uid) {
    try {
      await deleteDoc(doc(db, "departments", uid));
      console.log("Departamento Eliminado correctamente");
      return true; // Indicar que la actualización fue exitosa
    } catch (error) {
      console.error("Error al actualizar el departamento:", error);
      return false; // Indicar que ocurrió un error
    }
  },

  //Employee

  async getEmployees() {
    const employees = [];
    const querySnapshot = await getDocs(collection(db, "employees"));
    querySnapshot.forEach((doc) => {
      const employeeData = doc.data();
      employees.push(new Employee(employeeData));
    });
    return employees;
  },
  async  getEmployeeByCI(ci) {
    // Referencia al documento con el CI como UID
    const employeeRef = doc(db, "employees", ci);
  
    // Obtener el documento
    const employeeSnap = await getDoc(employeeRef);
  
    // Verificar si el documento existe
    if (!employeeSnap.exists()) {
      console.log("No se encontró ningún empleado con esa cédula.");
      return null;
    }
  
    // Retornar los datos del empleado
    return employeeSnap.data();
  },
  
  async addEmployee(employee) {
    // Create a new document reference with a generated ID
    //const newDepRef = doc(collection(db, "employees"));
    const newDepRef = doc(db, "employees", employee.uid);
    // Assign the generated ID to the employee object's uid property
    //employee.uid = newDepRef.id;
    // Set the document with the updated employee object (including uid)
    await setDoc(newDepRef, employee);

    return newDepRef; // Return the document reference for potential future use

  },

  async updateEmployee(updatedEmployee) {
    try {
      const employeeRef = doc(db, "employees", updatedEmployee.uid);
      await updateDoc(employeeRef, updatedEmployee);
      console.log("Departamento actualizado correctamente");
      return true; // Indicar que la actualización fue exitosa
    } catch (error) {
      console.error("Error al actualizar el departamento:", error);
      return false; // Indicar que ocurrió un error
    }
  },

  async deleteEmployee(uid) {
    try {
      await deleteDoc(doc(db, "employees", uid));
      await deleteDoc(doc(db, "documents", uid));
      console.log("Departamento Eliminado correctamente");
      return true; // Indicar que la actualización fue exitosa
    } catch (error) {
      console.error("Error al actualizar el departamento:", error);
      return false; // Indicar que ocurrió un error
    }
  },

  //Document


  async getAllDocuments() {
    try {
      const documentsRef = collection(db, "documents"); // Reference to the "documents" collection
      const querySnapshot = await getDocs(documentsRef); // Get all documents in the collection

      const documents = []; // Empty array to store retrieved documents
      querySnapshot.forEach((doc) => {
        const data = doc.data(); // Get data from each document
        documents.push(data.docs); // Extract and push the "docs" array from each document
      });

      // Flatten the "documents" array (optional, if you want a single list of documents)
      const flattenedDocuments = documents.flat();

      // Use the retrieved documents for display or further processing
      console.log("Retrieved documents:", flattenedDocuments); // Example usage

      return flattenedDocuments; // Optional: return the documents for further use
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  },
  async listDocuments(uid) {
    try {
      const documentsRef = doc(db, "documents", uid); // Reference to the "documents" collection
      const querySnapshot = await getDoc(documentsRef); // Get all documents in the collection
      console.log(querySnapshot.data().docs);

      const documents = querySnapshot.data().docs; // Empty array to store retrieved documents

      return documents; // Optional: return the documents for further use
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  },
  async addDocument(document) {
    const docRef = doc(db, "documents", document.uid); // Usa el uid existente o genera uno nuevo si es necesario
    let documentCreated = false;
    try {
      await updateDoc(docRef, {
        docs: arrayUnion(document) // Agrega el nuevo documento al array
      });
      console.log("Document added to array successfully!");
      documentCreated = true;
    } catch (error) {
      console.error("Error adding document to array:", error);
      throw error; // Re-lanza el error para que se pueda manejar
    }
    return documentCreated;
  },



  async updateDocument(updatedDocument) {
    try {
      const documentRef = doc(db, "documents", updatedDocument.uid);
      await updateDoc(documentRef, updatedDocument);
      console.log("Departamento actualizado correctamente");
      return true; // Indicar que la actualización fue exitosa
    } catch (error) {
      console.error("Error al actualizar el departamento:", error);
      return false; // Indicar que ocurrió un error
    }
  },


  async deleteDocument(document) {
    const docRef = doc(db, "documents", document.uid);

    let documentDeleted = false;
    try {
      await updateDoc(docRef, {
        docs: arrayRemove(document)
      });
      console.log("Valor eliminado del array con éxito.");
      documentDeleted = true;
    } catch (error) {
      console.error("Error al eliminar el valor del array:", error);
    }
    return documentDeleted;
  },

}