const anchor = require('@project-serum/anchor');
const assert = require('assert');

describe('meme-num', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
 

  it('Is initialized!', async () => {
    // Add your test here.
    const program = anchor.workspace.MemeNum;

    const memeNumAccount = anchor.web3.Keypair.generate();
    console.log(program.account);
    const tx = await program.rpc.initialize({
      accounts: {
        memeNumAccount: memeNumAccount.publicKey,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
      instructions: [
        await program.account.memeNumAccount.createInstruction(memeNumAccount)],
      signers: [memeNumAccount],
    });

    const memeNumAccountData = await program.account.memeNumAccount(memeNumAccount.publicKey);
    assert(memeNumAccountData.memeNum.eq(new anchor.BN(420)));
    // console.log("Your transaction signature", tx);
  });
});
