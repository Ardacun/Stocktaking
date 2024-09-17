import { JwtPayload as DefaultJwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends DefaultJwtPayload
{
    id: string;
    username: string;
}
