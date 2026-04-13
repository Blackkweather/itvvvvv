declare module 'jsonwebtoken' {
  export interface SignOptions {
    expiresIn?: string | number;
    algorithm?: string;
    header?: any;
    encoding?: string;
    issuer?: string;
    subject?: string;
    audience?: string | string[];
    jwtid?: string;
    mutatePayload?: boolean;
    noTimestamp?: boolean;
    keyid?: string;
  }

  export function sign(
    payload: any,
    secretOrPrivateKey: string | Buffer,
    options?: SignOptions
  ): string;

  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: any
  ): any;

  export function decode(token: string): any;
}
