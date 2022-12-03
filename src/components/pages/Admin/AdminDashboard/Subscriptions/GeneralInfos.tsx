import React from "react";

import Table from "../../../../common/Table/Table";

interface Props {}
const GeneralInfos: React.FC<Props> = () => {
  return (
    <div>
      <section>
        <div className="table-wrapper ">
          <Table />
        </div>
      </section>
    </div>
  );
};

export default GeneralInfos;
