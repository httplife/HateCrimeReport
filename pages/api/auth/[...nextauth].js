import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
    providers: [
        {
            id: 'wechat',
            name: 'Wechat',
            type: 'oauth',
            version: '2.0',
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
            params: { grant_type: 'authorization_code' },
            accessTokenUrl: 'https://accounts.google.com/o/oauth2/token',
            requestTokenUrl: 'https://accounts.google.com/o/oauth2/auth',
            authorizationUrl: 'https://accounts.google.com/o/oauth2/auth?response_type=code',
            profileUrl: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
            async profile(profile, tokens) {
                // You can use the tokens, in case you want to fetch more profile information
                // For example several OAuth provider does not return e-mail by default.
                // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture
                }
            },
            clientId: process.env.WECHAT_ID,
            clientSecret: process.env.WECHAT_SECRET
        },
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Providers.Twitter({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET
        }),
        Providers.Slack({
            clientId: process.env.SLACK_ID,
            clientSecret: process.env.SLACK_SECRET
        }),
        Providers.LinkedIn({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        Providers.Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        }),
        Providers.Credentials({
            name: 'Credentials',
            authorize: async (credentials) => {
                if (credentials.password && credentials.email) {
                    try {
                        const user = await fetch('/api/data', {
                            method: 'POST',
                            body: {
                                user: {
                                    password: credentials.password,
                                    email: credentials.email
                                },

                                headers: {
                                    accept: '*/*',
                                    'Content-Type': 'application/json'
                                }
                            }
                        })

                        if (user) {
                            return { status: 'success', data: user }
                        }
                    } catch (e) {
                        const errorMessage = e.response.data.message
                        // Redirecting to the login page with error message          in the URL
                        throw new Error(errorMessage)
                    }
                }
            }
        })
    ],

    database: process.env.MONGO_URI + process.env.MONGO_DB,

    jwt: {
        signingKey: process.env.JWT_TOKEN
    },
    pages: {
        signIn: '/login', // Displays signin buttons
        // signOut: '/api/auth/signout', // Displays form with sign out button
        // error: '/error', // Error code passed in query string as ?error=
        // verifyRequest: '/api/auth/verify-request', // Used for check email page
        newUser: null // If set, new users will be directed here on first sign in
    },

    // Enable debug messages in the console if you are having problems
    debug: false
})
