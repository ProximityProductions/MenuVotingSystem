// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MenuVoting {
    struct MenuItem {
        uint256 id;
        string name;
        uint256 votes;
    }

    MenuItem[] public menuItems;
    mapping(uint256 => bool) public hasVoted;
    mapping(address => bool) public isAdmin;

    event MenuItemAdded(uint256 id, string name);
    event Voted(uint256 itemId, address voter);

    constructor() {
        isAdmin[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can perform this action");
        _;
    }

    function addMenuItem(string memory _name) public onlyAdmin {
        uint256 id = menuItems.length;
        menuItems.push(MenuItem(id, _name, 0));
        emit MenuItemAdded(id, _name);
    }

    function vote(uint256 _itemId) public {
        require(!hasVoted[_itemId], "Already voted for this item");
        menuItems[_itemId].votes++;
        hasVoted[_itemId] = true;
        emit Voted(_itemId, msg.sender);
    }

    function getMenuItem(uint256 _itemId) public view returns (uint256, string memory, uint256) {
        require(_itemId < menuItems.length, "Invalid item ID");
        MenuItem memory item = menuItems[_itemId];
        return (item.id, item.name, item.votes);
    }
}
