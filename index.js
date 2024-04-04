// Import modul-modul yang diperlukan
const readline = require("readline");

// Inisialisasi pembaca baris
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Definisikan array untuk menyimpan kontak
let contacts = [];

// Definisikan stack untuk melacak operasi
let operationStack = [];

// Definisikan queue untuk mengelola tugas
let operationQueue = [];

// Fungsi untuk menambahkan kontak baru
function addContact(name, phoneNumber, address) {
  const contact = { name, phoneNumber, address };
  contacts.push(contact);
  operationStack.push(`Added contact: ${name}`);
  operationQueue.push(`Added contact: ${name}`); // Menambahkan operasi ke dalam antrian operasi
}

// Fungsi untuk menghapus kontak berdasarkan nama atau nomor telepon
function deleteContact(key) {
  const index = contacts.findIndex(
    (contact) => contact.name === key || contact.phoneNumber === key
  );
  if (index !== -1) {
    const deletedContact = contacts.splice(index, 1)[0];
    operationStack.push(`Deleted contact: ${deletedContact.name}`);
    operationQueue.push(`Deleted contact: ${deletedContact.name}`); // Menambahkan operasi ke dalam antrian operasi
  } else {
    console.log("Contact not found.");
  }
}

// Fungsi untuk mencari kontak berdasarkan nama atau nomor telepon menggunakan Sequential Search
function searchContact(key) {
  const foundContacts = [];
  for (const contact of contacts) {
    if (contact.name.includes(key) || contact.phoneNumber.includes(key)) {
      foundContacts.push(contact);
    }
  }
  return foundContacts;
}

// Fungsi untuk mengurutkan daftar kontak menggunakan Bubble Sort
function sortContacts() {
  for (let i = 0; i < contacts.length - 1; i++) {
    for (let j = 0; j < contacts.length - i - 1; j++) {
      if (contacts[j].name > contacts[j + 1].name) {
        const temp = contacts[j];
        contacts[j] = contacts[j + 1];
        contacts[j + 1] = temp;
      }
    }
  }
  operationStack.push("Sorted contacts");
  operationQueue.push("Sorted contacts"); // Menambahkan operasi ke dalam antrian operasi
}

// Fungsi untuk menampilkan daftar kontak
function displayContacts() {
  console.log("Contacts:");
  for (const contact of contacts) {
    console.log(
      `Name: ${contact.name}, Phone: ${contact.phoneNumber}, Address: ${contact.address}`
    );
  }
}

// Fungsi untuk menampilkan riwayat operasi menggunakan stack
function displayOperationStack() {
  console.log("Operation Stack:");
  for (const operation of operationStack) {
    console.log(operation);
  }
}

// Fungsi untuk menampilkan tugas-tugas menggunakan queue
function processOperationQueue() {
  console.log("Operation Queue:");
  while (operationQueue.length > 0) {
    console.log(operationQueue.shift());
  }
}

// Fungsi untuk menampilkan menu
function displayMenu() {
  console.log("\nMenu:");
  console.log("1. Add Contact");
  console.log("2. Delete Contact");
  console.log("3. Search Contact");
  console.log("4. Sort Contacts");
  console.log("5. Display Contacts");
  console.log("6. Display Operation Stack");
  console.log("7. Process Operation Queue");
  console.log("8. Exit");
}

// Main program
function main() {
  console.log("Welcome to Contact Management System!");
  displayMenu(); // Menampilkan menu pertama kali
  rl.on("line", (input) => {
    switch (input) {
      case "1":
        rl.question("Enter name: ", (name) => {
          rl.question("Enter phone number: ", (phoneNumber) => {
            rl.question("Enter address: ", (address) => {
              addContact(name, phoneNumber, address);
              console.log("Contact added successfully.");
              displayMenu();
            });
          });
        });
        break;
      case "2":
        rl.question("Enter name or phone number to delete: ", (key) => {
          deleteContact(key);
          displayMenu();
        });
        break;
      case "3":
        rl.question("Enter name or phone number to search: ", (key) => {
          const foundContacts = searchContact(key);
          if (foundContacts.length > 0) {
            console.log("Search results:");
            for (const contact of foundContacts) {
              console.log(
                `Name: ${contact.name}, Phone: ${contact.phoneNumber}, Address: ${contact.address}`
              );
            }
          } else {
            console.log("No contacts found.");
          }
          displayMenu();
        });
        break;
      case "4":
        sortContacts();
        console.log("Contacts sorted successfully.");
        displayMenu();
        break;
      case "5":
        displayContacts();
        displayMenu();
        break;
      case "6":
        displayOperationStack();
        displayMenu();
        break;
      case "7":
        processOperationQueue();
        displayMenu();
        break;
      case "8":
        rl.close();
        break;
      default:
        console.log("Invalid input. Please try again.");
        displayMenu();
    }
  });
}

// Panggil main program
main();
