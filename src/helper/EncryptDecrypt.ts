import { REACT_APP_SECRET_KEY } from "../config/App.config";
import CryptoJS from "crypto-js";

export const EncryptData = (data: any): any | null => {
    try {
        const encryptedData: string = CryptoJS.AES.encrypt(JSON.stringify(data), REACT_APP_SECRET_KEY).toString();
        return encryptedData;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const DecryptData = (data: string): any | null => {
    try {
        const decryptedBytes = CryptoJS.AES.decrypt(data, REACT_APP_SECRET_KEY);
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
        
        // Check if decryptedData is valid JSON
        return isValidJSON(decryptedData) ? JSON.parse(decryptedData) : decryptedData;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Function to check if a string is valid JSON
const isValidJSON = (str: string): boolean => {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
};
