# React-JSX-API-Key-Manager
This one page react app will allow users to save API keys securely. Perfect for applications where Bring Your Own API Key is necessary. This allow us to store API keys for the user, without any of the vulnerabilities / actually storing them in our backend, With Full CRUD control for the user, This can be modified as needed

## API Key Manager Documentation
The API Key Manager is a React component designed to securely store and manage API keys using encryption, with data persistence in IndexedDB. This document provides a comprehensive guide on how to embed the API Key Manager in your React application, starting from setting up a project with Vite and Tailwind CSS to integrating the APIKeyManager component.

Setup Your Project
## Step 1: Create a New React Project with Vite
First, you need to create a new React project using Vite. Vite provides a fast development environment with out-of-the-box React support.

```
npm create vite@latest your-project-name --template react
cd your-project-name
npm install
```

## Step 2: Install Tailwind CSS
Next, set up Tailwind CSS in your project for styling:

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
After initializing Tailwind, configure it by editing tailwind.config.js. You can customize your configuration as needed.

## Step 3: Add React Dependencies
Install additional dependencies required for the API Key Manager:

```
npm install react-auth-kit idb react-epic-spinners
```
react-auth-kit for handling authentication states.
idb as a wrapper for IndexedDB to use it more easily with promises.
react-epic-spinners for loading spinners.

## Step 4: Set Up Tailwind CSS in Your Project
In your project's entry CSS file (e.g., index.css), import Tailwind CSS directives:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Ensure this file is imported in your project's entry JS file (e.g., main.jsx or index.js).

# Integrate API Key Manager
## Step 1: Add the cryptoUtils.js
Create a file named cryptoUtils.js in your project and add the provided cryptographic utility functions. These functions include generating an encryption key, encrypting and decrypting data, and performing CRUD operations in IndexedDB.

## Step 2: Add the ApiKeyManager Component
Create a ApiKeyManager.jsx file and paste the provided ApiKeyManager component code into it. This component uses the cryptographic utility functions to securely manage API keys.

## Step 3: Use the ApiKeyManager in Your Application
Incorporate the ApiKeyManager component into your application. For instance, you can add it to your App.jsx:


```
import React from 'react';
import ApiKeyManager from './ApiKeyManager';

function App() {
  return (
    <div className="App">
      <ApiKeyManager />
    </div>
  );
}

export default App;
```
Understanding the cryptoUtils.js Functions
### generateEncryptionKey: 
Generates an AES-GCM encryption key derived from the user's ID and optional salt, using PBKDF2. This key is used for encrypting and decrypting the API keys.

### encryptData: 
Encrypts the API key data using the generated encryption key and returns the encrypted data along with the IV (Initialization Vector).

### decryptData: 
Decrypts the encrypted API key data using the same encryption key and IV.

### saveToIndexedDB: 
Saves the encrypted API key data to IndexedDB under the user's ID.

### getFromIndexedDB: 
Retrieves encrypted API key data from IndexedDB for the specified user and returns it as an array.

### deleteApiKeyFromDB: 
Deletes a specific API key from the user's stored data in IndexedDB based on its index.

### deleteAllApiKeysFromDB: 
Deletes all API keys for a user from IndexedDB.

Conclusion
By following these steps, you can integrate a secure and efficient API Key Manager into your React applications. This manager utilizes encryption to safeguard your keys and IndexedDB for persistence, offering a comprehensive solution for API key management.




Homepage: [Leumas Technologies](https://leumas.tech)

Contact Us: [Contact Leumas Technologies](https://leumas.tech/contact)

Socials:

- Facebook: [Leumas Technologies Facebook](https://www.facebook.com/leumastechnologies)
- GitHub: [Leumas Technologies GitHub](https://github.com/Leumas-Tech)
- YouTube: [Leumas Technologies YouTube](https://www.youtube.com/channel/UCVTuQGCqS1ucTPiomX-hLWQ)

