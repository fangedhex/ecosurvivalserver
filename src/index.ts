import {get as HttpGet} from "request-promise-native";
import {toJson} from "xml2json";
import {execSync} from "child_process";

interface AwsData
{
    Key: string;
    LastModified: Date,
    ETag: string,
    Size: number,
    StorageClass: string
}

execSync(`docker login -u ${process.env.HUB_LOGIN} -p ${process.env.HUB_PASS}`, {stdio: [0,1,2]});

const AwsUrl: string = "https://s3-us-west-2.amazonaws.com/eco-releases/";
HttpGet(AwsUrl).then((xml) => {
    let json: any = toJson(xml, {object: true});

    let data: Array<AwsData> = json.ListBucketResult.Contents;

    data.forEach(element => {
        let filename: string = element.Key;
        const regex = /EcoLinux_v(([0-9]+\.?)+-(alpha|beta))\.zip/;    
        let matches;
        
        if((matches = regex.exec(filename)) !== null)
        {
            let version: string = matches[1];
            try
            {
                execSync(`docker build -t fangedhex/ecosurvivalserver:${version} --build-arg ECO_VERSION=${version} - < docker/EcoServer`, {stdio: [0,1,2]});                
                execSync(`docker push fangedhex/ecosurvivalserver:${version}`, {stdio: [0,1,2]});
            }
            catch(ex)
            {
                console.error(`An error happened when trying to build up the version ${version}`);
            }            
        }
    });    
})
