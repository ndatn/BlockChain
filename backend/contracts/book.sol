// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Book {
    address[16] public adopters;

    function adopt(uint bookId) public returns (uint) {
        require(bookId >= 0 && bookId <= 15);

        adopters[bookId] = msg.sender;

        return bookId;
    }

    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
}
