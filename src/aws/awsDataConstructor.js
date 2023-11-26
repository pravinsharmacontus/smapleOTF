export const constructStream = (participantData, streamArray) => {
  return {
    ...participantData,
    stream: [...streamArray],
  };
};
