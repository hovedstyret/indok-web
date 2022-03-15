import { SlotDistributionDataType } from "../constants";

export const addId = (slotDistribution: SlotDistributionDataType[]): Record<number, SlotDistributionDataType> => {
  const slotDistributionRecord: Record<number, SlotDistributionDataType> = {};
  slotDistribution.map((dist: SlotDistributionDataType, index: number) => {
    slotDistributionRecord[index] = dist;
  });
  return slotDistributionRecord;
};
