import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';

@Injectable()
export class FirebaseGuard implements CanActivate {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the request from the context object and the authorization header
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Public access routes
    // /users/displayName/:displayName is a public route for checking if a display name is available
    // when a user is signing up, before creating the user with Firebase Authentication to gain a token
    const publicRoutes = ['/users/displayName/'];
    if (publicRoutes.some((route) => request.url.startsWith(route))) {
      return true;
    }

    // Check if the authorization header is provided and has the Bearer token
    // A bearer token is a security token that is issued by an authorization server
    // In this case, the token is issued by Firebase Authentication
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException(
        'Unauthorized : No token provided',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Get the token from the authorization
    const idToken = authHeader.split('Bearer ')[1];

    try {
      // Verify the token using the Firebase Admin SDK and set the decoded token as the user
      const decodedToken =
        await this.firebaseAdminService.verifyIdToken(idToken);
      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new HttpException(
        'Unauthorized : Invalid token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
