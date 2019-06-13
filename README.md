# Burner App Stub

This stub app (ie. not a fun and functional app) is wrapped in Svelte.js, which is a tiny JavaScript "framework" (it's actually more of a compiler) that should be easy to rapidly prototype in.

Fork and clone this repo to grab the stub app, then build your own burner app!

## How Does It Work?

This particular burner app format is **VERY OPINIONATED** but that's because I think it's great. I'm using an `ERC223` token, which allows us to send tokens to a contract and call a function in a single call, which is dope.

For this reason, the burner app expects you to pass in the address of the ERC223 token that you're going to use. This is so burner app developers can build a modular application without needing to ask the user which token they're going to use all the time, just grab it from the URL and go. Boom.

The burner app pulls some more information out of the URL, including (dun dun dun) your private key and network ID.

**You will need to visit an address like this for the app to function correctly:**

```
http://localhost:5000/?tokenAddress=0xbe4ed8ec17d7b2e8964482686d22312d4e9d888c&networkId=10#0xe1cd60ad51a380376b8ac2bed705a0ed950cd1cd402f371f4148a0d08dde58ae
```

Notice that the private key is the last piece of this URL and follows a `#` character, which means that a server would not automatically log it. Sure you could just grab it in your app and _send_ it to a server, but... please don't?

If you have any questions/thoughts/feedback/nicholas cage memes please leave them as an issue on the repo.
