import { useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import { encryptData, decryptData, saveToIndexedDB, getFromIndexedDB, generateEncryptionKey , deleteApiKeyFromDB , deleteAllApiKeysFromDB  } from './cryptoUtils';
import { AtomSpinner } from 'react-epic-spinners';

const ApiKeyManager = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyType, setApiKeyType] = useState(''); // State to store the API key type
  const authUser = useAuthUser(); // Use the hook to get the authenticated user
  const userId = authUser?.id; // Assuming the user object has an id property

  const [apiKeys, setApiKeys] = useState([]);

// Function to delete an API key
const deleteApiKey = async (indexToDelete) => {
    const currentApiKeys = await getFromIndexedDB('apiKeys', userId);

    if (!Array.isArray(currentApiKeys) || indexToDelete < 0 || indexToDelete >= currentApiKeys.length) {
        console.error('API keys data structure error or invalid index:', currentApiKeys, indexToDelete);
        alert('Error deleting API key. Please try again.');
        return;
    }

    await deleteApiKeyFromDB('apiKeys', userId, indexToDelete);

    // Update local state if you're maintaining one
    const updatedApiKeys = await getFromIndexedDB('apiKeys', userId);
    setApiKeys(updatedApiKeys);

    console.log('API key deleted successfully.');
};



const deleteAll = async () => {
    // First confirmation
    if (!window.confirm("Are you sure you want to delete all API Keys?")) {
        return;
    }

    // Second confirmation
    if (!window.confirm("Are you positive?")) {
        return;
    }

    // Proceed with deletion if both confirmations are true
    await deleteAllApiKeysFromDB('apiKeys', userId);

    // Clear the local state as well
    setApiKeys([]);

    alert('All API keys have been deleted.');
};





  


  const handleSaveKey = async () => {
    if (!userId) {
      alert('User is not authenticated.');
      return;
    }
  
    try {
        const { key: encryptionKey, salt } = await generateEncryptionKey(userId, true);
        // True indicates generation with a new salt
      const { encryptedData, iv } = await encryptData(JSON.stringify({ apiKey, apiKeyType }), encryptionKey);
      const dataToStore = { encryptedData, iv, salt }; // Include salt
      await saveToIndexedDB('apiKeys', userId, dataToStore);
      setApiKey('');
      setApiKeyType('');
      alert('API Key encrypted and stored securely.');
    } catch (error) {
      console.error('Error saving the API key:', error);
      alert('Failed to save API Key.');
    }
  };
  

  const handleRetrieveKey = async () => {
    if (!userId) {
        alert('User is not authenticated.');
        return;
    }

    try {
        const dataFromDB = await getFromIndexedDB('apiKeys', userId);
        if (!dataFromDB || dataFromDB.length === 0) {
            alert('No API keys found for this user.');
            return;
        }

        // Ensure dataFromDB is an array of objects, not nested arrays
        const apiKeysArray = Array.isArray(dataFromDB) ? dataFromDB : [dataFromDB];
        const filteredApiKeysArray = apiKeysArray.filter(item => !Array.isArray(item));

        const keys = await Promise.all(filteredApiKeysArray.map(async (keyObj) => {
            const { encryptedData, iv, salt } = keyObj;
            const { key: encryptionKey } = await generateEncryptionKey(userId, false, salt);
            const decryptedData = await decryptData({ encryptedData, iv }, encryptionKey);
            return JSON.parse(decryptedData);
        }));

        setApiKeys(keys);
    } catch (error) {
        console.error('Error retrieving the API keys:', error);
        alert(`Failed to retrieve API Keys: ${error instanceof Error ? error : 'Unknown error'}`);
    }
};


// Styles
const buttonStyle = `border border-blue-400 p-2 rounded-lg bg-blue-400 hover:bg-black text-white text-xs`

  
  
return (
    <div className="container mx-auto p-4">
      <div className="mb-4 w-full flex gap-2 py-4 px-2">
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter API Key"
          className="bg-transparent w-full border border-blue-400 rounded-lg p-2"
        />
        <select
          value={apiKeyType}
          onChange={(e) => setApiKeyType(e.target.value)}
          className="w-full bg-transparent shadow-3xl border border-blue-400 rounded-lg px-2"
        >
          <option className='bg-blue-400 text-white' value="">Select Key Type</option>
          <option className='bg-blue-400 text-white' value="OpenAI">OpenAI</option>
          <option className='bg-blue-400 text-white' value="Printify">Printify</option>
          {/* Add more API key types here as needed */}
        </select>

        
      </div>

      <div className='flex w-full items-center justify-between p-4'>
      <button onClick={deleteAll} className={`${buttonStyle}`}>Delete All</button>
      <button onClick={handleSaveKey} className={`${buttonStyle}`}>Save Key</button>
      <button onClick={handleRetrieveKey} className={`${buttonStyle}`}>View Keys</button>
      </div>
     
  
      <div className="mt-4 w-full flex flex-col items-center gap-2 p-2 border max-h-64 min-h-64 overflow-y-scroll">
  {apiKeys.length === 0 ? (
    <div className="flex flex-col items-center justify-center">
      <AtomSpinner size={60} color="#4299E1" /> {/* Customize size and color as needed */}
      <p className="text-center text-blue-500 mt-4">Loading API keys...</p>
      <button
        onClick={handleRetrieveKey}
        className="mt-4 btn bg-blue-500 hover:bg-blue-700 text-white rounded-lg shadow px-4 py-2"
      >
        Retrieve API Keys
      </button>
    </div>
  ) : (
    apiKeys.map((keyData, index) => (
        <div key={index} className="flex items-center justify-between border p-4 rounded-lg mb-2 border border-red-400 w-full">
        <div>
          <p>Type: <span className="font-semibold">{keyData.apiKeyType}</span></p>
          <p>Key: <span className="font-semibold">{keyData.apiKey}</span></p>
        </div>
        <div>
          <button className={`${buttonStyle}`} onClick={() => deleteApiKey(index)}>Delete</button>
        </div>
      </div>
    ))
  )}
</div>



    </div>
  );
  
};

export default ApiKeyManager;




// // Alternative Base64 to ArrayBuffer conversion that bypasses atob()
// function base64ToUint8Array(base64) {
//     const padding = '='.repeat((4 - (base64.length % 4)) % 4);
//     const base64Safe = (base64 + padding)
//         .replace(/\-/g, '+')
//         .replace(/_/g, '/');
//     const rawData = window.atob(base64Safe);
//     const outputArray = new Uint8Array(rawData.length);

//     for (let i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i);
//     }

//     return outputArray;
// }

// function byteArrayStringToUint8Array(byteArray) {
//     // Check if the input is already a Uint8Array
//     if (byteArray instanceof Uint8Array) {
//         console.log("Input is already a Uint8Array", byteArray);
//         return byteArray;
//     } else if (typeof byteArray === 'string') {
//         // If the input is a string, then split and convert
//         console.log("Converting string to Uint8Array", byteArray);
//         const byteValues = byteArray.split(',').map(Number);
//         return new Uint8Array(byteValues);
//     } else {
//         throw new Error('Input format not recognized');
//     }
// }