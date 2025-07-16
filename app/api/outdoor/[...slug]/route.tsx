export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  return handleRequest("GET", slug, request);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  return handleRequest("POST", slug, request);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  return handleRequest("DELETE", slug, request);
}

async function handleRequest(
  method: string,
  slug: string[],
  ...args: [Request]
) {
  const request = args[0];
  const targetUrl = new URL(`${process.env.BACKEND_URL}${slug.join("/")}`);
  const response = await fetch(targetUrl.href, {
    method,
    headers: request.headers as any,
    body: request.body,
    redirect: "manual",
    // @ts-ignore
    duplex: "half",
  });
  const data = await response.json();
  console.log("Response from backend:", data);
  return Response.json(data);
}
