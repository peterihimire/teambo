import IconBigPlay from '../../../common/SvgIcons/IconBigPlay';
import IconUserRecord from '../../../common/SvgIcons/IconUserRecord';



export enum ERecordingOptions {
    SCREEN_AND_CAM = "SCREEN_AND_CAM",
    SCREEN_ONLY = "SCREE_ONLY",
    CAM_ONLY = "CAM_ONLY",
}


export const MediaRecorderType =  {
    [ERecordingOptions.SCREEN_ONLY]: { screen: true},
    [ERecordingOptions.CAM_ONLY]: { video: true},
    [ERecordingOptions.SCREEN_AND_CAM]: { screen: true}
}

type RecordingOptionsType = {
    id: number;
    cssClass: string;
    pathCssClass: string;
    text: string;
    textCssClass: string,
    icon: any,
    action:ERecordingOptions
}


export const RecordingOptionsClasses = {
    iconClass: "start-records__icon m-b-10px",
    textCssClass: "start-records__actions-title",
} 

export const RecordingOptions:Array<RecordingOptionsType> = [
    {
        id: 1,
        cssClass: RecordingOptionsClasses.iconClass,
        pathCssClass: "start-records__icon-path",
        text: "Screen & Cam",
        textCssClass: RecordingOptionsClasses.textCssClass,
        icon: IconBigPlay,
        action: ERecordingOptions.SCREEN_AND_CAM
    },
    {
        id: 2,
        cssClass: RecordingOptionsClasses.iconClass,
        pathCssClass: "start-records__icon-path",
        text: "Screen Only",
        textCssClass: RecordingOptionsClasses.textCssClass,
        icon: IconBigPlay,
        action: ERecordingOptions.SCREEN_ONLY
    },
    {
        id: 1,
        cssClass: RecordingOptionsClasses.iconClass,
        pathCssClass: "start-records__icon-path",
        text: "Cam Only",
        textCssClass: RecordingOptionsClasses.textCssClass,
        icon: IconUserRecord,
        action: ERecordingOptions.CAM_ONLY
    },
   
    
]