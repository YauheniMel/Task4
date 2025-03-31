module.exports = () => `
  CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL auto_increment,   
  firstName  varchar(100) NOT NULL,
  lastName  varchar(100) NOT NULL,
  email  varchar(100) NOT NULL UNIQUE,
  login  varchar(100) NOT NULL UNIQUE,
  password  varchar(100) NOT NULL,
  sex  enum('male','female') NOT NULL,
  state  enum('online','offline','blocked') NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
`;
