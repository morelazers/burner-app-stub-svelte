<script>
  import QRCode from "qrcode";

  import { wallet } from "./stores/wallet";
  import { dapp } from "./stores/dapp";

  export let tokenAddress;
  export let networkId;
  export let privateKey;

  let tokenBalance = wallet.tokenBalance;
  let baseAssetBalance = wallet.baseAssetBalance;
  let pot = dapp.pot;
  let status = dapp.status;

  let qrsrc;

  QRCode.toDataURL(
    wallet.address,
    {
      margin: 1,
      color: {
        light: "#A7E4AE",
        dark: "#2A333E"
      },
      scale: 10
    },
    (err, url) => {
      qrsrc = url;
    }
  );
</script>

<h1>Hello!</h1>
<h3>Token: {tokenAddress}</h3>
<h3>Network: {networkId}</h3>
<h3>Private Key: {privateKey}</h3>
<h3>Address: {wallet.address}</h3>
<h3>Token Balance: {$tokenBalance}</h3>
<h3>Debug Balance: {$baseAssetBalance}</h3>
<h3>Pot Size: {$pot}</h3>
<h3>Status: {$status}</h3>

<button
  on:click={() => {
    wallet.sendTokens('0x00b5ed61F580ab67Bf62aDf0320Da4e9C1bb93D1', 1);
  }}>
  Send Tokens!
</button>
<img src={qrsrc} />
<button
  on:click={() => {
    console.log($status);
    if ($status == 'INITIALISED') {
      dapp.roll();
    }
  }}>
  {#if $status == 'INITIALISED'}Roll!{:else}Waiting{/if}
</button>
