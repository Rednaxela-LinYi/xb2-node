
const http = require('http');

const server = http.createServer((request,response) => {




  
  switch(request.url){

  }
  //查看请求header的user-agent
  console.log(request.headers['user-agent'])
  
  //规定响应头的Content-Type，客户端会根据这个确定返回内容的显示格式
  response.writeHead(200,{
    'Content-Type': 'text/html'
  })
  response.write('hello');
  response.end();
})


server.listen(3000,()=>{
  console.log("🚀服务已启动")
})