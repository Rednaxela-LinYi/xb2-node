import app from './app';
import { APP_PORT } from './app/app.config';
import { connection } from './app/database/mysql';
import { getPosts } from './post/post.service';

app.listen(APP_PORT, () => {
  console.log('🚀`服务已启动');
});

connection.connect((error) => {
  if (error) {
    console.log(`连接数据库失败，错误原因：${error.message}}`);
  } else {
    console.log('连接数据成功了捏');
  }
});

app.get('/', (request, response) => {
  response.send('你好');
});

app.get('/posts', (request, response) => {});

// app.get('/posts/:postId', (request, response) => {
//   const { postId } = request.params;
//   response.send(testData.filter((item, index) => item.id === parseInt(postId)));
// });

app.post('/posts', (request, response) => {
  //console.log(request);
  const { content } = request.body;
  //response.status(201);
  response.send({
    message: `这是成功创建的内容：${content}`,
  });
});

// const http = require('http');

// const server = http.createServer((request,response) => {

//   switch(request.url){

//   }
//   //查看请求header的user-agent
//   console.log(request.headers['user-agent'])

//   //规定响应头的Content-Type，客户端会根据这个确定返回内容的显示格式
//   response.writeHead(200,{
//     'Content-Type': 'text/html'
//   })
//   response.write('hello');
//   response.end();
// })

// server.listen(3000,()=>{
//   console.log("🚀服务已启动")
// })
