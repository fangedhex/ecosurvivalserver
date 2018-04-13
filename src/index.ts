import {get as HttpGet} from "request-promise-native";
import {toJson} from "xml2json";
import {execSync} from "child_process";
import * as DockerHub from "@octoblu/docker-hub-api";

interface AwsData
{
    Key: string;
    LastModified: Date,
    ETag: string,
    Size: number,
    StorageClass: string
}

// LOGIN into Docker Hub
DockerHub.login(process.env.HUB_LOGIN, process.env.HUB_PASS);
execSync(`docker login -u ${process.env.HUB_LOGIN} -p ${process.env.HUB_PASS}`, {stdio: [0,1,2]});

// Main program
console.log("Getting tags from Docker Hub ...");
DockerHub.tags("fangedhex", "ecosurvivalserver").then(data => {
    buildUp(data);
});

function versionExists(version, hubData)
{
    let _return = false;

    hubData.forEach(element => {
        if(element.name == version)
        {
            _return = true;
        }
    });

    return _return;
}

function buildUp(hubData)
{
    const AwsUrl: string = "https://s3-us-west-2.amazonaws.com/eco-releases/";
    HttpGet(AwsUrl).then((xml) => {
        let json: any = toJson(xml, {object: true});
    
        let data: Array<AwsData> = json.ListBucketResult.Contents;

        let latest_tag = "";
    
        data.forEach((element, index) => {
            let filename: string = element.Key;
            const regex = /EcoLinux_v(([0-9]+\.?)+-(alpha|beta))\.zip/;    
            let matches;
            
            if((matches = regex.exec(filename)) !== null)
            {
                let version: string = matches[1];
                latest_tag = version;    
                if(!versionExists(version, hubData))
                {
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
                else
                {
                    console.log(`Version ${version} exists already !`);
                }                        
            }
        });
        
        if(latest_tag != "")
        {
            execSync(`docker tag fangedhex/ecosurvivalserver:${latest_tag} fangedhex/ecosurvivalserver:latest`, {stdio: [0,1,2]});
            execSync(`docker push fangedhex/ecosurvivalserver:latest`, {stdio: [0,1,2]});
        }
    });
}
