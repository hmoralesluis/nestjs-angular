import * as elasticsearch from 'elasticsearch';
export declare class IndexService {
    private readonly esclient;
    constructor();
    bulkInsert(abilities: any[]): Promise<{
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
        _explanation?: elasticsearch.Explanation;
        fields?: any;
        highlight?: any;
        inner_hits?: any;
        matched_queries?: string[];
        sort?: string[];
    }[]>;
}
