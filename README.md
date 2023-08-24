# Branch for Heroku Deploy!

## Main errors found: (all erros fixed in this branch).

### - *Nodemon : not found;*
  
  "ifcloud@1.0.0 start <br>
  nodemon node_src/server.js <br>
  sh: 1: nodemon: not found"
  
1. Open the [package.json](package.json) and delete ´ "yarn": "^1.22.19" ´ from dependencies.
2. In the [package.json](package.json), edit the line 10. <br>
from: ´ "start": "nodemon node_src/server.js" ´ <br>
to: ´ "start": "node node_src/server.js" ´

3. The file [node_src/Server.js](node_src/Server.js) , " server.js " needs to be lower case "s".

### - *$PORT ERROR;*

1. In the [node_src/Server.js](node_src/Server.js), edit the line 11: <br>
from: ´ const PORT = process.env.SERVER_PORT; ´ <br>
to: ´ const PORT = process.env.SERVER_PORT || 8080; ´
   

   



  
