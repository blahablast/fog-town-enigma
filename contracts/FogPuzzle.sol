// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract FogPuzzle {
    // Tracks player progress
    mapping(address => uint256) public playerProgress;
    // Stores Puzzle solution hashes
    mapping(uint256 => bytes32) private puzzleHashes;
    // Current fog level
    uint256 public fogLevel;

    event PuzzleSolved(address player, uint256 puzzleId);
    event FogLevelChanged(uint256 newLevel);

    constructor(uint256 _fogLevel) {
        fogLevel = _fogLevel;
    }

    function verifyPuzzleSolution(uint256 puzzleId, string memory solution) public {
        require(puzzleId == playerProgress[msg.sender] + 1, 'Wrong puzzle sequence');
        require(keccak256(abi.encodePacked(solution)) == puzzleHashes[puzzleId], 'Incorrect Solution');

        playerProgress[msg.sender] = puzzleId;
        emit PuzzleSolved(msg.sender, puzzleId);
    }

}