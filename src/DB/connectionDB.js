import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("blogappdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});





export const checkConnectionDB = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};


export const checkSyncDB = async () => {
    await sequelize.sync ({ alter:false}).then(() =>{
        console.log(`DB synced succes`);
        
    }).catch((error) => {
        console.log(error);
        
    })
}
