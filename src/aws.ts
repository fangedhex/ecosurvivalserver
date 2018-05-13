/*
All functions related to AWS
*/

import {get as HttpGet} from "request-promise-native";
import {toJson} from "xml2json";

const AwsUrl: string = "https://s3-us-west-2.amazonaws.com/eco-releases/";

export interface AwsData
{
    Key: string;
    LastModified: Date,
    ETag: string,
    Size: number,
    StorageClass: string
};
export type AwsDataList = Array<AwsData>;

export function GetAWSData(): Promise<AwsDataList>
{    
    return new Promise<AwsDataList>((success, error) => {
        HttpGet(AwsUrl).then((xml) => {
            let json: any = toJson(xml, {object: true});        
            if(json.ListBucketResult) {
                let data: Array<AwsData> = json.ListBucketResult.Contents;
                success(data);
            }else{
                error("Error receiving data from AWS");
            }            
        });
    });
}
