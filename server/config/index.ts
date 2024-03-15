export default {
  origin: "https://task-master3-0.vercel.app/",
  origin_dev: "http://localhost:5173",
  mongo_dev: process.env.Mongo_dev,
  mongo_prod: process.env.MongoDB_Prod,
  port: 5000,
  rsaPriviteKey: process.env.RSA_PRIVATE_KEY,
  rsaPublicKey: process.env.RSA_PUBLIC_KEY,
};
