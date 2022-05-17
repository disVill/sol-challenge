import { ethers } from 'hardhat'
import { Contract } from 'ethers'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import {
  OpenVaultChallenge,
  OpenVaultChallengeAttacker,
} from '../typechain-types'

const toWei = ethers.utils.parseEther

/// Template
describe('Challenge Name', async function () {
  let player: SignerWithAddress
  let challenge: Contract
  let attacker: Contract

  before(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('OpenVaultChallenge')
    challenge = (await Challenge.deploy({
      value: toWei('1'),
    })) as OpenVaultChallenge

    const Attacker = await ethers.getContractFactory(
      'OpenVaultChallengeAttacker'
    )
    attacker = (await Attacker.deploy(
      challenge.address
    )) as OpenVaultChallengeAttacker
  })

  it('Attack', async function () {
    expect(await challenge.isSolved()).to.be.true
  })
})
