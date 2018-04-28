var createDBInstance = function(mongoClient, url, dbName) {
    return new Promise ((resolve, reject)=> {
        mongoClient.connect(url, (error, client)=> {
            if (error) {
                console.log("Connection Failue")
                reject(error);
            } else {
                resolve(client.db(dbName));
            }
            
        })
    })
}

module.exports = createDBInstance;