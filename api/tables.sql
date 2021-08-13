CREATE TABLE IF NOT EXISTS mangarosa_collaborators (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  phone VARCHAR(15),
  validated BOOLEAN DEFAULT 0,
  date DATETIME
);

CREATE TABLE IF NOT EXISTS mangarosa_collaborators_knowledges (
collaborator_id VARCHAR(255) ,
knowledge_1 VARCHAR(255) NOT NULL,
knowledge_2 VARCHAR(255),
knowledge_3 VARCHAR(255),
FOREIGN KEY (collaborator_id) REFERENCES mangarosa_collaborators(id)
);
