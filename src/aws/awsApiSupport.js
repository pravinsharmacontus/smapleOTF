import { IVSRealTimeClient, CreateParticipantTokenCommand } from "@aws-sdk/client-ivs-realtime";
import { currentUserFullName, getCurrentOrgId, getCurrentUserId } from "../helper/utility";
import { updateScreenShare } from "../firebase/firebaseRealtimeFunctions";
import { accessKeyId, secretAccessKey } from "../helper/ApiUrl";

export const awsApi = async (awsStageReducer) => {
    const stageArn = awsStageReducer?.method === "create" ? awsStageReducer?.stage?.arn : awsStageReducer?.stageArn
    const credentials = {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    };
    const client = new IVSRealTimeClient({ region: "ap-south-1", credentials });
    const input = { // CreateParticipantTokenRequest
        stageArn: stageArn, // required
        duration: 3000,
        userId: getCurrentUserId().toString(),
        attributes: { // ParticipantTokenAttributes
            "type": "screenShare",
            "displayName": awsStageReducer?.displayName || currentUserFullName()
        },
        capabilities: [],
    };
    const command = new CreateParticipantTokenCommand(input);
    const response = await client.send(command);
    if (response?.$metadata?.httpStatusCode === 200) {
        return response?.participantToken
    } else {
        updateScreenShare(getCurrentOrgId(), false)
    }
}
