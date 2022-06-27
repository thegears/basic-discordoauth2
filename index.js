let fetch = require("node-fetch");

class Auth {
    constructor({
        clientId,
        clientSecret,
        redirectUri,
        scopes
    }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.scopes = scopes;
    };

    async Token(code) {
        if (!code) throw new Error("Please give a valid code");
        let params = new URLSearchParams();
        params.append('client_id', this.clientId);
        params.append('client_secret', this.clientSecret);
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', this.redirectUri);
        params.append('scope', this.scopes);


        let tokenReq = await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            body: params,
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        });

        tokenReq = await tokenReq.json();

        if (tokenReq.error) throw new Error(JSON.stringify(tokenReq));

        if (!tokenReq.refresh_token) throw new Error(JSON.stringify(tokenReq));

        this.rt = tokenReq.refresh_token;

        return tokenReq;
    };

    async RefreshToken(rt) {
        if (!rt) throw new Error("Please give a valid refresh token");
        let params = new URLSearchParams();
        params.append('client_id', this.clientId);
        params.append('client_secret', this.clientSecret);
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', `${rt}`);


        let refreshTokenReq = await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            body: params,
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        });

        refreshTokenReq = await refreshTokenReq.json();

        if (refreshTokenReq.error) throw new Error(JSON.stringify(refreshTokenReq));

        if (!refreshTokenReq.refresh_token) throw new Error(JSON.stringify(refreshTokenReq));

        return refreshTokenReq;
    };


    async Me(a) {
        let meReq = await fetch("https://discord.com/api/users/@me", {
            headers: {
                authorization: `${a.token_type} ${a.access_token}`
            }
        });

        meReq = await meReq.json();

        return meReq;
    };

    async Guilds(a) {
        let guildsReq = await fetch("https://discord.com/api/users/@me/guilds", {
            headers: {
                authorization: `${a.token_type} ${a.access_token}`
            }
        });

        guildsReq = await guildsReq.json();

        return guildsReq;
    };
};

module.exports = {
    Auth
};