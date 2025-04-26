// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChatApp {
    struct user {
        string name;
        friend[] friendList;
    }

    struct friend {
        address pubkey;
        string name;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruck {
        string name;
        address accountAddress;
    }

    struct Payment {
        address sender;
        address receiver;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;
    AllUserStruck[] getAllUsers;

    mapping(address => mapping(address => Payment[])) private payments;

    event PaymentSent(address indexed sender, address indexed receiver, uint256 amount, uint256 timestamp);

    function checkUserExists(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    function createAccount(string calldata name) public {
        require(checkUserExists(msg.sender) == false, "User Already exists");
        require(bytes(name).length > 0, "Username cannot be empty");

        userList[msg.sender].name = name;
        getAllUsers.push(AllUserStruck(name, msg.sender));
    }

    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExists(pubkey), "user is not registered");
        return userList[pubkey].name;
    }

    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "create an account first");
        require(checkUserExists(friend_key), "user is not registered");
        require(msg.sender != friend_key, "Users cannot add themselves as friend");
        require(checkAlreadyFriends(msg.sender, friend_key) == false, "these users are already friends");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns (bool) {
        if (userList[pubkey1].friendList.length > userList[pubkey2].friendList.length) {
            address temp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = temp;
        }

        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }

        return false;
    }

    function _addFriend(address me, address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    function getMyFriendList() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

    function _getChatCode(address pubkey1, address pubkey2) internal pure returns (bytes32) {
        if (pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else {
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }

    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender), "create an account first");
        require(checkUserExists(friend_key), "user is not recognized");
        require(checkAlreadyFriends(msg.sender, friend_key), "Users are not friends");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);

        allMessages[chatCode].push(newMsg);
    }

    function readMessage(address friend_key) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUser() public view returns (AllUserStruck[] memory) {
        return getAllUsers;
    }

    // ----------------- Payments Section ------------------

    function sendPayment(address friend_key) external payable {
        require(checkUserExists(msg.sender), "Sender not registered");
        require(checkUserExists(friend_key), "Receiver not registered");
        require(checkAlreadyFriends(msg.sender, friend_key), "Users are not friends");
        require(msg.value > 0, "Amount must be greater than zero");

        (bool success, ) = friend_key.call{value: msg.value}("");
        require(success, "Payment failed");

        payments[msg.sender][friend_key].push(Payment({
            sender: msg.sender,
            receiver: friend_key,
            amount: msg.value,
            timestamp: block.timestamp
        }));

        emit PaymentSent(msg.sender, friend_key, msg.value, block.timestamp);
    }

    function getPaymentHistory(address friend_key) external view returns (Payment[] memory) {
        return payments[msg.sender][friend_key];
    }

    // -----------------------------------------------------
}
