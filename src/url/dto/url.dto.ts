import {IsDateString, IsOptional, IsString, Matches, MaxLength} from "class-validator"

export class UrlDto {
    @IsString()
    @Matches(/(http(s)?:\/\/.)?(ftp(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{0,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, {message: 'this is not a valid link'})
    link: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    @Matches(/^[\w\-]+$/, {message: 'Slug can only contain any word character Aa-Zz 0-9 "-", "_"'})
    slug: string;

    @IsDateString()
    @IsOptional()
    expireAt: Date;
}