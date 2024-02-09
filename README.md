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

### fetchApiKeys
Fetches all API keys for user from within another component

### fetchApiKeysOfType
Fetches all saved api keys for a user by a certain type . Fetches all OpenAI Keys, or all Printify keys. ETC....

# Utilizing API Keys with Component2
After securely managing your API keys with the ApiKeyManager component, you might want to use these keys in different parts of your application. The Component2 component demonstrates how to retrieve and use a specific API key, making it perfect for scenarios where users are required to bring their own API keys for various services.

### Step 4: Implement Component2
Create a file named Component2.jsx in your project, which will be responsible for fetching and using an API key of a specific type. This component leverages the fetchApiKeysOfType utility function to fetch API keys filtered by type, allowing users to select and use an API key for their operations.

```
import React, { useEffect, useState } from 'react';
import { fetchApiKeysOfType } from './cryptoUtils'; // Adjust the path based on your file structure
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const Component2 = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [selectedAPIKey, setSelectedAPIKey] = useState('');
  const userId = useAuthUser()?.id; // This should be dynamically determined based on your auth system
  const apiKeyType = "OpenAI"; // Specify the type of API key you need

  useEffect(() => {
    const loadApiKeys = async () => {
      try {
        const keys = await fetchApiKeysOfType(userId, apiKeyType);
        setApiKeys(keys);
        if (keys.length > 0) {
          setSelectedAPIKey(keys[0].apiKey); // Automatically select the first API key
        }
      } catch (error) {
        console.error(`Failed to fetch API keys of type ${apiKeyType}:`, error);
      }
    };

    loadApiKeys();
  }, [userId, apiKeyType]);

  // Function to handle API key selection from the dropdown
  const handleChange = (event) => {
    setSelectedAPIKey(event.target.value);
  };

  // Example function to demonstrate how the selected API key can be used
  const useSelectedApiKey = () => {
    console.log(`Using API Key: ${selectedAPIKey}`);
    // Implement the logic to use the selected API key here
  };

  return (
    <div>
      <select onChange={handleChange} value={selectedAPIKey}>
        {apiKeys.map((key, index) => (
          <option key={index} value={key.apiKey}>
            {key.apiKeyType} Key {index + 1}
          </option>
        ))}
      </select>
      <button onClick={useSelectedApiKey}>Use Selected API Key</button>
    </div>
  );
};

export default Component2;
```

### Integrating Component2 in Your Application
With Component2 implemented, you can now embed it within your application to allow users to select and use their stored API keys. This is particularly useful for applications that require users to provide their own API keys for accessing third-party services or APIs.

By adding Component2 to your application, you provide users with a seamless way to manage and utilize their API keys securely and efficiently.Perfect for Bring your own API Key applications in react jsx





# Conclusion
By following these steps, you can integrate a secure and efficient API Key Manager into your React applications. This manager utilizes encryption to safeguard your keys and IndexedDB for persistence, offering a comprehensive solution for API key management.




Homepage: [Leumas Technologies](https://leumas.tech)

Contact Us: [Contact Leumas Technologies](https://leumas.tech/contact)

Socials:

- Facebook: [Leumas Technologies Facebook](https://www.facebook.com/leumastechnologies)
- GitHub: [Leumas Technologies GitHub](https://github.com/Leumas-Tech)
- YouTube: [Leumas Technologies YouTube](https://www.youtube.com/channel/UCVTuQGCqS1ucTPiomX-hLWQ)

