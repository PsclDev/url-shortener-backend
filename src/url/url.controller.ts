import {Body, Controller, Get, Param, Post, Res, ValidationPipe} from '@nestjs/common';
import {UrlDto} from "./dto/url.dto";
import {UrlService} from "./url.service";

@Controller('url')
export class UrlController {
    constructor(private readonly urlService: UrlService) {
    }

    @Get('/:id')
    async redirectToLink(@Res() res, @Param('id') id): Promise<string> {
        const link = await this.urlService.getUrl(id);
        return res.redirect(link)
    }

    @Post()
    async createShortLink(
        @Body(ValidationPipe) body: UrlDto
    ) {
        const result = await this.urlService.createUrl(body);

        if (result.successful)
            return {id: result.id, slug: result.slug};
        return {error: result.message}
    }
}
