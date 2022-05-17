import { ethers } from 'hardhat'
import { Contract } from 'ethers'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import {
  WeirdVaultChallenge,
  WeirdVaultChallengeAttacker,
} from '../typechain-types'

const toWei = ethers.utils.parseEther

/// Template
describe('Challenge Name', async function () {
  let player: SignerWithAddress
  let challenge: Contract
  let attacker: Contract

  before(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('WeirdVaultChallenge')
    challenge = (await Challenge.deploy()) as WeirdVaultChallenge
    const Attacker = await ethers.getContractFactory(
      'WeirdVaultChallengeAttacker'
    )
    attacker = (await Attacker.deploy()) as WeirdVaultChallengeAttacker
  })

  it('Attack', async function () {
    await attacker.fallback({ value: toWei('1') })
    await attacker.destruct(challenge.address)
    await challenge.complete()
    expect(await challenge.isSolved()).to.be.true
  })
})
