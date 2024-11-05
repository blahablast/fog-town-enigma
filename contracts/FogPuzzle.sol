// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract FogPuzzle {
    mapping(address => uint256) public playerProgress;
    mapping(uint256 => bytes32) private puzzleHashes;
    uint256 public fogLevel;
    mapping(address => uint256) public playerRewards;
    address public owner;

    event PuzzleSolved(address player, uint256 puzzleId);
    event FogLevelChanged(uint256 newLevel);
    event PuzzleAdded(uint256 puzzleId);
    event RewardGiven(address player, uint256 amount);

    constructor(uint256 _fogLevel) {
        fogLevel = _fogLevel;
        owner = msg.sender;
    }

    function setFogLevel(uint256 _newFogLevel) public {
        require(msg.sender == owner, "Only the owner can set fog level");
        fogLevel = _newFogLevel;
        emit FogLevelChanged(_newFogLevel);
    }

    function setPuzzleSolution(uint256 _puzzleId, string memory _solution) public {
        puzzleHashes[_puzzleId] = keccak256(abi.encodePacked(_solution));
        emit PuzzleAdded(_puzzleId);
    }

    function verifyPuzzleSolution(uint256 _puzzleId, string memory _solution) public {
        require(_puzzleId == playerProgress[msg.sender] + 1, "Wrong puzzle sequence");

        if (keccak256(abi.encodePacked(_solution)) != puzzleHashes[_puzzleId]) {
            revert("Incorrect solution");
        }

        playerProgress[msg.sender] = _puzzleId;
        giveReward(msg.sender, 10);
        emit PuzzleSolved(msg.sender, _puzzleId);
    }

    function applyFogPenalty() public {
        fogLevel += 1;
        emit FogLevelChanged(fogLevel);
    }

    function giveReward(address _player, uint256 _amount) internal {
        playerRewards[_player] += _amount;
        emit RewardGiven(_player, _amount);
    }
}
