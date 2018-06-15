import { execSync } from "child_process";
import { CronJob } from "cron";
import { readFileSync, writeFileSync, write } from "fs";

import { GetTags, TagList, Tag } from "./hub";
import { GetAWSData } from "./aws";


let existingVersions: TagList = [];
let ignoredVersions: TagList = [];

// Main program
try{
   ignoredVersions = JSON.parse(readFileSync("ignored.json", "utf8"));
}catch(e){}
GetTags().then((data) => {
    existingVersions = data;    

    let cronJob = new CronJob("0 0 * * * *", () => {
        buildUp().then(() => {
            let next = cronJob.nextDates().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            console.log("Waiting until " + next + "(UTC)");
        });
    });      

    buildUp().then(() => {
        cronJob.start();
        let next = cronJob.nextDates().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        console.log("Waiting until " + next + "(UTC)");
    });     
});


let loggedIn: boolean = false;
function logIn()
{
    if(!loggedIn)
    {
        // LOGIN into Docker Hub
        execSync(`docker login -u ${process.env.HUB_LOGIN} -p ${process.env.HUB_PASS}`, {stdio: [0,1,2]});
        loggedIn = true;
    }
}

function versionExists(version: string, arr: TagList)
{
    return arr.find((value: Tag) => {
        return value.name == version;
    });
}

function buildUp(): Promise<void>
{    
    return new Promise<void>((success, error) => {
        GetAWSData().then((data) => {
            let latest_tag = "";
        
            data.forEach((element, index) => {
                let filename: string = element.Key;
                const regex = /EcoLinux_v(([0-9]+\.?)+-(alpha|beta))\.zip/;    
                let matches;
                
                if((matches = regex.exec(filename)) !== null)
                {
                    let version: string = matches[1];                
                    if(!versionExists(version, existingVersions) && !versionExists(version, ignoredVersions))
                    {
                        try
                        {
                            execSync(`docker build -t fangedhex/ecosurvivalserver:${version} --build-arg ECO_VERSION=${version} - < docker/EcoServer`, {stdio: [0,1,2]});                
                            logIn();
                            execSync(`docker push fangedhex/ecosurvivalserver:${version}`, {stdio: [0,1,2]}); 
                            latest_tag = version;  
                            
                            existingVersions.push({name: version});
                        }
                        catch(ex)
                        {
                            console.error(`An error happened when trying to build up the version ${version}`);
                            ignoredVersions.push({name: version});
                            writeFileSync("ignored.json", JSON.stringify(ignoredVersions));
                        }
                    }   
                    else
                    {
                        if(versionExists(version, existingVersions))
                        {
                            console.log(`Version ${version} exists already !`);
                        }
                        else
                        {
                            console.log(`Version ${version} is ignored !`);
                        }           
                    }                        
                }
            });
            
            if(latest_tag != "")
            {      
                console.log("A new version has been uploaded to Docker Hub, setting up 'latest' tag...");      
                execSync(`docker tag fangedhex/ecosurvivalserver:${latest_tag} fangedhex/ecosurvivalserver:latest`, {stdio: [0,1,2]});
                logIn();
                execSync(`docker push fangedhex/ecosurvivalserver:latest`, {stdio: [0,1,2]});
            }

            success();
        });
    });    
}
