import {Injectable} from '@nestjs/common';
import {UrlRepository} from "./url.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {UrlDto} from "./dto/url.dto";
import {Url} from "./url.entity";
import {nanoid} from "nanoid";

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlRepository)
        private urlRepo: UrlRepository
    ) {
    }

    async createUrl(urlDto: UrlDto): Promise<any> {
        const {link, slug, expireAt} = urlDto;
        const url = new Url();
        url.id = nanoid(10);
        url.createdAt = new Date();
        url.link = link;

        if (slug !== undefined) {
            const available = await this.urlRepo.checkIfSlugIsAvailable(slug);

            if (!available)
                return {successful: false, message: 'slug is not available'};

            url.slug = slug;
        }
        if (expireAt !== undefined) {
            url.expireAt = new Date(expireAt);
        }

        const isSaved = await this.urlRepo.createUrl(url);
        if (isSaved)
            return {successful: true, id: url.id, slug};
        return {successful: false, message: 'Error while creating short link'};
    }

    async getUrl(identifier: string) {
        let link = await this.urlRepo.getUrlById(identifier);

        if (link !== '')
            return link;

        link = await this.urlRepo.getUrlBySlug(identifier);

        if (link !== '')
            return link;

        return '';
    }
}
