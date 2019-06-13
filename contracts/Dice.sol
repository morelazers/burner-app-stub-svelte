pragma solidity 0.5.0;

contract TOKEN {
  function transfer (address to, uint256 value, bytes memory data) public returns (bool success);
}

contract Dice {
    event Win(uint256 amount, uint256 odds, uint256 actual);
    event Lose(uint256 odds, uint256 actual);

    event Event (address from, uint8 value);

    address buxx;

    constructor (address _buxx) public {
      buxx = _buxx;
    }

    function roll (address from, uint256 value, bytes memory data) public returns(bool) {
        require(value >= 10); // always costs 10
        uint8 odds = uint8(data[0]);
        require(odds < 100);
        uint8 actual = uint8(blockhash(block.number - 1)[0]) % 100;
        if (actual > odds) {
            bytes memory empty;
            uint256 winnings = 10 + 100 - odds;
            TOKEN(buxx).transfer(from, winnings, empty);
            emit Win(0, odds, actual);
        } else {
            emit Lose(odds, actual);
        }
        return true;
    }

    // nothing happens, we just accept tokens
    function tokenFallback (address from, uint256 value, bytes memory data) public { }

}