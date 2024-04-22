import { NextRequest } from "next/server";

import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.RPC_URI)
});


export const GET = async (req: NextRequest, { params }: any) => {
  try {
    // const mintStage = req.nextUrl.searchParams.get("stage");
    const address = params.address as string;
    console.log(address);

    let eligible: any[] = [];


    if (eligible.length < 1) {
      return new Response(
        JSON.stringify({
          error: "not whitelisted",
        }),
        {
          status: 400,
        }
      );
    }


    return new Response(JSON.stringify({
      success: true
    }), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
    });
  }
};
