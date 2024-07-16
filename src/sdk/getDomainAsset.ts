import {getAssetId} from "../utils/fuel_utils";
import {ReadonlyCallResult} from "../utils/types";

const getDomainAsset = async (name: string): Promise<ReadonlyCallResult<string>> => {
  return getAssetId(name);
};

export default getDomainAsset;
