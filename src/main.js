const express = require('express');
const app = express();
const port = 3300;

app.listen(port,()=>{
  console.log("🚀服务已启动")
});

app.get('/',(request,response)=>{
  response.send('你好');
})


const testData = [
  {
    id:1,
    name:'洛红颜',
    description:'清水出芙蓉，天然去雕饰'
  },
  {
    id:2,
    name:'甄姬',
    description:'凌波微步，罗袜生尘'
  }
];

app.get('/posts',(request,response)=>{
  response.send(testData);
})

app.get('/posts/:postId',(request,response)=>{
  const {postId} = request.params
  response.send(testData.filter((item,index)=> item.id === parseInt(postId)));
})




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