const { write } = require("fs");
const { Module } = require("module");
const path = require("path");
class keyValueDataStore{
    fs = require("fs");
    constructor(filePath=process.cwd()+"/database.json") {
        this.filePath=path.normalize(filePath);
        // Checking if the file exists
        if (this.fs.existsSync(this.filePath)) {
            try 
            {
                this.fs.openSync(this.filePath,"a+");
                console.log("File opened Successfully");
            }
            catch(err) 
            {
                console.log("Unable to open the file");
            }
        }
        // Creating a new file if the file does not exists
        else {
            try 
            {
                this.fs.openSync(this.filePath,"w+");
                this.fs.writeFileSync(this.filePath, JSON.stringify(new Object));
                console.log("File created Succesfully");
            }
            catch(err)
            {
                console.log("Unable to create the file");
            }
        }
    }

    // To check if the key already exists in the json file
    keyExists(key)
    {
        var readResult=this.readFullFile();
        var keys=Object.keys(readResult);
        if(keys.includes(key))
        return readResult[key];
        else 
        return false;
    }

    // To read the full json file using fs module
    readFullFile() {
        try
        {
            var result;
            result=this.fs.readFileSync(this.filePath,"utf-8");
            return JSON.parse(result);
        }
        catch(err)
        {
            console.log("Unable to read");
            return new Object;
        }
    }

    // To write the data in the json file using fs module
    write(key, value) {
        if(this.keyExists(key))
        return "Key already exists";
        else if(!(typeof value=== typeof new Object))
        return "Value Should be a json object";
        else 
        {
            try 
            {
                var readResult=this.readFullFile();        
                readResult[key]=value;
                readResult[key]["createdTime"]=Date.now();
                this.fs.writeFileSync(this.filePath,JSON.stringify(readResult,null,2));
                return "Content writted Successfully";
            }
            catch(err)
            {
                return "An error has occured";
            }
        }
    }

    // To check whether the key exceeds the time to live property
    timeToLiveProperty(inputObject)
    {
        if(Object.keys(inputObject).includes("timeToLive"))
        {
            var result=inputObject.createdTime+(inputObject.timeToLive*1000);
            if(result>=Date.now())
            return true;
            else
            return false;
        }
        return true;
    }

    // To delete the key value pair
    deleteKey(key)
    {   
        if(this.keyExists(key))
        {
            var readResult=this.readFullFile();
            if(!(this.timeToLiveProperty(readResult[key])))
            return "The key exceeds its time to live property cannot delete";
            else if(delete readResult[key])
            {
                try 
                {
                    this.fs.writeFileSync(this.filePath,JSON.stringify(readResult,null,2));
                    return "Key deleted Successfully";
                }
                catch(err)
                {
                    return "Unable to delete the key";
                }
            }
            else 
            return "Unable to delete the key";
        }
        else
        return "Key does not exists";
    }


    // To read the value of the specified key
    read(key)
    {
        var readResult=this.keyExists(key);
        if(!(this.timeToLiveProperty(readResult)))
        return "The key exists its time to live property cannot read";
        else if(readResult)
        return readResult;
        else 
        {
            console.log("Key does not exists");
            return new Object;
        }
    }
}


// Exporting the module
module.exports=keyValueDataStore;