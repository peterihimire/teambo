
import {Typography} from '../../../../common';
const DataEmpty = ({text}: {text?: string}) => {
    return (
        <div className="text-center">
            <Typography
            type="h2"
            cssClass="head-4 m-t-10px"
            text={text ?? "You don't have any conversation"}
          />
        </div>
    )
}

export default DataEmpty
