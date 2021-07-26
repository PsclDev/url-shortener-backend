import {EntityRepository, Repository} from "typeorm";
import {Url} from "./url.entity";
import {Logger} from "@nestjs/common";

@EntityRepository(Url)
export class UrlRepository extends Repository<Url> {
    private logger = new Logger('UrlRepository');

    async checkIfSlugIsAvailable(slug: string) {
        const query = this.createQueryBuilder('url');
        query.where('url.slug = :slug', {slug})

        try {
            const result = await query.getCount();
            return result === 0;
        } catch (error) {
            this.logger.error(`Failed to check if slug is available: ${slug}, ${error.stack}`);
            return false;
        }
    }

    async createUrl(url: Url): Promise<boolean> {
        try {
            await url.save();
            return true;
        } catch (error) {
            this.logger.error(`Failed to create short url - Data: ${url}, ${error.stack}`);
            return false;
        }
    }

    async getUrlById(id: string): Promise<string> {
        const query = this.createQueryBuilder('url');
        query.where('url.id = :id', {id});

        try {
            const result = await query.getOne();
            if (result === undefined)
                return '';

            return result.link;
        } catch (error) {
            this.logger.error(`Failed to get link by id - Id: ${id}, ${error.stack}`);
            return '';
        }
    }

    async getUrlBySlug(slug: string): Promise<string> {
        const query = this.createQueryBuilder('url');
        query.where('url.slug = :slug', {slug});

        try {
            const result = await query.getOne();
            if (result === undefined)
                return '';

            return result.link;
        } catch (error) {
            this.logger.error(`Failed to get link by slug - Slug: ${slug}, ${error.stack}`);
            return '';
        }
    }
}