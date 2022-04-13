// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {
    //creating data structure

    struct Data {
        string name;
        string url;
    }

    // declearing user files as a map (array of object with property address)
    mapping(address => Data[]) public userFiles;

    // declearing public files as an array of data struc
    Data[] internal publicFiles;

    // add user data to the array
    function addUserFile(string memory name, string memory url) public {
        Data memory newData = Data(name, url);
        userFiles[msg.sender].push(newData);
    }

    function getUserFiles() public view returns (Data[] memory) {
        return userFiles[msg.sender];
    }

    function savePublicFiles(string memory name, string memory url)
        public
        returns (bool)
    {
        Data memory newFile = Data(name, url);
        publicFiles.push(newFile);
        return true;
    }

    function getPublicFiles() public view returns (Data[] memory) {
        return publicFiles;
    }

    function shareFileWithAUser(
        address to,
        string memory name,
        string memory url
    ) public returns (bool) {
        Data memory newData = Data(name, url);
        userFiles[to].push(newData);
        return true;
    }
}
