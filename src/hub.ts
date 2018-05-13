/*
All functions related to Docker Hub API
*/

import * as DockerHub from "docker-hub-api";

export interface Tag
{
    name: string
};
export type TagList = Array<Tag>;

export function GetTags(): Promise<TagList>
{
    return new Promise<TagList>((success, error) => {
        console.log("Getting tags from Docker Hub ...");
        DockerHub.tags("fangedhex", "ecosurvivalserver").then(success).catch(error);
    });    
}
