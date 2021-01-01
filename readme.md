# KeyValueDataStore:

This is a user-defined library or module in javascript(node.js) which allows you to perform CRD(create, read, delete) operations in a JSON File. To perform read, write and delete operations in JSON we use a module called fs(file stream) which is an inbuilt module in node.js

The methods which are available in the modules are.

1. read(key)
2. write(key,value)
3. keyExisits(key)
4. readFullFile()
5. deleteKey(key)
6. timeToLiveProperty(object)

To import the module if it is present in the same folder:

```javascript
const keyValueDataStore = require("./keyValueDatastore");
```

## 1) read()

This method will get the key as a parameter and returns the corresponding value. Otherwise, It returns the appropriate message or error to the client. we can read the specified key-value pair if it does not exceeds the time to live property.

## 2) write(key,value)

This method will get the key and value as a parameter and append the key-value pair to the specified JSON. This method will append the key-value pair to the JSON only if the key doesn't exist
and the value is a JSON object. Otherwise, It returns the appropriate message or error to the client.

## 3) keyExists(key)

This method is used to check whether the key is present in the JSON file or not. If it exists then it returns the corresponding value otherwise it returns false.

## 4) readFullFile()

This method will read the whole JSON file and returns the result as a single JSON file.

## 5) deleteKey(key)

This method will take the key as a parameter and delete the specified key-value pair If exists. Otherwise, It returns the appropriate message or error to the client. we can delete specified key-value pair only if it does not exceeds the time to live property.

## 6) timeToLiveProperty(object)

This method will take the object as the parameter and calculates the time to live property for the object(key-value pair) and returns a boolean representing whether the key-value pair exceeds the key-value pair or not.
