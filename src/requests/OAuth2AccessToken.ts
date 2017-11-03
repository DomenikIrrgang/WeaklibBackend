/**
 * Represents a OAuth2 access token.
 */
export class OAuth2AccessToken {
    /**
     * The actual token.
     */
    public token: string;

    /**
     * The time the token has been received.
     */
    public received: number;

    /**
     * The lifespan of the tokeb. Received + lifetime is the time the token expires.
     */
    public lifetime: number;

    /**
     * Type of the token.
     */
    public type: string;
}