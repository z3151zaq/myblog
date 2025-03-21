export async function GET(request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params; // 'a', 'b', or 'c'
  console.log(`Handling GET request for ${slug.join("/")}`);
  const targetUrl = new URL(`https://webcoreapi20250312072915-hnageph7hyedd8g4.newzealandnorth-01.azurewebsites.net/${slug.join("/")}`);
  // targetUrl.search = new URLSearchParams(query as any).toString();
  console.log("@@@@targetUrl", targetUrl);
  const response = await fetch(targetUrl.href, {
    method: "get", // 保留原始请求方法
    // headers: req.headers as any, // 保留原始请求头
    // body: req.body, // 保留原始请求体
    redirect: "manual" // 禁止自动处理重定向
  });
  console.log("@@@response", response);
  return Response.json(await response.json());
}
