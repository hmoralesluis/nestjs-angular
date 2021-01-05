import { IndexService } from './index.service';
export declare class IndexController {
    private readonly indexService;
    constructor(indexService: IndexService);
    createIndex(mips: any[]): Promise<{
        status: string;
        data: any;
    }>;
    searchIndex(q: string): Promise<{
        _index: string;
        _type: string;
        _id: string;
        _score: number;
        _source: unknown;
        _version?: number;
        _explanation?: import("elasticsearch").Explanation;
        fields?: any;
        highlight?: any;
        inner_hits?: any;
        matched_queries?: string[];
        sort?: string[];
    }[]>;
}
