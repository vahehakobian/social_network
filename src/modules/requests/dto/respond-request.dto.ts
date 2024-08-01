import { RequestEnum } from "../../../constants/request-type.enum";
import { EnumField, UUIDField } from "../../../decorators";

export class RequestRerspondDto {
    
    @EnumField(() => RequestEnum)
    respond: RequestEnum;

}