"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi";
import axios from 'axios';
import UniswapIcon from "./icons/uniswap.icon"
import TokenSelect from "@/components/home/token-select"
import { useEffect, useState } from "react"

interface ISwapFormData {
  payToken: string;
  payAmount: number;
  receiveToken: string;
  receiveAmount: number;
}

export default function Home() {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [_isConnected, _setIsConnected] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<ISwapFormData>({
    payToken: "ETH",
    payAmount: 0,
    receiveToken: "USDC",
    receiveAmount: 0
  })

  useEffect(() => {
    _setIsConnected(isConnected);
  }, [isConnected])

  const onTokenChange = (token: string, isPayToken: boolean) => {
    const switchKey = isPayToken ? 'pay' : 'receive';
    const oppositeKey = !isPayToken ? 'pay' : 'receive';

    const isCounterPartyToken = (formData as any)[oppositeKey + "Token"] === token;
    if (isCounterPartyToken)
      setFormData((prev: ISwapFormData) => {
        return {
          ...prev,
          [oppositeKey + "Token"]: (prev as any)[switchKey + "Token"],
          [switchKey + "Token"]: token,
          [switchKey + "Amount"]: 0
        }
      })
    else
      setFormData((prev: ISwapFormData) => {
        return {
          ...prev,
          [switchKey + "Token"]: token,
          [switchKey + "Amount"]: 0
        }
      })
  }

  const { data: swapData, refetch: refetchSwap } = useQuery({
    queryKey: ["swapData", address],
    queryFn: async () => {
      const res: any = await axios.get(
        `/api/swap/${address}`
      );

      return res.data;
    },
    enabled: !!address,
  });

  useEffect(() => {
    refetchSwap();
  }, [formData.payToken, formData.receiveToken])


  if (_isConnected === null) {
    return <div className="w-full text-center mt-[20vh]">Loading...</div>
  }

  return (
    <main className="w-full min-h-screen">
      <div className="w-full flex justify-end">
        <ConnectButton label="Connect" accountStatus="address" />
      </div>
      <div className="flex flex-wrap justify-center py-[10vh]">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex flex-wrap justify-center items-center text-[#fc72ff]">
              <UniswapIcon />
              Swap
            </CardTitle>
            <CardDescription className="text-center">Execute swap via Uniswap v3.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="w-full flex flex-col space-y-1.5 p-3 ">
                  <Label htmlFor="name">You Pay</Label>
                  <Input id="payToken" placeholder="0" />
                  <TokenSelect selectedToken={formData.payToken} onTokenChange={(e) => onTokenChange(e, true)} />
                </div>
                <div className="w-full flex flex-col space-y-1.5 p-3 ">
                  <Label htmlFor="name">You Receive</Label>
                  <Input id="receiveToken" placeholder="0" />
                  <TokenSelect selectedToken={formData.receiveToken} onTokenChange={(e) => onTokenChange(e, false)} />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center pb-10">
            {
              _isConnected ?
                <Button>Swap</Button>
                :
                <ConnectButton label="Connect" accountStatus="address" />
            }
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}


