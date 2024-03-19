import { Injectable } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class GoogleService {
  async googleVerify(token: string): Promise<TokenPayload> {
    const client = new OAuth2Client();
    const result = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    return result.getPayload();
  }
}
