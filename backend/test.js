import bcrypt from "bcryptjs";

const hash = "$2b$10$M5/0eNczzTVUFilsmyodeeQxtth9zIDvgASNP77bHx.ZIoFDogfiy";

const password = "5678904321";

bcrypt.compare(password, hash).then(result => {
  console.log("MATCH:", result);
});