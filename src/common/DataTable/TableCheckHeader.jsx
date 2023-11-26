import React from "react";
import { useTranslation } from "react-i18next";
import { IconDropdownDark } from "../../assets/images";

const TableCheckHeader = (props = {}) => {

    const {
        checked = false,//all setect true or false
        deleteItem = 0,//de selected and selected Item
        allCheckData,//allCheck click action
        bulkDeleteCusData,//bulk delete button
     } = props;

    const { t } = useTranslation();
    const dataonchange = () => {
        console.log("")

    };
    return (
        <React.Fragment>
            <div className="SelectAll">
                <div className="checkbox-custom new">
                    <input
                        id="SelectAll"
                        type="checkbox"
                        onChange={allCheckData}
                        checked={deleteItem >= 2 ? checked : false}
                    />
                    <label htmlFor="SelectAll"></label>
                    <label htmlFor="SelectAllDrop" className="SelectAllDrop">
                        <input
                            type="checkbox"
                            id="SelectAllDrop"
                            checked={deleteItem >= 2 ? checked : false}
                            onChange={dataonchange}
                        />
                        <ul >
                            <li onClick={bulkDeleteCusData}>
                                {t("TABLE.BULK_DELETE")}
                            </li>
                        </ul>
                        <i className="dropIcon"><IconDropdownDark /></i>
                    </label>
                </div>
            </div>
        </React.Fragment>
    );
};
export default React.memo(TableCheckHeader);
