import React from "react";
import { Row, Cell } from "react-sticky-table";

const NoOfBroadcastsHead = () => {

  return (
    <Row>
      <Cell className="TM resetCell"></Cell>
      <Cell className="TM">
        Host Name
      </Cell>
      <Cell className="TM">
        Role
      </Cell>
      <Cell className="TM">
        Broadcast Created On
      </Cell>
      <Cell className="TM">
        Live Duration
      </Cell>
      <Cell className="TM">
        No. of participants
      </Cell>
      <Cell className="TM">
        GoLive
      </Cell>
      <Cell className="TM resetCell"></Cell>
    </Row>
  );
};
export default React.memo(NoOfBroadcastsHead);
