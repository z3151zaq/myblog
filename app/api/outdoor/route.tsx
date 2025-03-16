import { NextApiRequest, NextApiResponse } from "next";

export const dynamic = 'force-static'

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   // 获取请求的路径和查询参数
//   const { pathname, query } = req;
//   console.log('@@@@我在处理',query,pathname)
//   // 构造目标 URL
//   const targetUrl = new URL(`https://webcoreapi20250312072915-hnageph7hyedd8g4.newzealandnorth-01.azurewebsites.net/${pathname}`);
//   targetUrl.search = new URLSearchParams(query as any).toString();

//   try {
//     // 转发请求到目标 URL
//     // const response = await fetch(targetUrl.href, {
//     //   method: req.method, // 保留原始请求方法
//     //   headers: req.headers as any, // 保留原始请求头
//     //   body: req.body, // 保留原始请求体
//     //   redirect: "manual", // 禁止自动处理重定向
//     // });

//     // 将响应数据和状态码返回给客户端
//     // res.status(response.status).send(response.body);
//     return Response.json({ message: 'Hello from Next.js!' })
//   } catch (error) {
//     console.error("Error forwarding request:", error);
//     res.status(500).json({ error: "Failed to forward request" });
//   }
// }

export async function GET(request: NextApiRequest) {
    const path = request.nextUrl.pathname;
    console.log(`Handling GET request for ${path}`);
    return Response.json({ message: `GET request handled for ${path}` });
}