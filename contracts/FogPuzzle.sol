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
    event PuzzleAdded(uint256 puzzleId);

    constructor(uint256 _fogLevel) {
        fogLevel = _fogLevel;
    }

    function setPuzzleSolution(uint256 _puzzleId, string memory _solution) public {
        puzzleHashes[_puzzleId] = keccak256(abi.encodePacked(_solution));

        emit PuzzleAdded(_puzzleId);
    }

    function verifyPuzzleSolution(uint256 _puzzleId, string memory _solution) public {
        require(_puzzleId == playerProgress[msg.sender] + 1, 'Wrong puzzle sequence');
        require(keccak256(abi.encodePacked(_solution)) == puzzleHashes[_puzzleId], 'Incorrect solution');

        playerProgress[msg.sender] = _puzzleId;
        emit PuzzleSolved(msg.sender, _puzzleId);
    }

}