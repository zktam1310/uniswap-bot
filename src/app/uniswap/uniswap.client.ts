import { ethers } from 'ethers'
import { CurrentConfig } from '../config'
import { computePoolAddress } from '@uniswap/v3-sdk'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
} from './uniswap.constant'
import { getProvider } from '../libs/providers'
import { toReadableAmount, fromReadableAmount } from '../libs/conversion'

export async function quote(tokenIn: string, tokenOut: string, amountIn: number, poolFee: number): Promise<string> {
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    getProvider()
  )

  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
  })


  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    poolConstants.token0,
    poolConstants.token1,
    poolConstants.fee,
    fromReadableAmount(
      CurrentConfig.tokens.amountIn,
      CurrentConfig.tokens.in.decimals
    ).toString(),
    0
  )

  return toReadableAmount(quotedAmountOut, CurrentConfig.tokens.out.decimals)
}