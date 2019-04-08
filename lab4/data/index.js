const data = require("./data.json");

async function getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // find project
        const hasProject = data[id -1];
        if (hasProject) {
            resolve(hasProject);
        } else {
            reject(new Error("data not found"));
        }

      },5000);
    });
}

module.exports={
    getById
}