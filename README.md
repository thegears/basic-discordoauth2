# Basic Discord OAUTH2

Example Usage

```js
const bdoa = require("basic-discordoauth2");
const Auth = new bdoa.Auth({
    clientId: "client id",
    clientSecret: "client secret",
    redirectUri: "redirect uri",
    scopes: ["identify", "guilds"]
});


(async () => {
	let token = await Auth.Token("code");
	let refreshToken = await Auth.RefreshToken(token.refresh_token);

	await Auth.Guilds(refreshToken).then(a2 => {
		console.log(a2);
	});

	refreshToken = await Auth.RefreshToken(refreshToken.refresh_token);

	await Auth.Me(refreshToken).then(a2 => {
		console.log(a2);
	});
})();
```