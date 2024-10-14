import { initialEdges, initialNodes } from "@/app/Constants";
import { NextRequest } from "next/server";
import { PUTRequestSchema } from "./schema";

export async function GET() {
  return new Response(
    JSON.stringify({
      nodes: initialNodes,
      edges: initialEdges,
    }),
    {
      status: 200,
    }
  );
}

export async function PUT(request: NextRequest) {
  const data = await request.json();

  const validationResult = PUTRequestSchema.safeParse(data);

  if (!validationResult.success) {
    console.error(
      "Validation status ERROR",
      JSON.stringify(validationResult.error, null, 2)
    );
  } else {
    console.log(
      "Validation status OK",
      JSON.stringify(validationResult.data, null, 2)
    );
  }

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
