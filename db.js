const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = conn.define('user', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

User.addHook('beforeSave', async(user)=> {
  user.password = await bcrypt.hash(user.password, 5);
});

User.authenticate = async function(credentials){
  const user = await this.findOne({
    where: {
      username: credentials.username
    } 
  });
  if(user && await bcrypt.compare(credentials.password, user.password)){
    return jwt.sign({ id: user.id}, process.env.JWT);
  }
  else {
    const error = new Error('Bad Credentials');
    error.status = 401;
    throw error;
  }
}

User.findByToken = async function findByToken(token){
  try {
    const id = jwt.verify(token, process.env.JWT).id;
    const user = await User.findByPk(id);
    if(!user){
      throw 'error';
    }
    return user;
  }
  catch(ex){
    const error = new Error('bad token');
    error.status = 401;
    throw error;
  }

}


module.exports = {
  conn,
  User
};
