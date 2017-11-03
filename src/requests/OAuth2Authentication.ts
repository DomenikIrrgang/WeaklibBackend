/**
 * Represents a authentication with a OAuth2 API.
 */
export class OAuth2Authentication {
    /**
     * Host of the OAuth2 API.
     */
    public host: string;

    /**
     * Path for the host of the authentication service.
     */
    public path: string;

    /**
     * Secret that is given received the API.
     */
    public secret: string;

    /**
     * Username for the OAuth2 service.
     */
    public username: string;

    /**
     * Password for the OAuth2 service.
     */
    public password: string;
}