import React from 'react'
import {Field} from "formik"

interface Props {
    name: any;
    list?: any;
    label?: any;
    hasIcon?: any;
    iconId?: any;
    options?: Array<any>;
    placeholder?: any;
  }

const FancyCheckbox: React.FC<Props> = (props) =>{
    const { name,options} = props;
    return (
        <div>
            <p className="input__label">Members</p>
           <div className="member-checkbox">
               {options?.map(item=>
                <label key={item.id} className="member-checkbox__label">
                    <Field name={name} value={item.uid} type="checkbox"className="member-checkbox__input" />
                    <span className="member-checkbox__text">{item?.user?.firstname} {item?.user?.lastname}</span>
                </label>)}
            </div> 
        </div>
    )
}

export default FancyCheckbox