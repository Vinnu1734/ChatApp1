import hre from "hardhat";

async function  main(){
    const ChatApp=await hre.ethers.getContractFactory('ChatApp');
    const chatApp=await ChatApp.deploy();

    await chatApp.waitForDeployment();

    console.log(`contract deployed at ${ await chatApp.getAddress()}`)
}

main().catch((e)=>{
    console.log(`error in deploy.js ${e}`);
})