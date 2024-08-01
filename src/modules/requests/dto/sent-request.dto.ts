import { UUIDField } from "../../../decorators";

export class SentRequestDto {

    @UUIDField()
    receiver: Uuid;

}