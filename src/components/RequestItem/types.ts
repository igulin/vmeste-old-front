import { UserDataType } from '@/api/types'
import { StaticImageData } from "next/image";

export interface ReqeustItemContent {
    id: number;
    city_name?: string;

    categoryId?: number;
    comission?: number;
    countStar?: number;
    country_name?: string;
    createAt?: Date;
    createrId?: number;
    description: string;
    min_amount: number;
    name: string;
    photo_url: string | StaticImageData;
    realization_period?: Date;
    status: "opened" | "closed";
    tags?: string;
}

export interface RequestItemType extends ReqeustItemContent {
    invite?: any;
    isInvite?: boolean;
    _className?: string;
}

export interface IRequestApp {
    id?: number;
    name: string;
    countProducts: number;
    city: string;
    receiptPeriod: Date;
    country: string;
    categoryId: number;
    userId: number;
    user: UserDataType;
}
