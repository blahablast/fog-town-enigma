const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('FogPuzzle', function () {
  let FogPuzzle
  let fogPuzzle
  let owner
  let player1
  let player2

  beforeEach(async function () {
    ;[owner, player1, player2] = await ethers.getSigners()
    FogPuzzle = await ethers.getContractFactory('FogPuzzle')
    fogPuzzle = await FogPuzzle.deploy(50)
  })

  describe('Deployment', function () {
    it('Should set the initial fog level', async function () {
      expect(await fogPuzzle.fogLevel()).to.equal(50)
    })

    it('Should initialize player progress to 0', async function () {
      expect(await fogPuzzle.playerProgress(player1.address)).to.equal(0)
    })
  })

  describe('Puzzle Management', function () {
    it('Should emit event when adding a puzzle', async function () {
      await expect(fogPuzzle.setPuzzleSolution(1, 'forest'))
        .to.emit(fogPuzzle, 'PuzzleAdded')
        .withArgs(1)
    })

    it('Should allow adding multiple puzzles', async function () {
      await fogPuzzle.setPuzzleSolution(1, 'forest')
      await fogPuzzle.setPuzzleSolution(2, 'mountain')
      // Success is implied by lack of revert
    })
  })

  describe('Puzzle Solving', function () {
    beforeEach(async function () {
      // Set up a puzzle before each test in this block
      await fogPuzzle.setPuzzleSolution(1, 'forest')
    })

    it('Should allow solving puzzle with correct solution', async function () {
      await fogPuzzle.connect(player1).verifyPuzzleSolution(1, 'forest')
      expect(await fogPuzzle.playerProgress(player1.address)).to.equal(1)
    })

    it('Should reject incorrect solutions', async function () {
      await expect(
        fogPuzzle.connect(player1).verifyPuzzleSolution(1, 'wrong')
      ).to.be.revertedWith('Incorrect solution')
    })

    it('Should only allow solving next puzzle in sequence', async function () {
      await fogPuzzle.setPuzzleSolution(2, 'mountain')
      await expect(
        fogPuzzle.connect(player1).verifyPuzzleSolution(2, 'mountain')
      ).to.be.revertedWith('Wrong puzzle sequence')
    })
  })
})
